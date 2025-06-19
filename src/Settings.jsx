import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaComments, FaMicrophoneAlt, FaKey, FaSave, FaEdit, FaBluetooth } from 'react-icons/fa';
import { MdToys } from 'react-icons/md';

const Settings = () => {
  const navigate = useNavigate();
  const [selectedAssistant, setSelectedAssistant] = useState('vapi');
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    toyName: 'Talkypie',
    porcupineKey: '',
    vapiPrivateKey: '',
    vapiPublicKey: '',
    esp32Key: ''
  });
  const [tempSettings, setTempSettings] = useState({ ...settings });

  useEffect(() => {
    // Load all settings from localStorage
    const savedAssistant = localStorage.getItem('selectedAssistant') || 'vapi';
    const savedToyName = localStorage.getItem('toyName') || 'Talkypie';
    const savedPorcupineKey = localStorage.getItem('porcupineKey') || '';
    const savedVapiPrivateKey = localStorage.getItem('vapiKey') || '';
    const savedVapiPublicKey = localStorage.getItem('vapiPublicKey') || '';
    const savedEsp32Key = localStorage.getItem('esp32Key') || '';

    setSelectedAssistant(savedAssistant);
    setSettings({
      toyName: savedToyName,
      porcupineKey: savedPorcupineKey,
      vapiPrivateKey: savedVapiPrivateKey,
      vapiPublicKey: savedVapiPublicKey,
      esp32Key: savedEsp32Key
    });
    setTempSettings({
      toyName: savedToyName,
      porcupineKey: savedPorcupineKey,
      vapiPrivateKey: savedVapiPrivateKey,
      vapiPublicKey: savedVapiPublicKey,
      esp32Key: savedEsp32Key
    });
  }, []);

  const handleApiChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      localStorage.setItem('selectedAssistant', selected);
      setSelectedAssistant(selected);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save all settings to localStorage
    localStorage.setItem('toyName', tempSettings.toyName);
    localStorage.setItem('porcupineKey', tempSettings.porcupineKey);
    localStorage.setItem('vapiKey', tempSettings.vapiPrivateKey);
    localStorage.setItem('vapiPublicKey', tempSettings.vapiPublicKey);
    localStorage.setItem('esp32Key', tempSettings.esp32Key);

    setSettings({ ...tempSettings });
    setIsEditing(false);
    navigate("/start"); // Redirect to Start Talkypie after saving
  };

  const handleCancel = () => {
    setTempSettings({ ...settings });
    setIsEditing(false);
  };

  const maskKey = (key) => {
    if (!key) return 'Not set';
    if (key.length <= 8) return '*'.repeat(key.length);
    return key.substring(0, 4) + '*'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-20 md:mb-0 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
            <p className="text-gray-600">Manage your Talkypie configuration and API keys</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              <FaEdit className="text-sm" />
              Edit Settings
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                <FaSave className="text-sm" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Toy Configuration */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <MdToys className="text-2xl text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Toy Configuration</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Toy Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="toyName"
                    value={tempSettings.toyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter toy name"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 font-medium">
                    {settings.toyName}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Assistant Selection */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <FaRobot className="text-2xl text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">AI Assistant</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
                <FaRobot className="text-2xl text-indigo-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">VAPI</h4>
                  <p className="text-sm text-gray-600">Advanced conversational AI</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <FaComments className="text-2xl text-purple-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Synthflow</h4>
                  <p className="text-sm text-gray-600">Natural language processing</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <FaMicrophoneAlt className="text-2xl text-blue-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Voiceflow</h4>
                  <p className="text-sm text-gray-600">Interactive voice responses</p>
                </div>
              </div>
            </div>

            <select
              value={selectedAssistant}
              onChange={handleApiChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              <option value="vapi">VAPI</option>
              <option value="synthflow">Synthflow</option>
              <option value="voiceflow">Voiceflow</option>
            </select>
          </div>

          {/* API Keys */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center gap-3 mb-6">
              <FaKey className="text-2xl text-yellow-600" />
              <h3 className="text-xl font-bold text-gray-900">API Keys</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Porcupine Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FaMicrophoneAlt className="text-yellow-600" />
                    <span>Porcupine Key</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="password"
                    name="porcupineKey"
                    value={tempSettings.porcupineKey}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter Porcupine access key"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 font-mono text-sm">
                    {maskKey(settings.porcupineKey)}
                  </div>
                )}
              </div>

              {/* VAPI Private Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FaRobot className="text-indigo-600" />
                    <span>VAPI Private Key</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="password"
                    name="vapiPrivateKey"
                    value={tempSettings.vapiPrivateKey}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter VAPI private key"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 font-mono text-sm">
                    {maskKey(settings.vapiPrivateKey)}
                  </div>
                )}
              </div>

              {/* VAPI Public Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FaRobot className="text-green-600" />
                    <span>VAPI Public Key</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="vapiPublicKey"
                    value={tempSettings.vapiPublicKey}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter VAPI public key"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 font-mono text-sm">
                    {maskKey(settings.vapiPublicKey)}
                  </div>
                )}
              </div>

              {/* ESP32 Key */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FaBluetooth className="text-blue-600" />
                    <span>ESP32 Key</span>
                  </div>
                </label>
                {isEditing ? (
                  <input
                    type="password"
                    name="esp32Key"
                    value={tempSettings.esp32Key}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter ESP32 key"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 font-mono text-sm">
                    {maskKey(settings.esp32Key)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Toy Name:</strong> This will be used when creating your AI assistant and in conversations.</p>
              <p><strong>Porcupine Key:</strong> Required for wake word detection ("Hi Eva").</p>
              <p><strong>VAPI Keys:</strong> Private key for creating assistants, public key for client SDK.</p>
              <p><strong>ESP32 Key:</strong> Used for connecting to your physical Talkypie device.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;