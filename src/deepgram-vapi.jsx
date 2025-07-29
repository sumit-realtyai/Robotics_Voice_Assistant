
import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import './App.css';

function DeepGramVapi() {
  const [input, setInput] = useState('');
  const [callActive, setCallActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const vapiRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // ✅ Override mic with silent stream
    navigator.mediaDevices.getUserMedia = async (constraints) => {
      if (constraints.audio) {
        const ctx = new AudioContext();
        const dest = ctx.createMediaStreamDestination();

        const silence = ctx.createScriptProcessor(4096, 1, 1);
        silence.onaudioprocess = (e) => {
          const output = e.outputBuffer.getChannelData(0);
          output.fill(0); // fill with silence
        };

        silence.connect(dest);
        return dest.stream;
      }
      return Promise.reject('Only audio requested is supported.');
    };

    // ✅ Initialize Vapi
    const vapi = new Vapi('f1d348a4-ead8-4f35-a3dc-210de6cdc7c5'); // Your Public Key
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      setCallActive(true);
      console.log('✅ Call started');
    });

    vapi.on('call-end', () => {
      setCallActive(false);
      console.log('📞 Call ended');
    });

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const role = message.role === 'user' ? 'You' : 'Assistant';
        setMessages(prev => [...prev, { role, text: message.transcript }]);
        console.log(`${role}: ${message.transcript}`);
      }
    });

    // ✅ Receive messages from Deepgram
    window.addEventListener('message', (event) => {
      const { speaker, text } = event.data || {};
      if (speaker === 0 && text) {
        setMessages(prev => [...prev, { role: 'You', text }]);
        vapi.send({
          type: 'add-message',
          message: {
            role: 'user',
            content: text,
          },
        });
        console.log(`Forwarded speaker 0 to Vapi: ${text}`);
      }
    });

    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  const toggleCall = () => {
    if (callActive) {
      vapiRef.current.stop();
    } else {
      vapiRef.current.start('1de9b062-dd42-49a4-81a3-62056cb9f056'); // Your Assistant ID
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'You', text: input }]);

    vapiRef.current?.send({
      type: 'add-message',
      message: {
        role: 'user',
        content: input,
      },
    });

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🗣️ Voice + 💬 Text Chatbot</h1>

      <button
        onClick={toggleCall}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: callActive ? '#d32f2f' : '#388e3c',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          marginBottom: '20px',
          cursor: 'pointer',
        }}
      >
        {callActive ? 'End Call' : 'Start Call'}
      </button>

      <div
        ref={scrollRef}
        style={{
          backgroundColor: '#f4f4f4',
          padding: '1rem',
          borderRadius: '8px',
          height: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          marginBottom: '10px',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'You' ? 'flex-end' : 'flex-start',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                backgroundColor: msg.role === 'You' ? '#dcedc8' : '#e3f2fd',
                padding: '10px 15px',
                borderRadius: '12px',
                maxWidth: '70%',
              }}
            >
              <strong>{msg.role}</strong>
              <div>{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '6px',
        }}
      />
    </div>
  );
}

export default DeepGramVapi;