import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophoneAlt } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "male",
    additionalInstructions: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApiChange = (e) => {
    const selectedApi = e.target.value;
    if (selectedApi) {
      const queryParams = new URLSearchParams({
        ...formData,
        isFormSubmitted: true
      }).toString();
      navigate(`/${selectedApi}?${queryParams}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!isFormSubmitted ? (
        <section id="input-form" className="bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Input Details
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="childName" className="text-lg font-medium text-gray-700">
                Child Name:
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                value={formData.childName}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="text-lg font-medium text-gray-700">
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="text-lg font-medium text-gray-700">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="additionalInstructions" className="text-lg font-medium text-gray-700">
                Additional Instructions by Parents:
              </label>
              <textarea
                id="additionalInstructions"
                name="additionalInstructions"
                value={formData.additionalInstructions}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter any specific instructions..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300"
            >
              Continue
            </button>
          </form>
        </section>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-8">
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
      )}
    </div>
  );
}