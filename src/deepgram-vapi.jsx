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
    navigator.mediaDevices.getUserMedia = async (constraints) => {
      if (constraints.audio) {
        const ctx = new AudioContext();
        const dest = ctx.createMediaStreamDestination();
        const silence = ctx.createScriptProcessor(4096, 1, 1);
        silence.onaudioprocess = (e) => {
          const output = e.outputBuffer.getChannelData(0);
          output.fill(0);
        };
        silence.connect(dest);
        return dest.stream;
      }
      return Promise.reject('Only audio requested is supported.');
    };

    const vapi = new Vapi('f1d348a4-ead8-4f35-a3dc-210de6cdc7c5');
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
        setMessages((prev) => [...prev, { role, text: message.transcript }]);
        console.log(`${role}: ${message.transcript}`);
      }
    });

    window.addEventListener('message', (event) => {
      const { speaker, text } = event.data || {};
      if (speaker === 0 && text) {
        setMessages((prev) => [...prev, { role: 'You', text }]);
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
      vapiRef.current.start('1de9b062-dd42-49a4-81a3-62056cb9f056');
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'You', text: input }]);

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
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">🗣️ Voice + 💬 Text Chatbot</h1>

      <button
        onClick={toggleCall}
        className={`px-6 py-3 text-white text-base font-semibold rounded-md mb-5 transition-colors ${
          callActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {callActive ? 'End Call' : 'Start Call'}
      </button>

      <div
        ref={scrollRef}
        className="bg-gray-100 p-4 rounded-lg h-[300px] overflow-y-auto border border-gray-300 mb-3"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === 'You' ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] ${
                msg.role === 'You' ? 'bg-lime-100' : 'bg-blue-100'
              }`}
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
        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default DeepGramVapi;
