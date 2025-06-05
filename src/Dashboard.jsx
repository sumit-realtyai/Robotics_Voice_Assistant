import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdChildCare, MdSchool } from "react-icons/md";

export default function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "male",
    additionalInstructions: ""
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      ...formData,
      isFormSubmitted: true
    }).toString();
    navigate(`/vapi?${queryParams}`);
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
      <section className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <MdChildCare className="text-3xl text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900">Kid's Details</h2>
        </div>
        
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

          <div className="space-y-2">
            <label htmlFor="additionalInstructions" className="block text-sm font-medium text-gray-700">
              Parent's Instructions
            </label>
            <div className="bg-blue-50 p-3 rounded-lg mb-2">
              <div className="flex items-start gap-2 mb-2">
                <MdSchool className="text-blue-600 text-xl mt-1" />
                <p className="text-sm text-blue-800">
                  Share details about your child's education, interests, or any specific learning goals. This helps us personalize the AI interaction.
                </p>
              </div>
              <ul className="text-xs text-blue-700 ml-7 list-disc">
                <li>Current grade or learning level</li>
                <li>Favorite subjects or topics</li>
                <li>Learning style preferences</li>
                <li>Special interests or hobbies</li>
                <li>Any specific topics to focus on or avoid</li>
              </ul>
            </div>
            <textarea
              id="additionalInstructions"
              name="additionalInstructions"
              value={formData.additionalInstructions}
              onChange={handleInputChange}
              rows="4"
              placeholder="Example: Sarah is in 3rd grade, loves science experiments and space. She learns best through interactive stories..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 cursor-pointer mt-6"
          >
            Start with VAPI Assistant
          </button>
        </form>
      </section>
    </div>
  );
}