import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { usePorcupine } from "@picovoice/porcupine-react";
import axios from "axios";
import Vapi from "@vapi-ai/web";
import { FiPhoneCall, FiPhoneOff, FiLoader } from "react-icons/fi";

const vapi = new Vapi("5ce2a2a6-0bb7-4993-94c8-56f793911bf8");

const VoiceWidget = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const vapiRef = useRef(null);
  const [espCharacteristic, setEspCharacteristic] = useState(null);
  const [isAssistantOn, setIsAssistantOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [childName, setChildName] = useState(queryParams.get("childName") || "");
  const [interests, setInterests] = useState(queryParams.get("interests") || "");
  const [currentLearning, setCurrentLearning] = useState(queryParams.get("currentLearning") || "");
  const [porcupineKey, setPorcupineKey] = useState(queryParams.get("porcupineKey") || "");
  const [isFormSubmitted, setIsFormSubmitted] = useState(queryParams.get("isFormSubmitted") === "true");
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const [assistantId, setAssistantId] = useState(null);
  const [mediaDetection, setMediaDetect] = useState(false);
  
  const isAssistantOnRef = useRef(isAssistantOn);
  const inactivityTimeoutRef = useRef(null);

  const {
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
    release,
  } = usePorcupine();
console.log("porcupine error: ", error);
  const porcupineKeyword = {
    publicPath: "assets/Hi-Eva_en_wasm_v3_0_0.ppn",
    label: "Hi Eva",
  };

  const porcupineModel = {
    publicPath: "assets/porcupine_params.pv",
  };

  useEffect(() => {
    console.log("isAssistantOn changed:", isAssistantOn);
    isAssistantOnRef.current = isAssistantOn;
  }, [isAssistantOn]);

  const connectToESP32 = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "ESP32-Blinker" }],
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
      );
      const char = await service.getCharacteristic(
        "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
      );

      setEspCharacteristic(char);
      console.log("ESP32 connected.");
    } catch (err) {
      console.error("ESP32 connection failed:", err);
    }
  };

  const sendBlinkCommand = async () => {
    try {
      if (!espCharacteristic) return;
      const encoder = new TextEncoder();
      await espCharacteristic.writeValue(encoder.encode("BLINK"));
    } catch (error) {
      console.error("Failed to send blink command:", error);
    }
  };

  const sendOnCommand = async () => {
    try {
      if (!espCharacteristic) return;
      const encoder = new TextEncoder();
      await espCharacteristic.writeValue(encoder.encode("ON"));
    } catch (error) {
      console.error("Failed to send on command:", error);
    }
  };

  const sendOffCommand = async () => {
    try {
      if (!espCharacteristic) return;
      const encoder = new TextEncoder();
      await espCharacteristic.writeValue(encoder.encode("STOP"));
    } catch (error) {
      console.error("Failed to send off command:", error);
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      console.log("Inactivity timeout reached. Closing Vapi...");
      setIsLoading(true);
      const audio = new Audio("/disconnect.mp3");
      audio.play();
      audio.onended = () => {
        console.log("stop assistant & offCMD after disconnect audio");
        
        toggleAssistant();
      };
    }, 1000);
  };

  useEffect(() => {
    if (isFormSubmitted) {
      init(
        porcupineKey,
        porcupineKeyword,
        porcupineModel
      ).then(() => {
        start();
      }).catch((err) => {
        console.error("Error initializing Porcupine:", err);  
      });
    }
    return () => release();
  }, [init, start, release, isFormSubmitted, porcupineKey]);

  const createAssistant = async () => {
    if (!childName) return;
    
    // Combine interests and current learning into customPrompt
    const customPrompt = `
      Child's Interests & Preferences:
      ${interests}

      Current Learning in School:
      ${currentLearning}
    `;

    const response = await axios.post("https://api-talkypies.vercel.app/vapi/create-assistant", {
      childName,
      customPrompt,
    });
    
    console.log("Assistant created:", response);
    const assistantId = response.data.assistantId;
    setAssistantId(assistantId);
    return assistantId;
  };

  useEffect(() => {
    if (isFormSubmitted && childName) {
      createAssistant();
    }
  }, [isFormSubmitted, childName]);

  useEffect(() => {
    if (!isFormSubmitted) return;
  console.log("assistant: ", isAssistantOn);
  console.log("wakeWordDetected: ", wakeWordDetected);
  console.log("mediaDetection: ", mediaDetection);
  console.log("isFormSubmitted: ", isFormSubmitted);
  console.log("line 11111111111111");
    const audio = new Audio("/wake up.mp3");
      let intervalId = null;

if ((mediaDetection || wakeWordDetected || isAssistantOn) ) {
      console.log("line 777777777777777777777777777777777777777777");
      console.log("line 8888888888888888888888888888");
      audio.currentTime = 0;
      console.log("Wake word detected or user manually started vapi — paused audio immediately.");
      clearInterval(intervalId);
      return;
    }

    audio.loop = false;
    console.log("line 22222222222222");
    audio.play().catch((e) => {
        console.warn("Audio play failed:", e);
      });
      console.log("line 33333333333333");
    

    const playAudio = () => {
      if (!audio.paused) return;
      console.log("line 55555555555555");
      audio.currentTime = 0;
      audio.play().catch((e) => {
        console.warn("Audio play failed:", e);
      });
      console.log("line 66666666666666");
      console.log("Playing starting audio...");
    };

    intervalId = setInterval(() => {
      if (!wakeWordDetected && !isAssistantOn) {
        console.log("line 44444444444444444444");
        playAudio();
      }
    }, 10000);

    return () => {
      console.log("Cleaning up starting audio interval");
      audio?.pause();
      clearInterval(intervalId);
      if (!audio.paused) {
        console.log("line 99999999999999999999999999");
        audio?.pause();
        console.log("line 10000000000000000000000000000");
      }
    };

  }, [isFormSubmitted, wakeWordDetected, mediaDetection, isAssistantOn]);

