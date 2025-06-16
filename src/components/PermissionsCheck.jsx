import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMicrophone, FaBluetooth, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { MdBluetooth } from 'react-icons/md';

const PermissionsCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [microphoneStatus, setMicrophoneStatus] = useState('pending'); // pending, granted, denied
  const [esp32Status, setEsp32Status] = useState('pending'); // pending, connected, failed
  const [espCharacteristic, setEspCharacteristic] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const childName = queryParams.get("childName") || "";
  const age = queryParams.get("age") || "";
  const gender = queryParams.get("gender") || "";
  const interests = queryParams.get("interests") || "";
  const currentLearning = queryParams.get("currentLearning") || "";
  const porcupineKey = queryParams.get("porcupineKey") || "";
  const vapiKey = queryParams.get("vapiKey") || localStorage.getItem('vapiKey') || "";
  const vapiPublicKey = queryParams.get("vapiPublicKey") || localStorage.getItem('vapiPublicKey') || "";
  const prompt = queryParams.get("prompt") || "";
  const toyName = queryParams.get('toyName') ;
 
  const requestMicrophonePermission = async () => {
    try {
      setIsChecking(true);
      setErrorMessage('');
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
      
      setMicrophoneStatus('granted');
      console.log('Microphone permission granted');
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setMicrophoneStatus('denied');
      setErrorMessage('Microphone access is required for voice interaction with Talkypie.');
    } finally {
      setIsChecking(false);
    }
  };

  const connectToESP32 = async () => {
    try {
      setIsChecking(true);
      setErrorMessage('');
      
      if (!navigator.bluetooth) {
        throw new Error('Bluetooth is not supported in this browser');
      }

      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "ESP32-Blinker" }],
        optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
      );
      const char = await service.getCharacteristic(
        "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
      );

      setEspCharacteristic(char);
      setEsp32Status('connected');
      console.log("ESP32 connected successfully");
    } catch (error) {
      console.error("ESP32 connection failed:", error);
      setEsp32Status('failed');
      
      if (error.name === 'NotFoundError') {
        setErrorMessage('ESP32 device not found. Please make sure your Talkypie is turned on and nearby.');
      } else if (error.name === 'SecurityError') {
        setErrorMessage('Bluetooth access was denied. Please allow Bluetooth permissions.');
      } else if (error.message.includes('Bluetooth is not supported')) {
        setErrorMessage('Bluetooth is not supported in this browser. Please use Chrome or Edge.');
      } else {
        setErrorMessage('Failed to connect to Talkypie. Please try again.');
      }
    } finally {
      setIsChecking(false);
    }
  };

  const proceedToVoiceWidget = () => {
    const params = new URLSearchParams({
      childName,
      age,
      gender,
      interests,
      currentLearning,
      porcupineKey,
      vapiKey,
      vapiPublicKey,
      isFormSubmitted: 'true',
      prompt,
      toyName,
    });
    
    // Store ESP32 characteristic in sessionStorage for VoiceWidget to use
    if (espCharacteristic) {
      sessionStorage.setItem('esp32Connected', 'true');
    }
    
    navigate(`/vapi?${params.toString()}`);
  };

  // const canProceed = microphoneStatus === 'granted' && esp32Status === 'connected';
const canProceed = true;
  const getStatusIcon = (status) => {
    switch (status) {
      case 'granted':
      case 'connected':
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case 'denied':
      case 'failed':
        return <FaTimesCircle className="text-red-500 text-xl" />;
      default:
        return <FaExclamationTriangle className="text-yellow-500 text-xl" />;
    }
  };

  const getStatusText = (status, type) => {
    if (type === 'microphone') {
      switch (status) {
        case 'granted': return 'Microphone access granted';
        case 'denied': return 'Microphone access denied';
        default: return 'Microphone permission required';
      }
    } else {
      switch (status) {
        case 'connected': return 'ESP32 connected successfully';
        case 'failed': return 'ESP32 connection failed';
        default: return 'ESP32 connection required';
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] p-4 mb-20 md:mb-0">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Setup Your Talkypie
          </h2>
          <p className="text-gray-600">
            We need a couple of permissions to get {childName}'s Talkypie ready for conversation.
          </p>
        </div>

        <div className="space-y-4">
          {/* Microphone Permission */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <FaMicrophone className="text-2xl text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Microphone Access</h3>
                  <p className="text-sm text-gray-600">Required for voice conversations</p>
                </div>
              </div>
              {getStatusIcon(microphoneStatus)}
            </div>
            
            <p className="text-sm text-gray-700 mb-3">
              {getStatusText(microphoneStatus, 'microphone')}
            </p>
            
            {microphoneStatus === 'pending' && (
              <button
                onClick={requestMicrophonePermission}
                disabled={isChecking}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isChecking ? 'Requesting Permission...' : 'Grant Microphone Access'}
              </button>
            )}
            
            {microphoneStatus === 'denied' && (
              <button
                onClick={requestMicrophonePermission}
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Try Again
              </button>
            )}
          </div>

          {/* ESP32 Connection */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <MdBluetooth className="text-2xl text-purple-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Connect to Talkypie</h3>
                  <p className="text-sm text-gray-600">Bluetooth connection to your device</p>
                </div>
              </div>
              {getStatusIcon(esp32Status)}
            </div>
            
            <p className="text-sm text-gray-700 mb-3">
              {getStatusText(esp32Status, 'esp32')}
            </p>
            
            {esp32Status === 'pending' && (
              <button
                onClick={connectToESP32}
                disabled={isChecking}
                className="w-full py-2 px-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isChecking ? 'Connecting...' : 'Connect to Talkypie'}
              </button>
            )}
            
            {esp32Status === 'failed' && (
              <button
                onClick={connectToESP32}
                className="w-full py-2 px-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all duration-300"
              >
                Try Again
              </button>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FaTimesCircle className="text-red-500 text-lg" />
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="pt-3">
            <button
              onClick={proceedToVoiceWidget}
              disabled={!canProceed}
              className={`w-full py-3 px-6 font-bold rounded-lg text-lg transition-all duration-300 ${
                canProceed
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canProceed ? "Start Talking with Talkypie! 🎉" : "Complete Setup to Continue"}
            </button>
          </div>

          {/* Help Text */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              Having trouble? Make sure your Talkypie device is powered on and Bluetooth is enabled on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsCheck;