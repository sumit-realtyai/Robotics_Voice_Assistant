  const initializeDeepgram = async () => {
  try {
    // Cleanup
    // deepgramSocketRef.current?.close?.();
    // if (mediaRecorderRef.current?.state && mediaRecorderRef.current.state !== "inactive") {
    //     mediaRecorderRef.current.stop();
    //   }
    // mediaStreamRef.current?.getTracks().forEach(t => t.stop());

    // Create WebSocket
    const socket = new WebSocket(
      `wss://api.deepgram.com/v1/listen?punctuate=true&language=en`,
      ["token", DEEPGRAM_API_KEY]
    );
    deepgramSocketRef.current = socket;

    socket.onopen = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = e => e.data.size > 0 && socket.readyState === 1 && socket.send(e.data);
        recorder.start(250);
        console.log("🎙️ Deepgram listening...");
      } catch (err) {
        console.error("Mic error:", err);
        setErrorMessage("Microphone error: " + err.message);
      }
    };

    socket.onmessage = ({ data }) => {
      if (isAssistantOnRef.current) return;

      const transcript = JSON.parse(data)?.channel?.alternatives?.[0]?.transcript?.toLowerCase();
      const triggers = ["help me", "hi eva", "eva", "hello eva", "hey eva", "hello"];
      if (transcript && triggers.some(w => transcript.includes(w))) {
        console.log("🟢 Wake word:", transcript);
        setWakeWordDetected(true);
        triggerVapi();
        socket.close();
        mediaRecorderRef.current?.stop();
        mediaStreamRef.current?.getTracks().forEach(t => t.stop());
      }
    };