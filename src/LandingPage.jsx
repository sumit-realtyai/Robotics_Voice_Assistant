import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophoneAlt, FaPlay, FaShoppingCart, FaChild, FaGraduationCap, FaLanguage, FaMobile, FaHeart, FaBrain, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdScreenLockPortrait, MdVoiceChat, MdFamilyRestroom } from 'react-icons/md';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselVideos = [
    {
      url: "https://kids-storybooks.s3.ap-south-1.amazonaws.com/original_images/talkypie_3.mp4",
      title: "Learning Through Play",
      description: "Watch children explore educational concepts through interactive storytelling with their Talkypie."
    },
    {
      url: "https://kids-storybooks.s3.ap-south-1.amazonaws.com/original_images/talkypie_4.mp4",
      title: "Building Confidence",
      description: "Discover how Talkypies helps children find their voice and express themselves confidently."
    },
    {
      url: "https://kids-storybooks.s3.ap-south-1.amazonaws.com/original_images/talkypie_5.mp4",
      title: "Interactive Learning",
      description: "Experience how Talkypies creates engaging conversations that make learning fun and memorable."
    }
  ];

  const handleStartTalkypie = () => {
    navigate('/start');
  };

  const handleBuyTalkypie = () => {
    navigate('/payment');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselVideos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselVideos.length) % carouselVideos.length);
  };

  const getVisibleVideos = () => {
    const videos = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentSlide + i) % carouselVideos.length;
      videos.push(carouselVideos[index]);
    }
    return videos;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 mb-20 md:mb-0">
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
              A soft toy powered by Alexa-like AI—only it talks like a playful, friendly teddy, not a robot.
            </p>
            
            {/* Hero Video Section - Reduced dimensions for bigger screens */}
            <div className="max-w-2xl lg:max-w-3xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <video
                  className="w-full h-auto max-h-[350px] lg:max-h-[400px] object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  src="https://kids-storybooks.s3.ap-south-1.amazonaws.com/original_images/talkypie_2.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Video Carousel Section */}
            <div className="max-w-6xl mx-auto mb-8">
              <div className="relative">
                <div className="flex items-center justify-center gap-4 overflow-hidden">
                  {getVisibleVideos().map((video, index) => (
                    <div key={`${currentSlide}-${index}`} className="flex-shrink-0 w-full md:w-1/2 px-2">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                        <div className="aspect-video">
                          <video
                            className="w-full h-full object-cover"
                            controls
                            src={video.url}
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h4>
                          <p className="text-gray-600 text-sm">{video.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <FaChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <FaChevronRight className="text-xl" />
                </button>

                {/* Carousel Indicators */}
                <div className="flex justify-center mt-6 gap-2">
                  {carouselVideos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-indigo-600 scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
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
                Parent Talkypie app
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section - Keep the original section as well */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-video">
                <video
                  className="w-full h-full object-cover"
                  controls
                  src="https://kids-storybooks.s3.ap-south-1.amazonaws.com/original_images/talkypie_3.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Learning Through Play</h4>
                <p className="text-gray-600">
                  Watch children explore educational concepts through interactive storytelling with their Talkypie.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-video">
                <video
                  className="w-full h-full object-cover"
                  controls
                  src="https://kids-storybooks.s3.ap-south-1.amazonaws.com/original_images/talkypie_4.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Building Confidence</h4>
                <p className="text-gray-600">
                  Discover how Talkypies helps children find their voice and express themselves confidently.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-video">
                <video
                  className="w-full h-full object-cover"
                  controls
                  src="https://kids-storybooks.s3.ap-south-1.amazonaws.com/original_images/talkypie_5.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Interactive Learning</h4>
                <p className="text-gray-600">
                  Experience how Talkypies creates engaging conversations that make learning fun and memorable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
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
              Parent Talkypie app
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;