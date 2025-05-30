// App.jsx
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';

const Dashboard = React.lazy(() => import("./Dashboard.jsx"));
const VoiceWidget = React.lazy(() => import("./VoiceWidget.jsx"));
const Synthflow = React.lazy(() => import("./synthflow.jsx"));
const Voiceflow = React.lazy(() => import("./voiceFlow.jsx"));
const Sessions = React.lazy(() => import("./Sessions.jsx"));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vapi" element={<VoiceWidget />} />
            <Route path="/synthflow" element={<Synthflow />} />
            <Route path="/voiceflow" element={<Voiceflow />} />
            <Route path="/sessions" element={<Sessions />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
