import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }
  const prediction = await replicate.predictions.create({
    version: "3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
    input: {
      cond_aug: 0.02,
      decoding_t: 7,
      input_image: req.body.prompt,
      video_length: "25_frames_with_svd_xt",
      sizing_strategy: "maintain_aspect_ratio",
      motion_bucket_id: 150,
      frames_per_second: 6,
    },
  });

  if (prediction?.error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
