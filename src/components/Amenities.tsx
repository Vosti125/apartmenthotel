import React from 'react';
import { Waves, Wifi, Car, Shield, Utensils, Dumbbell, Leaf, Coffee } from 'lucide-react';

const amenities = [
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Relax in our heated outdoor pool with stunning views and comfortable lounging areas."
  },
  {
    icon: Car,
    title: "Secure Parking",
    description: "Complimentary covered parking spaces available for all guests with 24/7 security monitoring."
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet throughout the property."
  },
  {
    icon: Shield,
    title: "24/7 Security",
    description: "Round-the-clock security personnel and surveillance systems ensure your safety and peace of mind."
  },
  {
    icon: Leaf,
    title: "Beautiful Gardens",
    description: "Stroll through our meticulously maintained gardens and enjoy the peaceful natural surroundings."
  },
  {
    icon: Utensils,
    title: "Full Kitchens",
    description: "Each suite features a fully equipped kitchen with modern appliances and dining essentials."
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "Stay active in our well-equipped fitness center, open 24 hours for your convenience."
  },
  {
    icon: Coffee,
    title: "Coffee Lounge",
    description: "Start your day right in our cozy coffee lounge with premium beverages and light snacks."
  }
];

const Amenities = () => {
  return (
    <section id="amenities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            World-Class Amenities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience exceptional comfort and convenience with our comprehensive range of amenities, 
            designed to make your stay unforgettable.
          </p>
        </div>

        {/* Featured Amenity - Pool */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="order-2 lg:order-1 p-8 lg:p-12 flex items-center bg-sky-50">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-600 text-white rounded-full mb-6">
                  <Waves className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Resort-Style Swimming Pool
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Dive into relaxation at our stunning outdoor swimming pool, surrounded by lush gardens 
                  and comfortable lounging areas. Perfect for morning laps or evening relaxation under the stars.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                    Heated year-round
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                    Pool-side service available
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-sky-600 rounded-full mr-3"></div>
                    Premium lounging furniture
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Swimming Pool"
                className="w-full h-full object-cover min-h-[400px]"
              />
            </div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => {
            const Icon = amenity.icon;
            return (
              <div key={index} className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 text-sky-600 rounded-full mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {amenity.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Amenities;