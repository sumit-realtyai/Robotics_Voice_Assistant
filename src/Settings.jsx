import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaComments, FaMicrophoneAlt } from 'react-icons/fa';

const Settings = () => {
  const navigate = useNavigate();
  const [selectedAssistant, setSelectedAssistant] = useState('vapi');

  useEffect(() => {
    const savedAssistant = localStorage.getItem('selectedAssistant') || 'vapi';
    setSelectedAssistant(savedAssistant);
  }, []);

  const handleApiChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      localStorage.setItem('selectedAssistant', selected);
      setSelectedAssistant(selected);
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">AI Assistant Settings</h2>
        <p className="text-gray-600 text-center mb-8">Choose your preferred AI assistant</p>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
            <FaRobot className="text-2xl text-indigo-600 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900">VAPI</h3>
              <p className="text-sm text-gray-600">Advanced conversational AI</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <FaComments className="text-2xl text-purple-600 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900">Synthflow</h3>
              <p className="text-sm text-gray-600">Natural language processing</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <FaMicrophoneAlt className="text-2xl text-blue-600 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900">Voiceflow</h3>
              <p className="text-sm text-gray-600">Interactive voice responses</p>
            </div>
          </div>
        </div>

        <select
          value={selectedAssistant}
          onChange={handleApiChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        >
          <option value="vapi">VAPI</option>
          <option value="synthflow">Synthflow</option>
          <option value="voiceflow">Voiceflow</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;