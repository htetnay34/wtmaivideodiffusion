import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [showGoButton, setShowGoButton] = useState(false);

  const delayBeforeTranslate = 2000; // 2 seconds
  let typingTimer;

  // Function to check if the input text contains Myanmar characters
  function hasMyanmarCharacters(text) {
    // Myanmar Unicode Range: U+1000 to U+109F
    const myanmarRegex = /[\u1000-\u109F]/;
    return myanmarRegex.test(text);
  }

  // Function to translate Myanmar text to English using Google Translate API
  async function translateToEnglish(text) {
    try {
      const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=my&tl=en&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      const translatedText = data && data[0] && data[0][0] && data[0][0][0];
      if (translatedText) {
        setTranslatedText(translatedText);
        setShowGoButton(true);
      } else {
        console.error('Translation to English failed:', data);
      }
    } catch (error) {
      console.error('Translation to English failed:', error);
    }
  }

  useEffect(() => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      if (hasMyanmarCharacters(inputText)) {
        translateToEnglish(inputText);
      }
    }, delayBeforeTranslate);

    // Clear the timer if the user starts typing again within the delay
    return () => clearTimeout(typingTimer);
  }, [inputText]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setTranslatedText("");
    setShowGoButton(false);
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
  };

  const handleImageDownload = async () => {
    // Replace 'image.jpg' with an appropriate name for your downloaded image
    const imageUrl = prediction?.output[prediction?.output?.length - 1];

    try {
      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(imageBlob);
      downloadLink.download = 'image.jpg'; // You can change the filename here

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading image:', error);
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
        <a href="https://stable-vidoe-diffusion.site/">Writtech AI</a>:
      </p>

      <form className="w-full flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-grow border-cyan-600 border-2 border-r-0 focus-visible:no-underline"
          name="prompt"
          placeholder="ထုတ်ချင်သည့် အကြောင်းအရာကို မြန်မာလိုရိုက်ထည့်ပါ"
          value={translatedText || inputText} // Display translated text if available
          onChange={(e) => handleInputChange(e)}
        />
        {showGoButton && (
          <button className="button" type="submit">
            Go!
          </button>
        )}
      </form>

      {error && <div>{error}</div>}

      {prediction?.output && (
        <div className="image-wrapper mt-5">
          <Image
            fill
            src={prediction?.output[prediction?.output?.length - 1]}
            alt="output"
            sizes="100vw"
            onContextMenu={(e) => e.preventDefault()} // Prevent right-click
          />
          <button className="download" onClick={handleImageDownload}>
            Download Image ↓
          </button>
        </div>
      )}
    </div>
  );
}
