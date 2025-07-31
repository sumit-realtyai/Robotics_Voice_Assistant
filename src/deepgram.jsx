import { useEffect, useRef, useState } from 'react';

const DEEPGRAM_API_KEY = '8db50845e951f4d27e920901a1b20468d51d5407';

export default function DeepgramFun() {
  const [transcripts, setTranscripts] = useState([]);
  const [warning, setWarning] = useState('');
  const [confidenceDisplay, setConfidenceDisplay] = useState(null);
  const socketRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const connectToDeepgram = async () => {
      try {
        const socket = new WebSocket(
          `wss://api.deepgram.com/v1/listen?punctuate=true&language=en&diarize=true`,
          ['token', DEEPGRAM_API_KEY]
        );
        socketRef.current = socket;

        socket.onopen = async () => {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;

          const recorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus',
          });
          mediaRecorderRef.current = recorder;

          recorder.ondataavailable = (event) => {
            if (socket.readyState === WebSocket.OPEN && event.data.size > 0) {
              socket.send(event.data);
            }
          };

          recorder.start(250);
          console.log('🎤 Recording started');
        };

        socket.onmessage = ({ data }) => {
          const alt = JSON.parse(data)?.channel?.alternatives?.[0];
          const text = alt?.transcript;
          const confidence = alt?.confidence;
          const speaker = alt?.words?.[0]?.speaker;

          if (text) {
            const label = speaker !== undefined ? `Speaker ${speaker}` : 'Unknown Speaker';
            const message = `${label}: ${text}`;
            setTranscripts((prev) => [...prev, message]);

            if (confidence !== undefined) {
              const scorePercent = (confidence * 100).toFixed(2);
              setConfidenceDisplay(`🧠 Confidence Score: ${scorePercent}%`);

              if (confidence < 0.85) {
                setWarning(`⚠️ Low confidence: ${scorePercent}%`);

                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play().catch((e) =>
                    console.error('Audio playback error:', e)
                  );
                }
              } else {
                setWarning('');

                if (speaker === 0) {
                  const iframe = document.querySelector('iframe');
                  const modifiedText = `Speaker 0: ${text}`;
                  iframe?.contentWindow?.postMessage({ speaker, text: modifiedText }, '*');
                }
              }
            }
          }
        };

        socket.onerror = (err) => console.error('WebSocket error:', err);
        socket.onclose = () => console.log('Deepgram socket closed');
      } catch (err) {
        console.error('Error initializing Deepgram:', err);
      }
    };

    connectToDeepgram();

    return () => {
      socketRef.current?.close();
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">🎧 Deepgram Live Transcription</h1>

      {confidenceDisplay && (
        <p className="text-lg font-semibold text-gray-800 mb-2">{confidenceDisplay}</p>
      )}

      {warning && <p className="text-red-600 font-bold mb-2">{warning}</p>}

      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 h-[300px] overflow-y-scroll whitespace-pre-wrap">
        {transcripts.length === 0 ? (
          '🎙 Speak to see transcript...'
        ) : (
          transcripts.map((line, idx) => <div key={idx}>• {line}</div>)
        )}
      </div>

      {/* 🔊 Audio warning file */}
      <audio ref={audioRef} src="/output.mp3" preload="auto" />

      {/* 🤖 Vapi Assistant Iframe */}
      <h2 className="text-xl font-semibold mt-8">🤖 Vapi Assistant</h2>
        <iframe
          src="/deepgram-vapi"
          width="100%"
          height="600px"
          sandbox="allow-scripts allow-same-origin"
          allow=""
          title="Vapi Assistant"
          className="border border-black rounded-lg mt-4 w-full"
        />
    </div>
  );
}
