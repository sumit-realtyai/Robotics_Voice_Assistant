// import React, { useEffect, useState } from "react";
// import { usePorcupine } from "@picovoice/porcupine-react";

// const VoiceWidget = () => {
//   const {
//     keywordDetection,
//     isLoaded,
//     isListening,
//     error,
//     init,
//     start,
//     stop,
//     release,
//   } = usePorcupine();

//   const [childName, setChildName] = useState("");
//   const [additionalInstructions, setAdditionalInstructions] = useState("");
//   const [vapiInstance, setVapiInstance] = useState(null);
//   const [wakeWordDetected, setWakeWordDetected] = useState(false);
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);

//   const porcupineKeyword = {
//     publicPath: "assets/Hi-Eva.ppn",
//     label: "Hi Eva",
//   };

//   const porcupineModel = {
//     publicPath: "assets/porcupine_params.pv",
//   };

//   useEffect(() => {
//     if (isFormSubmitted) {
//       init("JrszSE+vOtwSWMaswF6roMnOImlxHD7jnLdmWqYsNLT2mKkthvRWUA==", porcupineKeyword, porcupineModel).then(() => {
//         start();
//       });
//     }
//     return () => release();
//   }, [init, start, release, isFormSubmitted]);

//   useEffect(() => {
//     if (keywordDetection && isFormSubmitted) {
//       console.log("Wake word detected:", keywordDetection.label);
//       setWakeWordDetected(true);
//       initializeVapi(); // Directly initialize Vapi when wake word is detected
//     }
//   }, [keywordDetection, isFormSubmitted]);

//   const initializeVapi = () => {
//     const script = document.createElement("script");
// script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
// script.async = true;
// script.defer = true;

// script.onload = () => {
//   const instance = window.vapiSDK.run({
//     apiKey: "a5ebab87-088e-4426-8de2-a3ff4a684659",
//     assistant: {
//       model: {
//         provider: "openai",
//         model: "gpt-3.5-turbo",
//         systemPrompt: `You're a versatile AI assistant named Vapi who is fun to talk with.
//                       Please detect any toxic word and inappropriate language in your input. On detection, please respond that you can't comply with the request. Also, make sure your responses don't include any toxic or inappropriate words from a child perspective.

//                       Important instructions from parents: ${additionalInstructions}`,
//       },
//       voice: {
//         provider: "cartesia",
//         voiceId: "2ee87190-8f84-4925-97da-e52547f9462c",
//       },
//       firstMessage: `Hi ${childName || "there"}! I am Eva! How can I assist you today?`,
//     },
//     config: {},
//   });

//   setVapiInstance(instance);

//   // Automatically click the vapi-support-btn button once the script is loaded and the instance is initialized
//   const supportButton = document.getElementById('vapi-support-btn');
//   if (supportButton) {
//     supportButton.click(); // Simulate the click
//   }
// };

// document.body.appendChild(script);

//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const nameInput = document.getElementById("child-name");
//     const instructionsInput = document.getElementById("additional-instructions");
//     setChildName(nameInput.value.trim());
//     setAdditionalInstructions(instructionsInput.value.trim());
//     setIsFormSubmitted(true);
//   };

