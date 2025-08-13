import React, { useEffect } from "react";

const LiveKitAssistant = () => {
  //  useEffect(() => {
  //     const script = document.createElement("script");
  //     script.src = "http://localhost:3000/embed-popup.js";
  //     script.async = true;
  //     script.defer = true;
  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        overflowY: "auto",
        boxSizing: "border-box",
        
      }}
    >
      <div
        style={{ width: "100%", textAlign: "center", margin: "32px 0 24px 0" }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#2d3748",
            letterSpacing: "1px",
            margin: 0,
            padding: 0,
          }}
        >
          LiveKit Assistant
        </h1>
      </div>
      <div
        style={{
          width: "90vw",
          maxWidth: "1200px",
          height: "80vh",
          
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <iframe
          src="https://sam-rt-av-realty-ai-live-kit-voice-ebon.vercel.app/"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
          allow="microphone; "
          title="LiveKit Assistant"
        ></iframe>
      </div>
    </div>
  );
};

export default LiveKitAssistant;
