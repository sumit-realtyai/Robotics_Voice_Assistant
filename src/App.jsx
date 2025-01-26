// import React from "react";
// import VoiceWidget from "./VoiceWidget.jsx";
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <VoiceWidget />
//     </div>
//   );
// }

// export default App;
import React, { useState, Suspense } from "react";
import './App.css';

// Dynamic imports for components
const VoiceWidget = React.lazy(() => import("./VoiceWidget.jsx"));
const Sarvam = React.lazy(() => import("./sarvam.jsx"));
const Synthflow = React.lazy(() => import("./synthflow.jsx"));
const Voiceflow = React.lazy(() => import("./voiceFlow.jsx"));

function App() {
  const [selectedOption, setSelectedOption] = useState("VAPI");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="App">
      <div className="dropdown-container">
        <label htmlFor="api-select" className="dropdown-label">
          Select API:
        </label>
        <select
          id="api-select"
          className="dropdown"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="VAPI">VAPI</option>
          <option value="Sarvam">Sarvam</option>
          <option value="Synthflow">Synthflow</option>
          <option value="Voiceflow">Voiceflow</option> {/* Added Voiceflow */}
        </select>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {selectedOption === "VAPI" && <VoiceWidget />}
        {selectedOption === "Sarvam" && <Sarvam />}
        {selectedOption === "Synthflow" && <Synthflow />}
        {selectedOption === "Voiceflow" && <Voiceflow />} {/* Trigger Voiceflow here */}
      </Suspense>
    </div>
  );
}

export default App;
