import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophoneAlt, FaPlay, FaShoppingCart, FaChild, FaGraduationCap, FaLanguage, FaMobile, FaHeart, FaBrain } from 'react-icons/fa';
import { MdScreenLockPortrait, MdVoiceChat, MdFamilyRestroom } from 'react-icons/md';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartTalkypie = () => {
    navigate('/start');
  };

  const handleBuyTalkypie = () => {
    // This would typically redirect to a purchase page
    window.open('https://your-store-link.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaMicrophoneAlt className="text-5xl text-indigo-600" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Talkypies
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              The revolutionary AI-powered companion that transforms screen time into meaningful conversations, 
              helping children learn, grow, and develop through interactive voice experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBuyTalkypie}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <FaShoppingCart className="text-xl" />
                Buy a Talkypie
              </button>
              <button
                onClick={handleStartTalkypie}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full text-lg border-2 border-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <FaPlay className="text-xl" />
                Start Talkypie
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction & Description */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Your Child's New Best Friend
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Talkypies is an innovative AI companion designed specifically for children. Using advanced voice 
              recognition and natural language processing, it creates personalized, educational conversations 
              that adapt to your child's age, interests, and learning style. Say goodbye to passive screen time 
              and hello to active, engaging learning experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100">
              <MdVoiceChat className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Voice-First Experience</h3>
              <p className="text-gray-600">
                Natural conversations that feel like talking to a friend, encouraging verbal communication and confidence.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-100">
              <FaBrain className="text-5xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Adaptive Learning</h3>
              <p className="text-gray-600">
                AI that learns and grows with your child, providing age-appropriate content and challenges.
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100">
              <MdFamilyRestroom className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Family-Safe</h3>
              <p className="text-gray-600">
                Designed with child safety in mind, providing a secure and nurturing environment for learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Talkypies in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how children around the world are learning, laughing, and growing with their Talkypie companions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <FaPlay className="text-6xl mb-4 mx-auto opacity-80" />
                  <h3 className="text-xl font-bold">Educational Conversations</h3>
                  <p className="text-sm opacity-90 mt-2">See how Talkypies makes learning fun</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Learning Through Play</h4>
                <p className="text-gray-600">
                  Watch 7-year-old Emma explore science concepts through interactive storytelling with her Talkypie.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <FaPlay className="text-6xl mb-4 mx-auto opacity-80" />
                  <h3 className="text-xl font-bold">Language Development</h3>
                  <p className="text-sm opacity-90 mt-2">Improving vocabulary and communication</p>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Building Confidence</h4>
                <p className="text-gray-600">
                  Discover how Talkypies helps shy children find their voice and express themselves confidently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Talkypies?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your child's development with proven benefits that last a lifetime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reduce Screen Time */}
            <div className="bg-gradient-to-br from-red-50 to-orange-100 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-6 mx-auto">
                <MdScreenLockPortrait className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Reduce Screen Time</h3>
              <p className="text-gray-600 text-center mb-6">
                Replace passive screen consumption with active, engaging conversations that stimulate creativity and imagination.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  No visual distractions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Encourages physical activity
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Better sleep patterns
                </li>
              </ul>
            </div>

            {/* Language Improvement */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 mx-auto">
                <FaLanguage className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Improve Language Skills</h3>
              <p className="text-gray-600 text-center mb-6">
                Enhance vocabulary, pronunciation, and communication skills through natural, adaptive conversations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Expanded vocabulary
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Better pronunciation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Confident expression
                </li>
              </ul>
            </div>

            {/* Educational Concepts */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6 mx-auto">
                <FaGraduationCap className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Educational Growth</h3>
              <p className="text-gray-600 text-center mb-6">
                Make learning fun with interactive lessons in math, science, history, and more, tailored to your child's level.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Personalized curriculum
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Interactive storytelling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Critical thinking skills
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              More Than Just a Toy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talkypies is a comprehensive development tool that grows with your child.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaHeart className="text-4xl text-pink-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Emotional Intelligence</h3>
              <p className="text-sm text-gray-600">Develops empathy and emotional understanding</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaChild className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Social Skills</h3>
              <p className="text-sm text-gray-600">Improves conversation and interaction abilities</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaBrain className="text-4xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cognitive Development</h3>
              <p className="text-sm text-gray-600">Enhances memory, attention, and problem-solving</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <FaMobile className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tech Balance</h3>
              <p className="text-sm text-gray-600">Healthy relationship with technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Child's Learning?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have already discovered the magic of Talkypies. 
            Start your child's journey to better communication, learning, and growth today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBuyTalkypie}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <FaShoppingCart className="text-xl" />
              Buy a Talkypie
            </button>
            <button
              onClick={handleStartTalkypie}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-white font-bold rounded-full text-lg border-2 border-white hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-300"
            >
              <FaPlay className="text-xl" />
              Start Talkypie
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;