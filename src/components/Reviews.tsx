import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Los Angeles, CA",
    rating: 5,
    date: "March 2024",
    review: "Absolutely stunning property! The apartment was immaculate, the pool area was like a private resort, and the staff went above and beyond. We'll definitely be back!",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    date: "February 2024",
    review: "Perfect for our family vacation. The two-bedroom apartment had everything we needed, and the kids loved the pool. The location is peaceful yet convenient to everything.",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Austin, TX",
    rating: 5,
    date: "January 2024",
    review: "The garden suite exceeded all expectations. Beautiful views, top-notch amenities, and the most comfortable bed I've ever slept in. Highly recommend!",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Denver, CO",
    rating: 5,
    date: "December 2023",
    review: "Business trip turned into a mini-vacation thanks to this amazing place. The WiFi was excellent for work, and the pool was perfect for unwinding after long days.",
    avatar: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Lisa Wang",
    location: "Seattle, WA",
    rating: 5,
    date: "November 2023",
    review: "Celebrating our anniversary here was magical. The ocean view studio was romantic, the gardens were perfect for evening walks, and the service was impeccable.",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Robert Martinez",
    location: "Phoenix, AZ",
    rating: 5,
    date: "October 2023",
    review: "Everything was perfect from check-in to check-out. The apartment was spotless, amenities were top-tier, and the peaceful atmosphere made our stay unforgettable.",
    avatar: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face"
  }
];

interface ReviewsProps {
  onBookNowClick: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onBookNowClick }) => {
  return (
    <section id="reviews\" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our valued guests have to say about their 
            experiences at Seaside Suites.
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-3xl font-bold text-gray-900 mr-2">4.9</span>
            <span className="text-gray-600">out of 5 stars</span>
          </div>
          <p className="text-gray-500 mt-2">Based on 500+ verified reviews</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-2xl p-6 relative hover:shadow-lg transition-shadow">
              <Quote className="w-8 h-8 text-sky-200 mb-4" />
              
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{review.review}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to create your own amazing experience?
          </p>
          <button 
            onClick={onBookNowClick}
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors transform hover:scale-105 shadow-lg"
          >
            Book Your Stay Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;