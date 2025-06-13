import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { MdChildCare, MdSchool } from "react-icons/md";
import { FaBookReader, FaTheaterMasks, FaBrain, FaHeart, FaKey, FaStar, FaGraduationCap, FaRobot, FaEdit } from "react-icons/fa";

export default function StartTalkypie() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    gender: "male",
    interests: "",
    currentLearning: "",
    prompt: "",
    porcupineKey: "",
    vapiKey: "",
    vapiPublicKey: ""
  });

  // Load VAPI keys from localStorage on component mount
  useEffect(() => {
    const storedVapiKey = localStorage.getItem('vapiKey');
    const storedVapiPublicKey = localStorage.getItem('vapiPublicKey');
    
    if (storedVapiKey && storedVapiPublicKey) {
      setFormData(prevFormData => ({
        ...prevFormData,
        vapiKey: storedVapiKey,
        vapiPublicKey: storedVapiPublicKey,
        
      }));
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Store VAPI keys in localStorage
    localStorage.setItem('vapiKey', formData.vapiKey);
    localStorage.setItem('vapiPublicKey', formData.vapiPublicKey);
    localStorage.setItem('porcupineKey', formData.porcupineKey);
    
    const queryParams = new URLSearchParams({
      ...formData,
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
                  <span>Porcupine Key</span>
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
            <div>
              <label htmlFor="vapiKey" className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-indigo-600" />
                  <span>VAPI Private Key</span>
                </div>
              </label>
              <input
                type="password"
                id="vapiKey"
                name="vapiKey"
                value={formData.vapiKey}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your VAPI private key"
              />
            </div>

            <div>
              <label htmlFor="vapiPublicKey" className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-green-600" />
                  <span>VAPI Public Key</span>
                </div>
              </label>
              <input
                type="text"
                id="vapiPublicKey"
                name="vapiPublicKey"
                value={formData.vapiPublicKey}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your VAPI public key"
              />
            </div>
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