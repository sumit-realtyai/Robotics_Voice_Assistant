import React, { createContext, useContext, useState } from "react";

const MicrophoneContext = createContext();

export const MicrophoneProvider = ({ children }) => {
  const [stream, setStream] = useState(null);

  return (
    <MicrophoneContext.Provider value={{ stream, setStream }}>
      {children}
    </MicrophoneContext.Provider>
  );
};

export const useMicrophone = () => useContext(MicrophoneContext);
