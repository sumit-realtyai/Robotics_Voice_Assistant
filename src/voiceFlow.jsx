import { useEffect, useRef, useState } from 'react';
import './App.css';

function VoiceflowWidget() {
  const sysLogRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [micActive, setMicActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const micThreshold = 2; // Adjust for your environment

  const getTimestamp = () => new Date().toLocaleTimeString();

  const appendLog = (type, speaker, message) => {
    setLogs(prev => [
      ...prev,
      {
        timestamp: getTimestamp(),
        type,
        speaker,
        message,
      },
    ]);
  };

  const logToSystem = (msg) => {
    const line = `[${getTimestamp()}] ${msg}`;
    if (sysLogRef.current) {
      const div = document.createElement('div');
      div.textContent = line;
      sysLogRef.current.appendChild(div);
      sysLogRef.current.scrollTop = sysLogRef.current.scrollHeight;
    }
    appendLog('System', '', msg);
  };

  const logToConversation = (speaker, msg) => {
    appendLog('Conversation', speaker, msg);
  };

  const downloadCSV = () => {
    const headers = 'Timestamp,Type,Speaker,Message\n';
    const rows = logs
      .map(
        (log) =>
          `"${log.timestamp}","${log.type}","${log.speaker}","${log.message.replace(/"/g, '""')}"`
      )
      .join('\n');
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Voiceflow widget
  useEffect(() => {
    (function (d, t) {
      const v = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          verify: { projectID: '6858fc6623e97962edaeb7c1' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: { url: 'https://runtime-api.voiceflow.com' },
        });

        window.voiceflow.chat.on('start', () =>
          logToSystem('✅ Voiceflow session started')
        );
        window.voiceflow.chat.on('speak', (msg) => {
          const text = msg?.payload?.message || '[no response]';
          logToSystem('💬 Bot spoke');
          logToConversation('Bot', text);
        });
        window.voiceflow.chat.on('send', (msg) => {
          const text = msg?.payload?.message || '[no message]';
          logToSystem('📤 User message sent');
          logToConversation('You', text);
        });
      };
      v.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
      v.type = 'text/javascript';
      s.parentNode.insertBefore(v, s);
    })(document, 'script');
  }, []);

  // Mic threshold logic using Web Audio API + SpeechRecognition for transcript
  useEffect(() => {
    let audioContext;
    let analyser;
    let microphone;
    let dataArray;
    let rafId;
    let soundActive = false;
    let recognition;
    let isRecognizing = false;

    async function startMicListening() {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphone = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        microphone.connect(analyser);

        // Setup SpeechRecognition for transcript
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
          recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = false;
          recognition.lang = 'en-US';

          recognition.onresult = (event) => {
            let fullTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                fullTranscript += event.results[i][0].transcript;
              }
            }
            if (fullTranscript.trim()) {
              setTranscript((prev) => (prev ? prev + ' ' : '') + fullTranscript.trim());
              logToSystem('📝 Transcript received: ' + fullTranscript.trim());
              logToConversation('You', fullTranscript.trim());
            }
          };

          recognition.onerror = (e) => {
            logToSystem(`❌ SpeechRecognition error: ${e.error}`);
            isRecognizing = false;
          };

          recognition.onend = () => {
            isRecognizing = false;
            setMicActive(false);
            logToSystem('🛑 SpeechRecognition stopped');
            // Always restart for continuous listening
            try {
              recognition.start();
              isRecognizing = true;
            } catch (err) {
              logToSystem(`⚠️ Could not restart SpeechRecognition: ${err.message}`);
            }
          };
        }

        const checkVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const avg =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

          // Only start recognition if sound is above threshold (likely human speech)
          if (avg > micThreshold && !soundActive) {
            soundActive = true;
            setMicActive(true);
            logToSystem('🎙️ Human sound detected, listening...');
            if (recognition && !isRecognizing) {
              try {
                recognition.start();
                isRecognizing = true;
              } catch (err) {
                logToSystem(`⚠️ Could not start SpeechRecognition: ${err.message}`);
              }
            }
          } else if (avg <= micThreshold && soundActive) {
            soundActive = false;
            setMicActive(false);
            logToSystem('🛑 Silence detected, stopped listening');
            // Do not stop recognition here to keep it running
          }

          rafId = requestAnimationFrame(checkVolume);
        };

        checkVolume();
      } catch (err) {
        logToSystem(`⚠️ Mic access error: ${err.message}`);
      }
    }

    startMicListening();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (microphone) microphone.disconnect();
      if (analyser) analyser.disconnect();
      if (audioContext) audioContext.close();
      if (recognition) recognition.abort();
      setMicActive(false);
    };
  }, [micThreshold]);

  return (
<div className="App p-6 max-w-4xl mx-auto">
  <h1 className="text-2xl font-bold mb-2">🎙️ Voiceflow Logger</h1>
  <p className="text-lg mb-6">
    Status: <span>{micActive ? '🎤 Listening for human speech...' : '🔇 Idle'}</span>
  </p>

  <h2 className="text-xl font-semibold mb-2">📋 System Log</h2>
  <div
    className="border border-gray-300 bg-gray-100 p-3 mb-6 w-full max-w-2xl h-52 overflow-y-scroll text-left text-sm whitespace-pre-wrap rounded-md"
    ref={sysLogRef}
  ></div>

  <h2 className="text-xl font-semibold mb-2">💬 Conversation Log</h2>
  <div className="border border-gray-300 bg-gray-100 p-3 mb-6 w-full max-w-2xl h-52 overflow-y-scroll text-left text-sm whitespace-pre-wrap rounded-md">
    {logs
      .filter(log => log.type === 'Conversation')
      .map((log, idx) => (
        <div key={idx}>
          <strong>{log.speaker}:</strong> {log.message}
        </div>
      ))}
  </div>

  <h2 className="text-xl font-semibold mb-2">📝 Transcript</h2>
  <div className="border border-gray-300 bg-gray-100 p-2 mb-6 w-full max-w-2xl min-h-[60px] text-sm rounded-md">
    {transcript || <span className="text-gray-400">No transcript yet</span>}
  </div>

  <button
    onClick={downloadCSV}
    className="mt-4 px-6 py-2 text-white text-base font-medium bg-blue-600 rounded-md hover:bg-blue-700 transition"
  >
    ⬇️ Download CSV
  </button>
</div>

  );
}

export default VoiceflowWidget;

