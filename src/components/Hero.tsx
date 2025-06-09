import React from 'react';
import { Calendar, Users, Star } from 'lucide-react';

interface HeroProps {
  onBookNowClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNowClick }) => {
  return (
    <section id="home\" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Your Home Away
          <span className="block text-sky-300">From Home</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Experience luxury and comfort in our beautifully appointed apartment suites, 
          complete with pool, gardens, and world-class amenities.
        </p>
        
        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm md:text-base">
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-sky-300" />
            <span>20 Luxury Suites</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-400" />
            <span>Available Year Round</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onBookNowClick}
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Book Your Stay
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all">
            Virtual Tour
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;