useEffect(() => {
  if (keywordDetection) {
        console.log("Wake word detected:", keywordDetection.label);
        setWakeWordDetected(true);
      }
},[keywordDetection]);

  useEffect(() => {
    if ((mediaDetection || wakeWordDetected) && isFormSubmitted) {
      if (isAssistantOnRef.current) {
        console.log("Assistant is already on, no need to start again.");
        return;
      }

      setIsLoading(true);
      const audio = new Audio("/connect.mp3");
      audio.play();

      audio.onended = async () => {
        console.log("Intro audio finished. Connecting to Eva...");
        await sendBlinkCommand();
        toggleAssistant();
      };

      let intervalId;
      let repeatedAudio;

      intervalId = setInterval(() => {
        repeatedAudio = new Audio(audio.src);
        repeatedAudio.play();
        console.log("Playing intro audio...");
      }, 5000);

      vapi.once("speech-start", async () => {
        repeatedAudio.pause();
        console.log("speech-start called only once");
        console.log("Assistant has started speaking.");
        clearInterval(intervalId);
        sendOnCommand();
        console.log("Eva connected. Stopped repeating audio.");
      });

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [wakeWordDetected, isFormSubmitted, mediaDetection]);

  useEffect(() => {
    if (!isFormSubmitted) return;

    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to backend WebSocket");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed data from backend:", data);

        if (data.type === "MEDIA_KEY" && data.message.toLowerCase().includes("next")) {
          setMediaDetect(true);
        }
      } catch (err) {
        console.error("Invalid JSON from backend:", event.data);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  }, [isFormSubmitted]);

  const startVapiAssistant = async () => {
    setIsLoading(true);
    try {
      const call = await vapi.start(assistantId);
      console.log("Call started:", call);
      setIsLoading(false);
      setIsAssistantOn(true);
      vapi.once("call-end", () => {
        console.log("Call ended event received", isAssistantOn, "  ", isAssistantOnRef.current);
        if(isAssistantOnRef.current) {
        resetInactivityTimer();
        }
      })
    } catch (error) {
      console.error("Error starting call:", error);
      setIsLoading(false);
    }
  };

  const toggleAssistant = async () => {
    console.log("assistant status from ref: inside ", isAssistantOnRef.current);

    if (isAssistantOnRef.current) {
      setIsLoading(true);
      await sendOffCommand();
      vapi.stop();
      console.log("call disconnected");
      setIsAssistantOn(false);
      setIsLoading(false);
      setWakeWordDetected(false);
      setMediaDetect(false);
    } else {
      startVapiAssistant();
    }
  };

  if (error) {
    <div>Error initializing Porcupine: {error.message}</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-xl mb-20 md:mb-0">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Voice Assistant Status
        </h1>
        <div className="space-y-2 text-lg">
          <p className="text-gray-700">
            Listening:{" "}
            <span
              className={`font-semibold ${
                isListening ? "text-green-600" : "text-red-600"
              }`}
            >
              {isListening ? "Active" : "Inactive"}
            </span>
          </p>
          <p className="text-gray-700">
            Wake Word Detection:{" "}
            <span
              className={`font-semibold ${
                wakeWordDetected ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {wakeWordDetected
                ? "Detected! Vapi is ready."
                : "Waiting for 'Hi Eva'..."}
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleAssistant}
            className={`rounded-full p-4 text-white shadow-lg transition-transform duration-300 ease-in-out ${
              isAssistantOn
                ? "bg-red-600 hover:bg-red-700"
                : isLoading
                ? "bg-yellow-500"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <FiLoader className="w-8 h-8 animate-spin" />
            ) : isAssistantOn ? (
              <FiPhoneOff className="w-8 h-8" />
            ) : (
              <FiPhoneCall className="w-8 h-8 animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceWidget;