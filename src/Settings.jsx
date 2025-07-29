import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaComments, FaMicrophoneAlt, FaKey, FaSave, FaEdit, FaBluetooth, FaCheck, FaTimes, FaClock, FaMoon } from 'react-icons/fa';
import { MdToys } from 'react-icons/md';

const Settings = () => {
  const navigate = useNavigate();
  const [selectedAssistant, setSelectedAssistant] = useState('vapi');
  const [editingField, setEditingField] = useState(null);
  const [settings, setSettings] = useState({
    toyName: 'Talkypie',
    porcupineKey: '',
    vapiPrivateKey: '',
    vapiPublicKey: '',
    esp32Key: '',
    customPrompt: '',
    dailyUsageLimit: '30',
    quietHoursStart: '20:00',
    quietHoursEnd: '07:00'
  });
  const [tempSettings, setTempSettings] = useState({ ...settings });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Load all settings from localStorage
    const savedAssistant = localStorage.getItem('selectedAssistant') || 'vapi';
    const savedToyName = localStorage.getItem('toyName') || 'Talkypie';
    const savedPorcupineKey = localStorage.getItem('porcupineKey') || '';
    const savedVapiPrivateKey = localStorage.getItem('vapiKey') || '';
    const savedVapiPublicKey = localStorage.getItem('vapiPublicKey') || '';
    const savedEsp32Key = localStorage.getItem('esp32Key') || '';
    const savedCustomPrompt = localStorage.getItem('customPrompt') || '';
    const savedDailyUsageLimit = localStorage.getItem('dailyUsageLimit') || '30';
    const savedQuietHoursStart = localStorage.getItem('quietHoursStart') || '20:00';
    const savedQuietHoursEnd = localStorage.getItem('quietHoursEnd') || '07:00';

    setSelectedAssistant(savedAssistant);
    setSettings({
      toyName: savedToyName,
      porcupineKey: savedPorcupineKey,
      vapiPrivateKey: savedVapiPrivateKey,
      vapiPublicKey: savedVapiPublicKey,
      esp32Key: savedEsp32Key,
      customPrompt: savedCustomPrompt,
      dailyUsageLimit: savedDailyUsageLimit,
      quietHoursStart: savedQuietHoursStart,
      quietHoursEnd: savedQuietHoursEnd
    });
    setTempSettings({
      toyName: savedToyName,
      porcupineKey: savedPorcupineKey,
      vapiPrivateKey: savedVapiPrivateKey,
      vapiPublicKey: savedVapiPublicKey,
      esp32Key: savedEsp32Key,
      customPrompt: savedCustomPrompt,
      dailyUsageLimit: savedDailyUsageLimit,
      quietHoursStart: savedQuietHoursStart,
      quietHoursEnd: savedQuietHoursEnd
    });
  }, []);

  const handleApiChange = (e) => {
    const selected = e.target.value;
    if(selected === "deepgram+vapi") {
      navigate("/deepgram");
    }
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
    setHasUnsavedChanges(true);
  };

  const handleSaveField = (fieldName) => {
    const fieldMap = {
      toyName: 'toyName',
      porcupineKey: 'porcupineKey',
      vapiPrivateKey: 'vapiKey',
      vapiPublicKey: 'vapiPublicKey',
      esp32Key: 'esp32Key',
      customPrompt: 'customPrompt',
      dailyUsageLimit: 'dailyUsageLimit',
      quietHoursStart: 'quietHoursStart',
      quietHoursEnd: 'quietHoursEnd'
    };
    
    localStorage.setItem(fieldMap[fieldName], tempSettings[fieldName]);
    setSettings(prev => ({
      ...prev,
      [fieldName]: tempSettings[fieldName]
    }));
    setEditingField(null);
    setHasUnsavedChanges(false);
  };

  const handleCancelEdit = (fieldName) => {
    setTempSettings(prev => ({
      ...prev,
      [fieldName]: settings[fieldName]
    }));
    setEditingField(null);
    setHasUnsavedChanges(false);
  };

  const handleSaveAll = () => {
    // Save all settings to localStorage
    localStorage.setItem('toyName', tempSettings.toyName);
    localStorage.setItem('porcupineKey', tempSettings.porcupineKey);
    localStorage.setItem('vapiKey', tempSettings.vapiPrivateKey);
    localStorage.setItem('vapiPublicKey', tempSettings.vapiPublicKey);
    localStorage.setItem('esp32Key', tempSettings.esp32Key);
    localStorage.setItem('customPrompt', tempSettings.customPrompt);
    localStorage.setItem('dailyUsageLimit', tempSettings.dailyUsageLimit);
    localStorage.setItem('quietHoursStart', tempSettings.quietHoursStart);
    localStorage.setItem('quietHoursEnd', tempSettings.quietHoursEnd);

    setSettings({ ...tempSettings });
    setEditingField(null);
    setHasUnsavedChanges(false);
    navigate("/start"); // Redirect to Start Talkypie after saving
  };

  const handleCancelAll = () => {
    setTempSettings({ ...settings });
    setEditingField(null);
    setHasUnsavedChanges(false);
  };

  const maskKey = (key) => {
    if (!key) return 'Not set';
    if (key.length <= 8) return '*'.repeat(key.length);
    return key.substring(0, 4) + '*'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  const renderEditableField = (fieldName, label, type = 'text', placeholder = '') => {
    const isEditing = editingField === fieldName;
    const value = tempSettings[fieldName];
    const displayValue = type === 'password' && !isEditing ? maskKey(value) : value;
    
    return { isEditing, value, displayValue };
  };

  const InlineEditField = ({ fieldName, label, type = 'text', placeholder = '', icon }) => {
    const { isEditing, value, displayValue } = renderEditableField(fieldName, label, type, placeholder);

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
          </div>
        </label>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type={type}
              name={fieldName}
              value={value}
              onChange={handleInputChange}
              onBlur={() => handleSaveField(fieldName)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveField(fieldName);
                if (e.key === 'Escape') handleCancelEdit(fieldName);
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={placeholder}
              autoFocus
            />
            <button
              onClick={() => handleSaveField(fieldName)}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              <FaCheck className="text-sm" />
            </button>
            <button
              onClick={() => handleCancelEdit(fieldName)}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        ) : (
          <div 
            onClick={() => setEditingField(fieldName)}
            className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 font-mono text-sm cursor-pointer hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-300"
          >
            {displayValue || <span className="text-gray-400 italic">Click to edit</span>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-20 md:mb-0 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
            <p className="text-gray-600">Manage your Talkypie configuration and API keys</p>
          </div>
          {hasUnsavedChanges && (
            <div className="flex gap-2">
              <button
                onClick={handleSaveAll}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300"
              >
                <FaSave className="text-sm" />
                Save All & Continue
              </button>
              <button
                onClick={handleCancelAll}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                Cancel All
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
              <InlineEditField
                fieldName="toyName"
                label="Toy Name"
                placeholder="Enter toy name"
              />
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
              <option value="deepgram+vapi">deepgram+vapi</option>
            </select>
          </div>

          {/* API Keys */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center gap-3 mb-6">
              <FaKey className="text-2xl text-yellow-600" />
              <h3 className="text-xl font-bold text-gray-900">API Keys</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InlineEditField
                fieldName="porcupineKey"
                label="Porcupine Key"
                type="password"
                placeholder="Enter Porcupine access key"
                icon={<FaMicrophoneAlt className="text-yellow-600" />}
              />

              <InlineEditField
                fieldName="vapiPrivateKey"
                label="VAPI Private Key"
                type="password"
                placeholder="Enter VAPI private key"
                icon={<FaRobot className="text-indigo-600" />}
              />

              <InlineEditField
                fieldName="vapiPublicKey"
                label="VAPI Public Key"
                type="text"
                placeholder="Enter VAPI public key"
                icon={<FaRobot className="text-green-600" />}
              />

              <InlineEditField
                fieldName="esp32Key"
                label="ESP32 Key"
                type="password"
                placeholder="Enter ESP32 key"
                icon={<FaBluetooth className="text-blue-600" />}
              />
            </div>
          </div>

          {/* Advanced Customization */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-6">
              <FaEdit className="text-2xl text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Advanced Customization</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FaEdit className="text-purple-600" />
                    <span>Custom Prompt</span>
                  </div>
                </label>
                <div className="bg-purple-100 rounded-lg p-3 mb-2">
                  <p className="text-sm text-purple-800 font-medium mb-1">✍ Example:</p>
                  <p className="text-sm text-purple-700">
                    Always speak in a gentle, encouraging tone. Focus on building confidence and ask open-ended questions to spark creativity.
                  </p>
                </div>
                {editingField === 'customPrompt' ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      name="customPrompt"
                      value={tempSettings.customPrompt}
                      onChange={handleInputChange}
                      onBlur={() => handleSaveField('customPrompt')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) handleSaveField('customPrompt');
                        if (e.key === 'Escape') handleCancelEdit('customPrompt');
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter custom instructions for the AI assistant..."
                      rows="4"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveField('customPrompt')}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-sm"
                      >
                        <FaCheck className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleCancelEdit('customPrompt')}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => setEditingField('customPrompt')}
                    className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 text-sm cursor-pointer hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-300 min-h-[100px] whitespace-pre-wrap"
                  >
                    {tempSettings.customPrompt || <span className="text-gray-400 italic">Click to add custom instructions for the AI assistant...</span>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Usage Control */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-6">
              <FaClock className="text-2xl text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Usage Control</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-green-600" />
                    <span>Daily Usage Limit (minutes)</span>
                  </div>
                </label>
                {editingField === 'dailyUsageLimit' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="dailyUsageLimit"
                      value={tempSettings.dailyUsageLimit}
                      onChange={handleInputChange}
                      onBlur={() => handleSaveField('dailyUsageLimit')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveField('dailyUsageLimit');
                        if (e.key === 'Escape') handleCancelEdit('dailyUsageLimit');
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="30"
                      min="1"
                      max="480"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveField('dailyUsageLimit')}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                    >
                      <FaCheck className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleCancelEdit('dailyUsageLimit')}
                      className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => setEditingField('dailyUsageLimit')}
                    className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 font-mono text-sm cursor-pointer hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-300"
                  >
                    {tempSettings.dailyUsageLimit} minutes/day
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FaMoon className="text-green-600" />
                    <span>Quiet Hours Start</span>
                  </div>
                </label>
                {editingField === 'quietHoursStart' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      name="quietHoursStart"
                      value={tempSettings.quietHoursStart}
                      onChange={handleInputChange}
                      onBlur={() => handleSaveField('quietHoursStart')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveField('quietHoursStart');
                        if (e.key === 'Escape') handleCancelEdit('quietHoursStart');
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveField('quietHoursStart')}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                    >
                      <FaCheck className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleCancelEdit('quietHoursStart')}
                      className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => setEditingField('quietHoursStart')}
                    className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 font-mono text-sm cursor-pointer hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-300"
                  >
                    {tempSettings.quietHoursStart}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <FaMoon className="text-green-600" />
                    <span>Quiet Hours End</span>
                  </div>
                </label>
                {editingField === 'quietHoursEnd' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      name="quietHoursEnd"
                      value={tempSettings.quietHoursEnd}
                      onChange={handleInputChange}
                      onBlur={() => handleSaveField('quietHoursEnd')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveField('quietHoursEnd');
                        if (e.key === 'Escape') handleCancelEdit('quietHoursEnd');
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveField('quietHoursEnd')}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                    >
                      <FaCheck className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleCancelEdit('quietHoursEnd')}
                      className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => setEditingField('quietHoursEnd')}
                    className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 font-mono text-sm cursor-pointer hover:bg-gray-100 transition-all duration-300 border border-transparent hover:border-gray-300"
                  >
                    {tempSettings.quietHoursEnd}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 bg-green-100 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-sm">
                <strong>Usage Control:</strong> Set daily limits and quiet hours to help manage your child's interaction time with Talkypie. 
                During quiet hours, the assistant will be less responsive and encourage rest time.
              </p>
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
              <p><strong>Custom Prompt:</strong> Add specific instructions or personality traits for the AI assistant.</p>
              <p><strong>Daily Usage Limit:</strong> Maximum minutes per day your child can interact with Talkypie.</p>
              <p><strong>Quiet Hours:</strong> Time period when Talkypie will be in sleep mode or less responsive.</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-blue-800 font-medium">💡 Quick Edit Tips:</p>
                <ul className="text-blue-700 text-xs mt-2 space-y-1">
                  <li>• Click any field to edit it directly</li>
                  <li>• Press Enter to save, Escape to cancel</li>
                  <li>• Changes save automatically when you click away</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;