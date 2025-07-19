  // === Deepgram Setup ===
  const initializeDeepgram = async () => {
    try {
      // Safely close any previous Deepgram connections
      if (deepgramSocketRef.current?.readyState === WebSocket.OPEN) {
        deepgramSocketRef.current.close();
      }

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }

      // Start new Deepgram session
      deepgramSocketRef.current = new WebSocket(
        `wss://api.deepgram.com/v1/listen?punctuate=true&language=en`,
        ["token", DEEPGRAM_API_KEY]
      );

      deepgramSocketRef.current.onopen = async () => {
        try {
          mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

          mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current, { mimeType: "audio/webm" });

          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0 && deepgramSocketRef.current.readyState === WebSocket.OPEN) {
              deepgramSocketRef.current.send(event.data);
            }
          };

          mediaRecorderRef.current.start(250);
          console.log("🎙️ Deepgram listening...");
        } catch (err) {
          console.error("🎤 Mic access error:", err);
          setErrorMessage("Microphone error: " + err.message);
        }
      };

      deepgramSocketRef.current.onmessage = (message) => {
        if (isAssistantOnRef.current) return;

        try {
          const data = JSON.parse(message.data);
          const transcript = data.channel?.alternatives?.[0]?.transcript?.toLowerCase();

          if (
            transcript &&
            (transcript.includes("help me") ||
              transcript.includes("hi eva") ||
              transcript.includes("eva") ||
              transcript.includes("hello eva") ||
              transcript.includes("hey eva") ||
              transcript.includes("hello"))
          ) {
            console.log("🟢 Wake word detected via Deepgram:", transcript);
            setWakeWordDetected(true);
            triggerVapi();

            // Cleanup Deepgram once triggered
            if (deepgramSocketRef.current?.readyState === WebSocket.OPEN) {
              deepgramSocketRef.current.close();
            }
            if (mediaRecorderRef.current?.state !== "inactive") {
              mediaRecorderRef.current.stop();
            }
            mediaStreamRef.current?.getTracks().forEach(track => track.stop());
          }
        } catch (error) {
          console.error("Deepgram message error:", error);
          setErrorMessage("Failed to process Deepgram response.");
        }
      };

      deepgramSocketRef.current.onerror = (err) => {
        console.error("Deepgram WebSocket error:", err);
        setErrorMessage("Deepgram WebSocket error.");
      };

      deepgramSocketRef.current.onclose = () => {
        console.log("🔌 Deepgram socket closed");
      };
    } catch (e) {
      console.error("Deepgram initialization failed:", e);
    }
  };

  initializeDeepgram();

  // === Cleanup Both Audio & Deepgram ===
  return () => {
    console.log("🧹 Cleanup: wake audio + Deepgram");

    // Audio
    audio.pause();
    clearInterval(intervalId);

    // Deepgram Cleanup
    if (deepgramSocketRef.current?.readyState === WebSocket.OPEN) {
      deepgramSocketRef.current.close();
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
  };
}, [
  isFormSubmitted,
  assistantStatus,
  mediaDetection,
  wakeWordDetected,
  isAssistantOn,
  isLoading
]);