import React from 'react';
import { Bed, Bath, Users, Wifi, Car, Shield } from 'lucide-react';

const apartments = [
  {
    id: 1,
    name: "Ocean View Studio",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$120",
    beds: 1,
    baths: 1,
    guests: 2,
    description: "Elegant studio with stunning ocean views, perfect for couples seeking a romantic getaway.",
    features: ["Ocean View", "Kitchenette", "Private Balcony", "Work Desk"],
    type: "studio"
  },
  {
    id: 2,
    name: "Garden Suite",
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$150",
    beds: 1,
    baths: 1,
    guests: 3,
    description: "Spacious suite overlooking our beautiful gardens with premium amenities and comfort.",
    features: ["Garden View", "Full Kitchen", "Living Area", "Premium Bedding"],
    type: "suite"
  },
  {
    id: 3,
    name: "Family Apartment",
    image: "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: "$200",
    beds: 2,
    baths: 2,
    guests: 4,
    description: "Perfect for families, featuring two bedrooms and a spacious living area with all modern conveniences.",
    features: ["Two Bedrooms", "Full Kitchen", "Living Room", "Washer/Dryer"],
    type: "family"
  }
];

interface ApartmentsProps {
  onBookNowClick: (apartmentType: string) => void;
}

const Apartments: React.FC<ApartmentsProps> = ({ onBookNowClick }) => {
  return (
    <section id="apartments\" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Apartment Suites
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our collection of thoughtfully designed apartments, each offering 
            a unique blend of comfort, style, and modern amenities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apartments.map((apartment) => (
            <div key={apartment.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={apartment.image} 
                  alt={apartment.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-sky-600 font-bold text-lg">{apartment.price}/night</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{apartment.name}</h3>
                
                {/* Apartment Stats */}
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span>{apartment.beds} bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span>{apartment.baths} bath</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{apartment.guests} guests</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {apartment.description}
                </p>
                
                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {apartment.features.map((feature, index) => (
                      <span key={index} className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Amenities Icons */}
                <div className="flex items-center gap-4 mb-6 text-gray-400">
                  <Wifi className="w-5 h-5" title="Free WiFi" />
                  <Car className="w-5 h-5" title="Parking" />
                  <Shield className="w-5 h-5" title="24/7 Security" />
                </div>
                
                <button 
                  onClick={() => onBookNowClick(apartment.type)}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Apartments;