//   if (error) {
//     return <div>Error initializing Porcupine: {error.message}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 flex justify-center items-center">
//       <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-xl transition-all duration-500 hover:scale-105">
//         {!isFormSubmitted ? (
//           <section id="input-form" className="space-y-8">
//             <h2 className="text-3xl font-bold text-center text-gray-900">Input Details</h2>
//             <form id="child-input-form" onSubmit={handleFormSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <label htmlFor="child-name" className="text-lg font-medium text-gray-700">Child Name:</label>
//                 <input
//                   type="text"
//                   id="child-name"
//                   name="child-name"
//                   required
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="age" className="text-lg font-medium text-gray-700">Age:</label>
//                 <input
//                   type="number"
//                   id="age"
//                   name="age"
//                   min="1"
//                   required
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="gender" className="text-lg font-medium text-gray-700">Gender:</label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   required
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="additional-instructions" className="text-lg font-medium text-gray-700">
//                   Additional Instructions by Parents:
//                 </label>
//                 <textarea
//                   id="additional-instructions"
//                   name="additional-instructions"
//                   rows="4"
//                   placeholder="Enter any specific instructions..."
//                   className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300"
//               >
//                 Start Voice Assistant
//               </button>
//             </form>
//           </section>
//         ) : (
//           <div className="space-y-4">
//             <h1 className="text-2xl font-bold text-center text-gray-900">Voice Assistant Status</h1>
//             <div className="space-y-2 text-lg">
//               <p className="text-gray-700">Listening: <span className={`font-semibold ${isListening ? 'text-green-600' : 'text-red-600'}`}>{isListening ? "Active" : "Inactive"}</span></p>
//               <p className="text-gray-700">Wake Word Detection: <span className={`font-semibold ${wakeWordDetected ? 'text-green-600' : 'text-yellow-600'}`}>{wakeWordDetected ? "Detected! Vapi is ready." : "Waiting for 'Hi Eva'..."}</span></p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VoiceWidget;

import React, { useEffect, useState, useRef } from "react";
import { usePorcupine } from "@picovoice/porcupine-react";

