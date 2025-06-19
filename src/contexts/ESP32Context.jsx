import React, { createContext, useContext, useState, useEffect } from 'react';

const ESP32Context = createContext();

export const useESP32 = () => {
  const context = useContext(ESP32Context);
  if (!context) {
    throw new Error('useESP32 must be used within an ESP32Provider');
  }
  return context;
};

export const ESP32Provider = ({ children }) => {
  const [espCharacteristic, setEspCharacteristic] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionLost, setConnectionLost] = useState(false);

  // Check for connection loss on component mount (after hard reload)
  useEffect(() => {
    const wasConnected = sessionStorage.getItem('esp32Connected') === 'true';
    if (wasConnected && !espCharacteristic) {
      setConnectionLost(true);
      // Clear the session storage since connection is actually lost
      sessionStorage.removeItem('esp32Connected');
    }
  }, [espCharacteristic]);

  const setCharacteristic = (characteristic) => {
    setEspCharacteristic(characteristic);
    setIsConnected(true);
    setConnectionLost(false);
    sessionStorage.setItem('esp32Connected', 'true');
  };

  const clearCharacteristic = () => {
    setEspCharacteristic(null);
    setIsConnected(false);
    setConnectionLost(false);
    sessionStorage.removeItem('esp32Connected');
  };

  const acknowledgeConnectionLoss = () => {
    setConnectionLost(false);
  };

  const value = {
    espCharacteristic,
    isConnected,
    connectionLost,
    setCharacteristic,
    clearCharacteristic,
    acknowledgeConnectionLoss
  };

  return (
    <ESP32Context.Provider value={value}>
      {children}
    </ESP32Context.Provider>
  );
};