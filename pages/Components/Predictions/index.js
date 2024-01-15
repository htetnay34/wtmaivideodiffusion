import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [videoPrediction, setVideoPrediction] = useState(null);
  const [error, setError] = useState(null);


// Function to check if the input text contains Myanmar characters
function hasMyanmarCharacters(text) {
  // Myanmar Unicode Range: U+1000 to U+109F
  const myanmarRegex = /[\u1000-\u109F]/;
  return myanmarRegex.test(text);
}

// Function to translate Myanmar text to English using Google Translate API
function translateToEnglish(text) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=my&tl=en&dt=t&q=${encodeURIComponent(text)}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract the translated text from the response
        if (data && data[0] && data[0][0] && data[0][0][0]) {
          resolve(data[0][0][0]);
        } else {
          reject('Translation to English failed');
        }
      })
      .catch(error => {
        console.error('Translation to English failed:', error);
        reject(error);
      });
  });
}

const handleInputChange = (e) => {
    setInputText(e.target.value);
    // You can update state or perform any logic based on the input text
  };

  const shouldShowGoButton = () => {
    return !hasMyanmarCharacters(inputText);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });

    let prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPrediction(prediction);
    }
    if (prediction.status === 'succeeded') {
      handleVideo(prediction)
    }
  };




  

  const handleVideo = async (params) => {
    const response = await fetch("/api/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: params.output[params.output.length - 1]
      }),
    });


    let res = await response.json();

    if (response.status !== 201) {
      setError(res.detail);
      return;
    }
    setVideoPrediction(res);

    while (
      res.status !== "succeeded" &&
      res.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + res.id);
      res = await response.json();
      if (response.status !== 200) {
        setError(res.detail);
        return;
      }
      setVideoPrediction(res);
    }
  };
  const downloadVideo = async () => {
    // 替换成你的 MP4 视频 URL
    const videoUrl = videoPrediction.output;

    try {
      const response = await fetch(videoUrl);
      const videoBlob = await response.blob();

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(videoBlob);
      downloadLink.download = 'video.mp4';

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <Head>
        <title>Replicate + Next.js</title>
       <meta title="Stable video diffusion" description="Stable video diffusion"></meta>

      </Head>

      <p>
        Dream something with {' '}
        <a href="https://stable-vidoe-diffusion.site/">SDXL</a>:
      </p>

 <form className="w-full flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-grow border-cyan-600 border-2 border-r-0 focus-visible:no-underline"
          name="prompt"
          placeholder="Enter a prompt to display an image"
          onChange={(e) => handleInputChange(e)}
        />
        {shouldShowGoButton() && (
          <button className="button" type="submit">
            Go!
          </button>
        )}
      </form>


      {error && <div>{error}</div>}

      {(prediction || videoPrediction) && (
        <>
          <div className="flex">
            {prediction?.output && (
              <div className="image-wrapper mt-5">
                <Image
                  fill
                  src={prediction?.output[prediction?.output?.length - 1]}
                  alt="output"
                  sizes="100vw"
                />
              </div>
            )}
            {videoPrediction?.output && (
              <div className="image-wrapper mt-5 ml-1">
                <video
                  src={videoPrediction?.output}
                  preload="auto" autoPlay controls loop className=" w-[100%] h-[100%]">
                </video>
                <button className="download" onClick={downloadVideo}>
                  download ↓
                </button>
              </div>
            )}
          </div>
          <p className="py-3 text-sm opacity-50">status: {videoPrediction?.status || prediction?.status}</p>
        </>
      )}
    </div>
  );
}
