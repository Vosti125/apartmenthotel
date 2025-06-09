import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Wifi, Car, Shield, Waves } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-sky-400 mb-4">
              Seaside Suites
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience luxury and comfort in our beautifully appointed apartment hotel, 
              where every stay feels like a retreat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-sky-400 transition-colors">Home</a></li>
              <li><a href="#apartments" className="text-gray-300 hover:text-sky-400 transition-colors">Apartments</a></li>
              <li><a href="#amenities" className="text-gray-300 hover:text-sky-400 transition-colors">Amenities</a></li>
              <li><a href="#reviews" className="text-gray-300 hover:text-sky-400 transition-colors">Reviews</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-sky-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <Waves className="w-4 h-4 mr-2 text-sky-400" />
                <span>Swimming Pool</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Wifi className="w-4 h-4 mr-2 text-sky-400" />
                <span>Free WiFi</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Car className="w-4 h-4 mr-2 text-sky-400" />
                <span>Secure Parking</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Shield className="w-4 h-4 mr-2 text-sky-400" />
                <span>24/7 Security</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-sky-400 mt-1" />
                <div className="text-gray-300">
                  <p>123 Ocean View Drive</p>
                  <p>Paradise City, PC 12345</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-sky-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-sky-400" />
                <span className="text-gray-300">info@seasidesuites.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 mb-4 md:mb-0">
              <p>&copy; 2024 Seaside Suites. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-300">
              <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;