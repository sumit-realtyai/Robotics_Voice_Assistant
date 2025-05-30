import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophoneAlt } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleApiChange = (e) => {
    const selectedApi = e.target.value;
    if (selectedApi) navigate(`/${selectedApi}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col p-6">
  {/* Header Section - stays at the top */}
  <div className="text-center mt-6">
    <div className="flex items-center justify-center gap-3 mb-3">
      <FaMicrophoneAlt className="text-3xl text-blue-600" />
      <h1 className="text-4xl font-extrabold text-gray-800">
        Talkypies Dashboard
      </h1>
    </div>
    <p className="text-gray-600 max-w-xl text-center mx-auto text-base">
      Welcome to the Voice AI platform. Choose an API below or monitor sessions live.
    </p>
  </div>

  {/* Content section: grows to fill remaining space and center items vertically */}
  <div className="flex-1 flex flex-col items-center justify-center mt-10 space-y-10">
    {/* Select API Section */}
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Select API</h2>
      <select
        onChange={handleApiChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">-- Choose API --</option>
        <option value="vapi">VAPI</option>
        <option value="synthflow">Synthflow</option>
        <option value="voiceflow">Voiceflow</option>
      </select>
    </div>

    {/* Monitor Sessions Section */}
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 text-center">
      <button
        onClick={() => navigate("/sessions")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-base transition-all w-full"
      >
        Monitor Sessions
      </button>
      <p className="text-sm text-gray-500 mt-4">
        Click above to explore live call sessions, logs, and performance metrics.
      </p>
    </div>
  </div>
</div>


  );
}
