

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

                // ✅ Only send to iframe if confidence is high
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
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎧 Deepgram Live Transcription</h1>

      {confidenceDisplay && (
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
          {confidenceDisplay}
        </p>
      )}

      {warning && <p style={{ color: 'red', fontWeight: 'bold' }}>{warning}</p>}

      <div
        style={{
          backgroundColor: '#f4f4f4',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          height: '300px',
          overflowY: 'scroll',
          whiteSpace: 'pre-wrap',
        }}
      >
        {transcripts.length === 0 ? (
          '🎙 Speak to see transcript...'
        ) : (
          transcripts.map((line, idx) => <div key={idx}>• {line}</div>)
        )}
      </div>

      {/* 🔊 Audio warning file */}
      <audio ref={audioRef} src="/output.mp3" preload="auto" />

      {/* 🤖 Vapi Assistant Iframe */}
      <h2 style={{ marginTop: '2rem' }}>🤖 Vapi Assistant</h2>
      <iframe
        src="/deepgram-vapi"
        width="100%"
        height="600px"
        sandbox="allow-scripts allow-same-origin"
        allow=""
        style={{
          border: '1px solid black',
          borderRadius: '10px',
          marginTop: '1rem',
        }}
        title="Vapi Assistant"
      />
    </div>
  );
}