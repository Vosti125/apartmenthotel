import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';

const Booking = () => {
  const [bookingStep, setBookingStep] = useState('booking'); // 'booking' or 'checkin'
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2',
    apartmentType: 'studio',
    name: '',
    email: '',
    phone: '',
    confirmationCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    alert('Booking request submitted! We will contact you shortly to confirm your reservation.');
  };

  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle check-in submission
    alert('Check-in completed! Welcome to Seaside Suites. Your digital key has been sent to your phone.');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Stay
          </h2>
          <p className="text-xl text-gray-600">
            Choose your dates and let us take care of the rest
          </p>
        </div>

        {/* Booking Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-md">
            <button
              onClick={() => setBookingStep('booking')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                bookingStep === 'booking'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-sky-600'
              }`}
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              New Booking
            </button>
            <button
              onClick={() => setBookingStep('checkin')}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                bookingStep === 'checkin'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-sky-600'
              }`}
            >
              <CheckCircle className="w-5 h-5 inline mr-2" />
              Online Check-in
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {bookingStep === 'booking' ? (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apartment Type
                  </label>
                  <select
                    name="apartmentType"
                    value={formData.apartmentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  >
                    <option value="studio">Ocean View Studio - $120/night</option>
                    <option value="suite">Garden Suite - $150/night</option>
                    <option value="family">Family Apartment - $200/night</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors transform hover:scale-105 shadow-lg"
              >
                Submit Booking Request
              </button>
            </form>
          ) : (
            <form onSubmit={handleCheckInSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <Clock className="w-16 h-16 text-sky-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Online Check-in</h3>
                <p className="text-gray-600">
                  Skip the front desk and check in directly from your phone
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmation Code
                </label>
                <input
                  type="text"
                  name="confirmationCode"
                  value={formData.confirmationCode}
                  onChange={handleInputChange}
                  placeholder="Enter your booking confirmation code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center text-lg font-mono"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition-colors transform hover:scale-105 shadow-lg"
              >
                Complete Check-in
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;