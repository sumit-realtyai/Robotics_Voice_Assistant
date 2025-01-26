import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AIToyWithSpeech() {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState("");
  const [audio, setAudio] = useState(null);

  const startListening = async () => {
    setIsListening(true);
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
      const lastTranscript =
        event.results[event.results.length - 1][0].transcript;

      recognition.stop();
      setIsListening(false);

      // Step 1: Send to Sarvam API for translation
      const translatedText = await translateUsingSarvam(lastTranscript);

      // Step 2: Get response from OpenAI
      const openAIResponse = await getOpenAIResponse(translatedText);

      // Step 3: Convert OpenAI response to speech
      const speechAudio = await convertTextToSpeechUsingSarvam(
        openAIResponse
      );

      setResponse(openAIResponse);
      setAudio(speechAudio);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      setIsListening(false);
    };

    recognition.start();
  };

  const translateUsingSarvam = async (text) => {
    try {
      const res = await axios.post(
        "https://api.sarvam.ai/translate", // Replace with actual Sarvam translation endpoint
        { text },
        {
          headers: {
            Authorization: "Bearer YOUR_SARVAM_API_KEY",
          },
        }
      );
      return res.data.translatedText; // Adjust based on API response
    } catch (error) {
      console.error("Error with Sarvam Translation:", error);
      return "Error in translation.";
    }
  };

  const getOpenAIResponse = async (text) => {
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }],
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
        }
      );
      return res.data.choices[0].message.content;
    } catch (error) {
      console.error("Error with OpenAI:", error);
      return "Error in getting response.";
    }
  };

  const convertTextToSpeechUsingSarvam = async (text) => {
    try {
      const res = await axios.post(
        "https://api.sarvam.ai/speech", // Replace with actual Sarvam speech endpoint
        { text },
        {
          headers: {
            Authorization: "Bearer YOUR_SARVAM_API_KEY",
          },
        }
      );
      return res.data.audioUrl; // Adjust based on API response
    } catch (error) {
      console.error("Error with Sarvam Text-to-Speech:", error);
      return null;
    }
  };

  const playAudio = () => {
    if (audio) {
      const audioPlayer = new Audio(audio);
      audioPlayer.play();
    }
  };

  useEffect(() => {
    if (audio) playAudio();
  }, [audio]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">AI Toy</h1>
        <button
          onClick={startListening}
          disabled={isListening}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {isListening ? "Listening..." : "Start Speaking"}
        </button>
        {response && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <p className="font-semibold">AI Response:</p>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
