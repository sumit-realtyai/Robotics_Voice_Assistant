import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophoneAlt, FaRobot, FaComments } from "react-icons/fa";

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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      {!isFormSubmitted ? (
        <section className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Kid's Details
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
                Child Name
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                value={formData.childName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="additionalInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Instructions
              </label>
              <textarea
                id="additionalInstructions"
                name="additionalInstructions"
                value={formData.additionalInstructions}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter any specific instructions..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 cursor-pointer mt-6"
            >
              Continue
            </button>
          </form>
        </section>
      ) : (
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Choose Your AI Assistant</h2>
            <p className="text-gray-600 text-center mb-8">Select the AI that best suits your child's needs</p>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="flex items-center p-4 bg-indigo-50 rounded-lg">
                <FaRobot className="text-2xl text-indigo-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">VAPI</h3>
                  <p className="text-sm text-gray-600">Advanced conversational AI</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <FaComments className="text-2xl text-purple-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Synthflow</h3>
                  <p className="text-sm text-gray-600">Natural language processing</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <FaMicrophoneAlt className="text-2xl text-blue-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">Voiceflow</h3>
                  <p className="text-sm text-gray-600">Interactive voice responses</p>
                </div>
              </div>
            </div>

            <select
              onChange={handleApiChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            >
              <option value="">-- Select an AI Assistant --</option>
              <option value="vapi">VAPI</option>
              <option value="synthflow">Synthflow</option>
              <option value="voiceflow">Voiceflow</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}