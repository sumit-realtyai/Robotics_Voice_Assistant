import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdChildCare } from "react-icons/md";
import { FaStar, FaGraduationCap, FaEdit } from "react-icons/fa";

export default function StartTalkypie() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "male",
    interests: "",
    currentLearning: "",
    prompt: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Get keys from localStorage (managed in Settings)
    const porcupineKey = localStorage.getItem('porcupineKey') || '';
    const vapiKey = localStorage.getItem('vapiKey') || '';
    const vapiPublicKey = localStorage.getItem('vapiPublicKey') || '';
    const toyName = localStorage.getItem('toyName') || 'Talkypie';
    
    // Check if required keys are available
    if (!porcupineKey ) {
      alert('Please configure atleast Porcupine API keys in Settings before starting.');
      navigate('/settings');
      return;
    }
    
    const queryParams = new URLSearchParams({
      ...formData,
      porcupineKey,
      vapiKey,
      vapiPublicKey,
      toyName,
      isFormSubmitted: true
    }).toString();
    
    navigate(`/permissions?${queryParams}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 mb-20 md:mb-0">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                What does your child like (or dislike)?
              </label>
              <div className="bg-rose-50 p-4 rounded-lg mb-2">
                <div className="flex items-start gap-2 mb-3">
                  <FaStar className="text-rose-600 text-xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-rose-900 mb-1">Interests & Preferences</h4>
                    <p className="text-sm text-rose-800">
                      Help us understand what excites or bores your child, so Talkypie can spark better conversations.
                    </p>
                  </div>
                </div>
                <div className="bg-rose-100 rounded-lg p-3 ml-7">
                  <p className="text-sm text-rose-800 font-medium mb-1">✍ Example:</p>
                  <p className="text-sm text-rose-700">
                    Loves animals and space, dislikes long stories; enjoys jokes, music, and pretend play.
                  </p>
                </div>
              </div>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about your child's likes, dislikes, hobbies, favorite activities, and interests..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="currentLearning" className="block text-sm font-medium text-gray-700">
                What is your child currently learning in school?
              </label>
              <div className="bg-blue-50 p-4 rounded-lg mb-2">
                <div className="flex items-start gap-2 mb-3">
                  <FaGraduationCap className="text-blue-600 text-xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Current Learning</h4>
                    <p className="text-sm text-blue-800">
                      Let Talkypie gently support your child's current learning through playful chat.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 ml-7">
                  <p className="text-sm text-blue-800 font-medium mb-1">✍ Example:</p>
                  <p className="text-sm text-blue-700">
                    Learning addition and subtraction, Hindi alphabets, and the solar system.
                  </p>
                </div>
              </div>
              <textarea
                id="currentLearning"
                name="currentLearning"
                value={formData.currentLearning}
                onChange={handleInputChange}
                rows="4"
                placeholder="Share what your child is currently studying in school, subjects they're working on, or skills they're developing..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Custom Prompt Field */}
          <div className="space-y-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <FaEdit className="text-purple-600" />
                <span>Custom Prompt (Optional)</span>
              </div>
            </label>
            <div className="bg-purple-50 p-4 rounded-lg mb-2">
              <div className="flex items-start gap-2 mb-3">
                <FaEdit className="text-purple-600 text-xl mt-1" />
                <div>
                  <h4 className="font-semibold text-purple-900 mb-1">Advanced Customization</h4>
                  <p className="text-sm text-purple-800">
                    Add specific instructions or personality traits for the AI assistant. This will override default behavior.
                  </p>
                </div>
              </div>
              <div className="bg-purple-100 rounded-lg p-3 ml-7">
                <p className="text-sm text-purple-800 font-medium mb-1">✍ Example:</p>
                <p className="text-sm text-purple-700">
                  Always speak in a gentle, encouraging tone. Focus on building confidence and ask open-ended questions to spark creativity.
                </p>
              </div>
            </div>
            <textarea
              id="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter custom instructions for the AI assistant (optional)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 cursor-pointer"
          >
            Continue to Setup
          </button>
        </form>
      </section>
    </div>
  );
}