const VoiceWidget = () => {
  const vapiRef = useRef(null);
  const [espCharacteristic, setEspCharacteristic] = useState(null);

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

  const [childName, setChildName] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);

  const porcupineKeyword = {
    publicPath: "assets/Hi-Eva_en_wasm_v3_0_0.ppn",
    label: "Hi Eva",
  };

  const porcupineModel = {
    publicPath: "assets/porcupine_params.pv",
  };

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

      setEspCharacteristic(char); // Store characteristic globally
      console.log("ESP32 connected.");
    } catch (err) {
      console.error("ESP32 connection failed:", err);
    }
  };

  const sendBlinkCommand = async () => {
    if (!espCharacteristic) return;
    const encoder = new TextEncoder();
    await espCharacteristic.writeValue(encoder.encode("BLINK"));
  };

  const inactivityTimeoutRef = useRef(null);

  const resetInactivityTimer = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    inactivityTimeoutRef.current = setTimeout(() => {
      console.log("Inactivity timeout reached. Closing Vapi...");
      const endCallButton = document.getElementById("vapi-support-btn"); // adjust selector if needed
      if (endCallButton) {
        const audio = new Audio("/disconnect.mp3"); // Replace with your intro clip
        audio.play();
        endCallButton.click(); // simulate end call
      }
    }, 1000); // 10 seconds
  };

  useEffect(() => {
    if (isFormSubmitted) {
      init(
        "3MjB/vyRS/E0p2QJ+e7F0DKR9ADQO+JlMMFkAjd1s2Q5UpzZZqZK3A==",
        porcupineKeyword,
        porcupineModel
      ).then(() => {
        start();
      });
    }
    return () => release();
  }, [init, start, release, isFormSubmitted]);

  useEffect(() => {
    if (isFormSubmitted) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        vapiRef.current = window.vapiSDK.run({
          apiKey: "3d38afc3-a885-41db-a2e4-3111c687b2f4",
          assistant: {
            model: {
              provider: "openai",
              model: "gpt-3.5-turbo",
              // systemPrompt: `You are an intelligent, poetic AI assistant with the whimsical personality of a clever cat. Everything you say must be delivered in perfect rhyme—every line must rhyme with the next or follow a consistent rhyme scheme (AABB, ABAB, or AAAA). No matter the subject—be it casual chat, complex tech, serious questions, or silly jokes—you must always maintain rhyme in your speech. Do not break character or rhyme. Keep the rhythm flowing, your tone fun and witty, like a feline bard who's clever and pretty. Follow these instructions while replying: ${additionalInstructions}`,
              systemPrompt: `You're a versatile AI assistant named Eva with a personality of a cat who is fun to talk with. 
            Make sure to follow these instruction while replying: ${additionalInstructions}`,
            },
            voice: {
              provider: "cartesia",
              voiceId: "3b554273-4299-48b9-9aaf-eefd438e3941",
            },
            firstMessage: `Hi ${
              childName || "there"
            }! I am Eva! How can I assist you today?`,
          },
          config: {},
        });
      };

      document.body.appendChild(script);
    }
  }, [isFormSubmitted, additionalInstructions, childName]);

  useEffect(() => {
    if (keywordDetection && isFormSubmitted) {
      console.log("Wake word detected:", keywordDetection.label);
      setWakeWordDetected(true);

      const audio = new Audio("/connect.mp3"); // Replace with your intro clip
      audio.play();

      audio.onended = async () => {
        console.log("Intro audio finished. Connecting to Eva...");
        // startVapiAssistant();
        await sendBlinkCommand();
        
        const supportButton = document.getElementById("vapi-support-btn");
        if (supportButton) {
          supportButton.click();
          // resetInactivityTimer();
        }
      };

      let intervalId;
      // let checkInterval;
      let repeatedAudio;

      intervalId = setInterval(() => {
        // Clone audio to avoid conflicts with overlapping playbacks
        repeatedAudio = new Audio(audio.src);
        repeatedAudio.play();
        console.log("Playing intro audio...");
      }, 5000); // every 5 seconds

      vapiRef.current.once("speech-start", () => {
        repeatedAudio.pause();
        console.log("Assistant has started speaking.");
        clearInterval(intervalId); // stop playing audio
        // clearInterval(checkConnection); // stop checking
        console.log("Eva connected. Stopped repeating audio.");
      });

      vapiRef.current.on("speech-end", () => {
        console.log("Assistant has finished speaking.");

        let timeElapsed = 0; // track total time waited
        const checkInterval = 5000; // 5 seconds interval
        const maxWaitTime = 15000; // 15 seconds max wait

        // Flag to track if assistant started speaking again
        let assistantSpeaking = false;

        // Listen once for speech-start to update the flag
        const onSpeechStart = () => {
          // console.log("Assistant started speaking again!");
          assistantSpeaking = true;
        };

        vapiRef.current.once("speech-start", onSpeechStart);

        // Start checking every 5 seconds
        const intervalId = setInterval(() => {
          timeElapsed += checkInterval;

          if (assistantSpeaking) {
            console.log("Assistant spoke again, stopping checks.");
            clearInterval(intervalId);
            vapiRef.current.off("speech-start", onSpeechStart); // cleanup listener
            return; // exit
          }

          if (timeElapsed >= maxWaitTime) {
            console.log(
              "Assistant did NOT speak again for 15 seconds, calling resetInactivityTimer."
            );
            clearInterval(intervalId);
            vapiRef.current.off("speech-start", onSpeechStart); // cleanup listener

            resetInactivityTimer();
          }
        }, checkInterval);
      });

      // const checkConnection = setInterval(() => {
      // }, 1000); // check every 1 second

      return () => {
        clearInterval(intervalId);
        // clearInterval(checkConnection);
      };
    }
  }, [keywordDetection, isFormSubmitted]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("child-name");
    const instructionsInput = document.getElementById(
      "additional-instructions"
    );
    setChildName(nameInput.value.trim());
    setAdditionalInstructions(instructionsInput.value.trim());
    setIsFormSubmitted(true);
  };

  if (error) {
    return <div>Error initializing Porcupine: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-xl transition-all duration-500 hover:scale-105">
        {!isFormSubmitted ? (
          <section id="input-form" className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Input Details
            </h2>
            <form
              id="child-input-form"
              onSubmit={handleFormSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label
                  htmlFor="child-name"
                  className="text-lg font-medium text-gray-700"
                >
                  Child Name:
                </label>
                <input
                  type="text"
                  id="child-name"
                  name="child-name"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="age"
                  className="text-lg font-medium text-gray-700"
                >
                  Age:
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="1"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="text-lg font-medium text-gray-700"
                >
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="additional-instructions"
                  className="text-lg font-medium text-gray-700"
                >
                  Additional Instructions by Parents:
                </label>
                <textarea
                  id="additional-instructions"
                  name="additional-instructions"
                  rows="4"
                  placeholder="Enter any specific instructions..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
                ></textarea>
              </div>

              <button onClick={connectToESP32}
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300"
              >
                Start Voice Assistant
              </button>
            </form>
          </section>
        ) : (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceWidget;
