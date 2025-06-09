import React, { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  onBookNowClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBookNowClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-sky-600">
              Seaside Suites
            </div>
          </div>

          {/* Contact Info - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-sky-600" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-sky-600" />
              <span>123 Ocean View Drive</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-sky-600 transition-colors">Home</a>
            <a href="#apartments" className="text-gray-700 hover:text-sky-600 transition-colors">Apartments</a>
            <a href="#amenities" className="text-gray-700 hover:text-sky-600 transition-colors">Amenities</a>
            <a href="#reviews" className="text-gray-700 hover:text-sky-600 transition-colors">Reviews</a>
            <a href="#contact" className="text-gray-700 hover:text-sky-600 transition-colors">Contact</a>
            <button 
              onClick={onBookNowClick}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
            >
              Book Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-sky-600 transition-colors">Home</a>
              <a href="#apartments" className="text-gray-700 hover:text-sky-600 transition-colors">Apartments</a>
              <a href="#amenities" className="text-gray-700 hover:text-sky-600 transition-colors">Amenities</a>
              <a href="#reviews" className="text-gray-700 hover:text-sky-600 transition-colors">Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-sky-600 transition-colors">Contact</a>
              <button 
                onClick={onBookNowClick}
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors self-start"
              >
                Book Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;