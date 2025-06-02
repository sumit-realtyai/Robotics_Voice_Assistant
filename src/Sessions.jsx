import { useEffect, useState } from "react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ totalSessions: 0, totalMinutes: 0, totalCost: 0 });

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch("http://localhost:5000/vapi/sessions"); // Replace with your API URL
        const data = await res.json();
        setSessions(data.callData);
        setTotals({
          totalSessions: data.totalSessions,
          totalMinutes: data.totalMinutes,
          totalCost: data.totalCost,
        });
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-100 to-slate-200 h-11/12  py-12 px-4 sm:px-8">
  {/* Summary Metrics */}
  <div className="max-w-4xl mx-auto mb-10 text-center">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Call Sessions</h1>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-md py-6 px-4">
        <p className="text-gray-500 text-sm">Total Sessions</p>
        <p className="text-2xl font-bold text-blue-600">{totals.totalSessions}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md py-6 px-4">
        <p className="text-gray-500 text-sm">Total Minutes</p>
        <p className="text-2xl font-bold text-blue-600">{totals.totalMinutes.toFixed(2)}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md py-6 px-4">
        <p className="text-gray-500 text-sm">Total Cost</p>
        <p className="text-2xl font-bold text-blue-600">${totals.totalCost.toFixed(4)}</p>
      </div>
    </div>
  </div>

<div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 sm:p-6 lg:p-8">
  {sessions.map((session, idx) => {
    const isLongCall = session.durationSeconds > 60;
    const isLowCost = session.cost < 0.05;

    return (
      <div
        key={idx}
        className="bg-white border-l-4 border-blue-500 rounded-2xl shadow-xl p-6 min-h-[280px] flex flex-col justify-between hover:shadow-2xl transition-all duration-200"
      >
        {/* Timestamp and Tags */}
        <div className="flex justify-between items-start mb-3">
          <p className="text-sm text-gray-500 font-medium">
            {new Date(session.timestamp).toLocaleString()}
          </p>
          <div className="flex gap-2 flex-wrap">
            {isLongCall && (
              <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded-full">
                Long Call
              </span>
            )}
            {isLowCost && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs font-semibold rounded-full">
                Low Cost
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-800 text-base leading-relaxed font-medium line-clamp-5 mb-4">
          {session.summary && session.summary.length > 0
            ? session.summary
            : "📌 No detailed summary available for this call."}
        </p>

        {/* Duration + Cost */}
        <div className="flex items-center justify-between text-base text-gray-600 font-semibold mb-4">
          <span>⏱️ {session.durationSeconds.toFixed(2)} sec</span>
          <span>💰 ${session.cost.toFixed(4)}</span>
        </div>

        {/* Audio Player */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            🎙️ Recording
          </label>
          <audio controls className="w-full rounded-lg shadow-sm">
            <source src={session.recordingUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    );
  })}
</div>


</div>

  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all">
      <h3 className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wide">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
