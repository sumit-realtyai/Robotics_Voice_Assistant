import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ESP32Provider } from "./contexts/ESP32Context";

const LandingPage = React.lazy(() => import("./LandingPage.jsx"));
const StartTalkypie = React.lazy(() => import("./StartTalkypie.jsx"));
const PermissionsCheck = React.lazy(() => import("./components/PermissionsCheck.jsx"));
const VoiceWidget = React.lazy(() => import("./VoiceWidget.jsx"));
const Synthflow = React.lazy(() => import("./synthflow.jsx"));
const Voiceflow = React.lazy(() => import("./voiceFlow.jsx"));
const Sessions = React.lazy(() => import("./Sessions.jsx"));
const Settings = React.lazy(() => import("./Settings.jsx"));
const PaymentPage = React.lazy(() => import("./components/PaymentPage.jsx"));

function App() {
  return (
    <ESP32Provider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
          <Navbar />
          <div className="container mx-auto px-4 py-8 mb-20 md:mb-0">
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/start" element={<StartTalkypie />} />
                <Route path="/permissions" element={<PermissionsCheck />} />
                <Route path="/vapi" element={<VoiceWidget />} />
                <Route path="/synthflow" element={<Synthflow />} />
                <Route path="/voiceflow" element={<Voiceflow />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/payment" element={<PaymentPage />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </Router>
    </ESP32Provider>
  );
}

export default App;