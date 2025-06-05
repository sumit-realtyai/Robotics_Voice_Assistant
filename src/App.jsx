import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const Dashboard = React.lazy(() => import("./Dashboard.jsx"));
const VoiceWidget = React.lazy(() => import("./VoiceWidget.jsx"));
const Synthflow = React.lazy(() => import("./synthflow.jsx"));
const Voiceflow = React.lazy(() => import("./voiceFlow.jsx"));
const Sessions = React.lazy(() => import("./Sessions.jsx"));
const Settings = React.lazy(() => import("./Settings.jsx"));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vapi" element={<VoiceWidget />} />
              <Route path="/synthflow" element={<Synthflow />} />
              <Route path="/voiceflow" element={<Voiceflow />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;