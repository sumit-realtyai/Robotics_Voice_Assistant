import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMicrophoneAlt, FaPlay, FaShoppingCart, FaChild, FaGraduationCap, FaLanguage, FaMobile, FaHeart, FaBrain, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdScreenLockPortrait, MdVoiceChat, MdFamilyRestroom } from 'react-icons/md';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videosPerSlide, setVideosPerSlide] = useState(2);
  const [touchStartX, setTouchStartX] = useState(null);
const [touchEndX, setTouchEndX] = useState(null);


useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 1024) {
      setVideosPerSlide(1); // mobile & tablets
    } else {
      setVideosPerSlide(2); // desktops
    }
  };

  handleResize(); // initial call
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  const carouselVideos = [
    {
      url: "https://kids-storybooks.s3.ap-south-1.amazonaws.com/original_images/talkypie_2.mp4",
      title: "Meet Your Talkypie",
      description: "Discover the revolutionary AI companion that transforms how children learn and play."
    },
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
  setCurrentSlide((prev) => (prev + 1) % Math.ceil(carouselVideos.length / videosPerSlide));
};

const prevSlide = () => {
  setCurrentSlide((prev) =>
    (prev - 1 + Math.ceil(carouselVideos.length / videosPerSlide)) % Math.ceil(carouselVideos.length / videosPerSlide)
  );
};


  const getVisibleVideos = () => {
    const startIndex = currentSlide * 2;
    return carouselVideos.slice(startIndex, startIndex + 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 mb-20 md:mb-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 pt-0 px-0 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaMicrophoneAlt className="text-5xl text-indigo-600" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Talkypies
              </h1>
            </div>
            <p className="text-base md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
             A collection of AI-powered soft toys that talk in their own character voices—creating warm, playful conversations kids love.
            </p>
            
            {/* Enhanced Video Carousel Section */}
            <div className="w-full mb-12  sm:px-4 md:px-8">
              <div className="relative bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 rounded-3xl py-8 pt-0 sm:pt-8 sm:px-8 shadow-2xl"
                onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                    onTouchMove={(e) => setTouchEndX(e.touches[0].clientX)}
                    onTouchEnd={() => {
                      if (!touchStartX || !touchEndX) return;
                      const deltaX = touchStartX - touchEndX;
                    
                      if (deltaX > 30 && currentSlide < Math.ceil(carouselVideos.length / videosPerSlide) - 1) {
                        nextSlide(); // swipe left → next
                      } else if (deltaX < -30 && currentSlide > 0) {
                        prevSlide(); // swipe right → previous
                      }
                    
                      setTouchStartX(null);
                      setTouchEndX(null);
                    }}
              >
                <div className="overflow-hidden rounded-2xl">
                  <div 
                    className="flex transition-transform duration-700 "
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    
                    
                    
                  >
                    {Array.from({ length: Math.ceil(carouselVideos.length / videosPerSlide) }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className={`grid grid-cols-1 ${videosPerSlide === 2 ? 'md:grid-cols-2' : ''} gap-4 sm:gap-6 px-0 sm:px-4`}>
                      {carouselVideos.slice(slideIndex * videosPerSlide, slideIndex * videosPerSlide + videosPerSlide).map((video, videoIndex) => (
                        <div key={videoIndex} className="group">
                              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 ">
                                <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden">
                                  <video
                                    className="w-full h-full  object-cover transition-transform duration-500 "
                                    controls
                                    preload="metadata"
                                    src={video.url}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                </div>
                                {/* <div className="p-6">
                                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                                    {video.title}
                                  </h4>
                                  <p className="text-gray-600 leading-relaxed">
                                    {video.description}
                                  </p>
                                </div> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-base md:text-2xl text-gray-700 mt-8 max-w-3xl mx-auto leading-relaxed">
                   The lion sounds brave, the teddy sounds gentle—inviting children into a magical, fairy-tale-like experience.
                 </p>
                
                </div>

                {/* Enhanced Navigation Buttons - Desktop */}
                <button
                  onClick={prevSlide}
                  className=" sm:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-indigo-600 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-105 border border-indigo-100 backdrop-blur-sm"
                  disabled={currentSlide === 0}
                >
                  <FaChevronLeft className="text-base" />
                </button>

                <button
                  onClick={nextSlide}
                  className=" sm:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-indigo-600 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-105 border border-indigo-100 backdrop-blur-sm"
                  disabled={currentSlide === Math.ceil(carouselVideos.length / videosPerSlide) - 1}
                >
                  <FaChevronRight className="text-base" />
                </button>

                {/* Mobile Navigation Buttons - Positioned at screen edges */}
                <button
                  onClick={prevSlide}
                  className="sm:hidden fixed left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-indigo-600 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-indigo-200 backdrop-blur-sm z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  disabled={currentSlide === 0}
                  style={{ 
                    opacity: currentSlide === 0 ? 0.3 : 1,
                    pointerEvents: currentSlide === 0 ? 'none' : 'auto'
                  }}
                >
                  <FaChevronLeft className="text-lg" />
                </button>

                <button
                  onClick={nextSlide}
                  className="sm:hidden fixed right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-indigo-600 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-indigo-200 backdrop-blur-sm z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  disabled={currentSlide === Math.ceil(carouselVideos.length / videosPerSlide) - 1}
                  style={{ 
                    opacity: currentSlide === Math.ceil(carouselVideos.length / videosPerSlide) - 1 ? 0.3 : 1,
                    pointerEvents: currentSlide === Math.ceil(carouselVideos.length / videosPerSlide) - 1 ? 'none' : 'auto'
                  }}
                >
                  <FaChevronRight className="text-lg" />
                </button>

                {/* Enhanced Carousel Indicators */}
                <div className="flex justify-center mt-4 sm:mt-8 gap-3">
                 {Array.from({ length: Math.ceil(carouselVideos.length / videosPerSlide) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? 'w-8 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                          : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125'
                      }`}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-700 ease-in-out"
                    style={{ width: `${((currentSlide + 1) / Math.ceil(carouselVideos.length / videosPerSlide)) * 100}%` }}
                  ></div>
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