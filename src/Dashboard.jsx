import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdChildCare, MdSchool } from "react-icons/md";
import { FaBookReader, FaTheaterMasks, FaBrain, FaHeart, FaKey } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "male",
    personality: "",
    education: "",
    porcupineKey: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const selectedAssistant = localStorage.getItem('selectedAssistant') || 'vapi';
    const queryParams = new URLSearchParams({
      ...formData,
      isFormSubmitted: true
    }).toString();
    navigate(`/${selectedAssistant}?${queryParams}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <MdChildCare className="text-3xl text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Kid's Profile</h2>
        </div>
        
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label htmlFor="porcupineKey" className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <FaKey className="text-yellow-600" />
                  <span>Porcupine Key (Temporary)</span>
                </div>
              </label>
              <input
                type="text"
                id="porcupineKey"
                name="porcupineKey"
                value={formData.porcupineKey}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your Porcupine access key"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="personality" className="block text-sm font-medium text-gray-700">
                Personality & Social Traits
              </label>
              <div className="bg-rose-50 p-4 rounded-lg mb-2">
                <div className="flex items-start gap-2 mb-3">
                  <FaHeart className="text-rose-600 text-xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-rose-900 mb-1">Personality Profile</h4>
                    <p className="text-sm text-rose-800">
                      Help us understand your child's unique personality and social preferences
                    </p>
                  </div>
                </div>
                <ul className="text-sm text-rose-700 ml-7 list-disc space-y-1">
                  <li>Temperament (shy, outgoing, etc.)</li>
                  <li>Social interaction style</li>
                  <li>Emotional expression</li>
                  <li>Communication preferences</li>
                  <li>Comfort with new situations</li>
                </ul>
              </div>
              <textarea
                id="personality"
                name="personality"
                value={formData.personality}
                onChange={handleInputChange}
                rows="4"
                placeholder="Example: Emma is naturally curious and outgoing. She loves making new friends but sometimes needs help managing excitement..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Educational Background
              </label>
              <div className="bg-blue-50 p-4 rounded-lg mb-2">
                <div className="flex items-start gap-2 mb-3">
                  <FaBookReader className="text-blue-600 text-xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Learning Profile</h4>
                    <p className="text-sm text-blue-800">
                      Share your child's educational journey and learning preferences
                    </p>
                  </div>
                </div>
                <ul className="text-sm text-blue-700 ml-7 list-disc space-y-1">
                  <li>Current grade level</li>
                  <li>Favorite subjects</li>
                  <li>Learning style (visual, hands-on, etc.)</li>
                  <li>Academic strengths and challenges</li>
                  <li>Special educational needs</li>
                </ul>
              </div>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                rows="4"
                placeholder="Example: Currently in 3rd grade, excels in math and science. Learns best through visual aids and hands-on experiments..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 cursor-pointer"
          >
            Start Learning Journey
          </button>
        </form>
      </section>
    </div>
  );
}