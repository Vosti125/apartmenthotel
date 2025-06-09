import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Apartments from './components/Apartments';
import Amenities from './components/Amenities';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import BookingEngine from './components/BookingEngine';

function App() {
  const [isBookingEngineOpen, setIsBookingEngineOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<string>('');

  const openBookingEngine = (apartmentType?: string) => {
    if (apartmentType) {
      setSelectedApartment(apartmentType);
    }
    setIsBookingEngineOpen(true);
  };

  const closeBookingEngine = () => {
    setIsBookingEngineOpen(false);
    setSelectedApartment('');
  };

  return (
    <div className="min-h-screen">
      <Header onBookNowClick={() => openBookingEngine()} />
      <Hero onBookNowClick={() => openBookingEngine()} />
      <Apartments onBookNowClick={openBookingEngine} />
      <Amenities />
      <Booking />
      <Reviews onBookNowClick={() => openBookingEngine()} />
      <Contact />
      <Footer />
      <ChatWidget />
      <BookingEngine 
        isOpen={isBookingEngineOpen} 
        onClose={closeBookingEngine}
        selectedApartment={selectedApartment}
      />
    </div>
  );
}

export default App;