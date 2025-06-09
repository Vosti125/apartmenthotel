import React, { useState, useRef } from 'react';
import { X, Calendar, Users, CreditCard, CheckCircle, ArrowLeft, ArrowRight, MapPin, Wifi, Car, Shield, Star, Baby, Plus, Minus, Award, UserPlus, LogIn } from 'lucide-react';

interface BookingEngineProps {
  isOpen: boolean;
  onClose: () => void;
  selectedApartment?: string;
}

interface RoomType {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  beds: number;
  baths: number;
  maxAdults: number;
  maxChildren: number;
  features: string[];
  available: number;
  description: string;
}

interface SelectedRoom {
  room: RoomType;
  quantity: number;
}

interface LoyaltyMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberSince: string;
  totalStays: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  selectedRooms: SelectedRoom[];
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests: string;
    earlyCheckIn: boolean;
    lateCheckOut: boolean;
    airportTransfer: boolean;
  };
  loyaltyProgram: {
    isLoggedIn: boolean;
    member?: LoyaltyMember;
    loginEmail: string;
    joinProgram: boolean;
  };
  couponCode: string;
  discount: number;
}

const BookingEngine: React.FC<BookingEngineProps> = ({ isOpen, onClose, selectedApartment }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<RoomType[]>([]);
  const [loyaltyStep, setLoyaltyStep] = useState<'choice' | 'login' | 'join'>('choice');
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    selectedRooms: [],
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
      earlyCheckIn: false,
      lateCheckOut: false,
      airportTransfer: false,
    },
    loyaltyProgram: {
      isLoggedIn: false,
      loginEmail: '',
      joinProgram: false,
    },
    couponCode: '',
    discount: 0,
  });

  // Mock loyalty members database
  const mockLoyaltyMembers: LoyaltyMember[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      memberSince: '2022-01-15',
      totalStays: 12,
      tier: 'Gold'
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      memberSince: '2023-03-20',
      totalStays: 5,
      tier: 'Silver'
    }
  ];

  const mockRooms: RoomType[] = [
    {
      id: 'studio',
      name: 'Ocean View Studio',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 120,
      beds: 1,
      baths: 1,
      maxAdults: 2,
      maxChildren: 1,
      features: ['Ocean View', 'Kitchenette', 'Private Balcony', 'Work Desk'],
      available: 3,
      description: 'Elegant studio with stunning ocean views, perfect for couples.'
    },
    {
      id: 'suite',
      name: 'Garden Suite',
      image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 150,
      originalPrice: 180,
      beds: 1,
      baths: 1,
      maxAdults: 3,
      maxChildren: 2,
      features: ['Garden View', 'Full Kitchen', 'Living Area', 'Premium Bedding'],
      available: 2,
      description: 'Spacious suite overlooking beautiful gardens with premium amenities.'
    },
    {
      id: 'family',
      name: 'Family Apartment',
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 200,
      beds: 2,
      baths: 2,
      maxAdults: 4,
      maxChildren: 3,
      features: ['Two Bedrooms', 'Full Kitchen', 'Living Room', 'Washer/Dryer'],
      available: 1,
      description: 'Perfect for families with two bedrooms and spacious living area.'
    }
  ];

  const checkAvailability = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter rooms based on guest count and simulate availability
    const totalGuests = bookingData.adults + bookingData.children;
    const filtered = mockRooms.filter(room => 
      room.maxAdults >= bookingData.adults && 
      (room.maxAdults + room.maxChildren) >= totalGuests
    );
    setAvailableRooms(filtered);
    setIsLoading(false);
    setCurrentStep(2);
  };

  const updateRoomQuantity = (roomId: string, quantity: number) => {
    setBookingData(prev => {
      const room = availableRooms.find(r => r.id === roomId);
      if (!room) return prev;

      const existingRoomIndex = prev.selectedRooms.findIndex(sr => sr.room.id === roomId);
      
      if (quantity === 0) {
        // Remove room if quantity is 0
        return {
          ...prev,
          selectedRooms: prev.selectedRooms.filter(sr => sr.room.id !== roomId)
        };
      }

      if (existingRoomIndex >= 0) {
        // Update existing room quantity
        const updatedRooms = [...prev.selectedRooms];
        updatedRooms[existingRoomIndex] = { ...updatedRooms[existingRoomIndex], quantity };
        return {
          ...prev,
          selectedRooms: updatedRooms
        };
      } else {
        // Add new room
        return {
          ...prev,
          selectedRooms: [...prev.selectedRooms, { room, quantity }]
        };
      }
    });
  };

  const getRoomQuantity = (roomId: string): number => {
    const selectedRoom = bookingData.selectedRooms.find(sr => sr.room.id === roomId);
    return selectedRoom ? selectedRoom.quantity : 0;
  };

  const getTotalRooms = (): number => {
    return bookingData.selectedRooms.reduce((total, sr) => total + sr.quantity, 0);
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateRoomTotal = () => {
    const nights = calculateNights();
    return bookingData.selectedRooms.reduce((total, selectedRoom) => {
      return total + (selectedRoom.room.price * selectedRoom.quantity * nights);
    }, 0);
  };

  const calculateTotal = () => {
    let total = calculateRoomTotal();
    
    // Add optional services (applied once per booking, not per room)
    if (bookingData.guestInfo.earlyCheckIn) total += 25;
    if (bookingData.guestInfo.lateCheckOut) total += 25;
    if (bookingData.guestInfo.airportTransfer) total += 45;
    
    // Apply loyalty discount (5% for members)
    if (bookingData.loyaltyProgram.isLoggedIn || bookingData.loyaltyProgram.joinProgram) {
      const loyaltyDiscount = total * 0.05;
      total -= loyaltyDiscount;
    }
    
    // Apply coupon discount
    const discountAmount = (total * bookingData.discount) / 100;
    return total - discountAmount;
  };

  const applyCoupon = () => {
    const coupon = bookingData.couponCode.toLowerCase();
    if (coupon === 'welcome10') {
      setBookingData(prev => ({ ...prev, discount: 10 }));
    } else if (coupon === 'stay20') {
      setBookingData(prev => ({ ...prev, discount: 20 }));
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleLoyaltyLogin = () => {
    const member = mockLoyaltyMembers.find(m => m.email.toLowerCase() === bookingData.loyaltyProgram.loginEmail.toLowerCase());
    if (member) {
      setBookingData(prev => ({
        ...prev,
        loyaltyProgram: {
          ...prev.loyaltyProgram,
          isLoggedIn: true,
          member: member
        },
        guestInfo: {
          ...prev.guestInfo,
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          phone: member.phone
        }
      }));
      setLoyaltyStep('choice');
    } else {
      alert('Member not found. Please check your email address or join our loyalty program.');
    }
  };

  const handleJoinLoyalty = () => {
    setBookingData(prev => ({
      ...prev,
      loyaltyProgram: {
        ...prev.loyaltyProgram,
        joinProgram: true
      }
    }));
    setLoyaltyStep('choice');
  };

  const processPayment = async () => {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setCurrentStep(5);
  };

  const resetBooking = () => {
    setCurrentStep(1);
    setLoyaltyStep('choice');
    setBookingData({
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      selectedRooms: [],
      guestInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: '',
        earlyCheckIn: false,
        lateCheckOut: false,
        airportTransfer: false,
      },
      loyaltyProgram: {
        isLoggedIn: false,
        loginEmail: '',
        joinProgram: false,
      },
      couponCode: '',
      discount: 0,
    });
    setAvailableRooms([]);
    onClose();
  };

  const handleDateClick = (type: 'checkIn' | 'checkOut') => {
    if (type === 'checkIn' && checkInRef.current) {
      checkInRef.current.focus();
      checkInRef.current.showPicker();
    } else if (type === 'checkOut' && checkOutRef.current) {
      checkOutRef.current.focus();
      checkOutRef.current.showPicker();
    }
  };

  const incrementGuests = (type: 'adults' | 'children') => {
    setBookingData(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const decrementGuests = (type: 'adults' | 'children') => {
    setBookingData(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
    }));
  };

  if (!isOpen) return null;

  const stepTitles = [
    'Select Dates',
    'Choose Rooms',
    'Guest Information',
    'Payment',
    'Confirmation'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Book Your Stay</h2>
            <p className="text-gray-600">Step {currentStep} of 5: {stepTitles[currentStep - 1]}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep
                      ? 'bg-sky-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-2 mx-2 rounded ${
                      step < currentStep ? 'bg-sky-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Date Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Calendar className="w-16 h-16 text-sky-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">When would you like to stay?</h3>
                <p className="text-gray-600">Select your check-in and check-out dates</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => handleDateClick('checkIn')}
                  >
                    <input
                      ref={checkInRef}
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent cursor-pointer"
                      style={{ colorScheme: bookingData.checkIn ? 'auto' : 'light' }}
                      required
                    />
                    {!bookingData.checkIn && (
                      <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                        <span className="text-gray-400">dd/mm/yyyy</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => handleDateClick('checkOut')}
                  >
                    <input
                      ref={checkOutRef}
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                      min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent cursor-pointer"
                      style={{ colorScheme: bookingData.checkOut ? 'auto' : 'light' }}
                      required
                    />
                    {!bookingData.checkOut && (
                      <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
                        <span className="text-gray-400">dd/mm/yyyy</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Guest Selection */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Guests</h4>
                
                {/* Adults */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-sky-600 mr-3" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Adults</h5>
                      <p className="text-sm text-gray-600">Ages 13 or above</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => decrementGuests('adults')}
                      disabled={bookingData.adults <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{bookingData.adults}</span>
                    <button
                      type="button"
                      onClick={() => incrementGuests('adults')}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Baby className="w-5 h-5 text-sky-600 mr-3" />
                    <div>
                      <h5 className="font-semibold text-gray-900">Children</h5>
                      <p className="text-sm text-gray-600">Ages 2-12</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => decrementGuests('children')}
                      disabled={bookingData.children <= 0}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{bookingData.children}</span>
                    <button
                      type="button"
                      onClick={() => incrementGuests('children')}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={checkAvailability}
                disabled={!bookingData.checkIn || !bookingData.checkOut || isLoading}
                className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Check Availability'
                )}
              </button>
            </div>
          )}

          {/* Step 2: Room Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Rooms</h3>
                <p className="text-gray-600">
                  {calculateNights()} nights • {bookingData.adults} adult{bookingData.adults > 1 ? 's' : ''}
                  {bookingData.children > 0 && ` • ${bookingData.children} child${bookingData.children > 1 ? 'ren' : ''}`}
                </p>
                {getTotalRooms() > 0 && (
                  <p className="text-sky-600 font-semibold mt-2">
                    {getTotalRooms()} room{getTotalRooms() > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {availableRooms.map((room) => {
                  const quantity = getRoomQuantity(room.id);
                  return (
                    <div
                      key={room.id}
                      className={`border-2 rounded-xl p-6 transition-all ${
                        quantity > 0
                          ? 'border-sky-600 bg-sky-50'
                          : 'border-gray-200 hover:border-sky-300'
                      }`}
                    >
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900">{room.name}</h4>
                              <p className="text-gray-600 mb-2">{room.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  Up to {room.maxAdults} adults
                                </span>
                                {room.maxChildren > 0 && (
                                  <span className="flex items-center">
                                    <Baby className="w-4 h-4 mr-1" />
                                    Up to {room.maxChildren} children
                                  </span>
                                )}
                                <span>{room.beds} bed • {room.baths} bath</span>
                              </div>
                            </div>
                            <div className="text-right">
                              {room.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">${room.originalPrice}/night</p>
                              )}
                              <p className="text-2xl font-bold text-sky-600">${room.price}/night</p>
                              {quantity > 0 && (
                                <p className="text-sm text-gray-600">
                                  Total: ${room.price * calculateNights() * quantity}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.features.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-green-600 font-semibold">
                              {room.available} room{room.available > 1 ? 's' : ''} available
                            </p>
                            
                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-3">
                              <button
                                type="button"
                                onClick={() => updateRoomQuantity(room.id, Math.max(0, quantity - 1))}
                                disabled={quantity <= 0}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateRoomQuantity(room.id, Math.min(room.available, quantity + 1))}
                                disabled={quantity >= room.available}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Rooms Summary */}
              {bookingData.selectedRooms.length > 0 && (
                <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Selected Rooms Summary</h4>
                  <div className="space-y-2">
                    {bookingData.selectedRooms.map((selectedRoom, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">
                          {selectedRoom.quantity}x {selectedRoom.room.name}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ${selectedRoom.room.price * selectedRoom.quantity * calculateNights()}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between items-center text-lg font-bold">
                      <span>Total ({calculateNights()} nights)</span>
                      <span>${calculateRoomTotal()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={bookingData.selectedRooms.length === 0}
                  className="flex-1 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Guest Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Users className="w-16 h-16 text-sky-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Guest Information</h3>
                <p className="text-gray-600">Please provide your details for the reservation</p>
              </div>

              {/* Loyalty Program Section */}
              {loyaltyStep === 'choice' && (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200 mb-6">
                  <div className="flex items-center mb-4">
                    <Award className="w-8 h-8 text-amber-600 mr-3" />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">Seaside Rewards Program</h4>
                      <p className="text-gray-600">Join or login to get 5% off your stay!</p>
                    </div>
                  </div>

                  {bookingData.loyaltyProgram.isLoggedIn ? (
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Welcome back, {bookingData.loyaltyProgram.member?.firstName}!
                          </p>
                          <p className="text-sm text-gray-600">
                            {bookingData.loyaltyProgram.member?.tier} Member • {bookingData.loyaltyProgram.member?.totalStays} stays
                          </p>
                          <p className="text-sm text-green-600 font-semibold mt-1">
                            5% loyalty discount applied!
                          </p>
                        </div>
                        <button
                          onClick={() => setBookingData(prev => ({
                            ...prev,
                            loyaltyProgram: { ...prev.loyaltyProgram, isLoggedIn: false, member: undefined },
                            guestInfo: { ...prev.guestInfo, firstName: '', lastName: '', email: '', phone: '' }
                          }))}
                          className="text-gray-500 hover:text-gray-700 text-sm underline"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : bookingData.loyaltyProgram.joinProgram ? (
                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Great! You'll be enrolled in our loyalty program
                          </p>
                          <p className="text-sm text-gray-600">
                            Complete your booking to become a Bronze member
                          </p>
                          <p className="text-sm text-green-600 font-semibold mt-1">
                            5% new member discount applied!
                          </p>
                        </div>
                        <button
                          onClick={() => setBookingData(prev => ({
                            ...prev,
                            loyaltyProgram: { ...prev.loyaltyProgram, joinProgram: false }
                          }))}
                          className="text-gray-500 hover:text-gray-700 text-sm underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setLoyaltyStep('login')}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                      >
                        <LogIn className="w-5 h-5 mr-2" />
                        Login to Account
                      </button>
                      <button
                        onClick={() => setLoyaltyStep('join')}
                        className="flex-1 border border-amber-600 text-amber-700 hover:bg-amber-50 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                      >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Join Program
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Login Form */}
              {loyaltyStep === 'login' && (
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Login to Your Account</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={bookingData.loyaltyProgram.loginEmail}
                        onChange={(e) => setBookingData(prev => ({
                          ...prev,
                          loyaltyProgram: { ...prev.loyaltyProgram, loginEmail: e.target.value }
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Try: john.smith@email.com or sarah.johnson@email.com
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleLoyaltyLogin}
                        disabled={!bookingData.loyaltyProgram.loginEmail}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setLoyaltyStep('choice')}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Join Program Form */}
              {loyaltyStep === 'join' && (
                <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Join Seaside Rewards</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Member Benefits:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 5% discount on all stays</li>
                        <li>• Early check-in when available</li>
                        <li>• Priority room upgrades</li>
                        <li>• Exclusive member-only offers</li>
                        <li>• Birthday and anniversary perks</li>
                      </ul>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleJoinLoyalty}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors"
                      >
                        Join Program (Free)
                      </button>
                      <button
                        onClick={() => setLoyaltyStep('choice')}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Skip for Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={bookingData.guestInfo.firstName}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      guestInfo: { ...prev.guestInfo, firstName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={bookingData.guestInfo.lastName}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      guestInfo: { ...prev.guestInfo, lastName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={bookingData.guestInfo.email}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      guestInfo: { ...prev.guestInfo, email: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={bookingData.guestInfo.phone}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      guestInfo: { ...prev.guestInfo, phone: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  value={bookingData.guestInfo.specialRequests}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    guestInfo: { ...prev.guestInfo, specialRequests: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                  placeholder="Any special requests or preferences..."
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Additional Services</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={bookingData.guestInfo.earlyCheckIn}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        guestInfo: { ...prev.guestInfo, earlyCheckIn: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="ml-2 text-gray-700">Early check-in (before 3:00 PM) - $25</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={bookingData.guestInfo.lateCheckOut}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        guestInfo: { ...prev.guestInfo, lateCheckOut: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="ml-2 text-gray-700">Late check-out (after 11:00 AM) - $25</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={bookingData.guestInfo.airportTransfer}
                      onChange={(e) => setBookingData(prev => ({
                        ...prev,
                        guestInfo: { ...prev.guestInfo, airportTransfer: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="ml-2 text-gray-700">Airport transfer service - $45</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  disabled={!bookingData.guestInfo.firstName || !bookingData.guestInfo.lastName || !bookingData.guestInfo.email || !bookingData.guestInfo.phone}
                  className="flex-1 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <CreditCard className="w-16 h-16 text-sky-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h3>
                <p className="text-gray-600">Review your booking and complete payment</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h4>
                  
                  <div className="space-y-4">
                    {/* Room Details */}
                    <div className="space-y-3">
                      {bookingData.selectedRooms.map((selectedRoom, index) => (
                        <div key={index} className="flex items-center space-x-4 pb-3 border-b border-gray-200 last:border-b-0">
                          <img
                            src={selectedRoom.room.image}
                            alt={selectedRoom.room.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{selectedRoom.room.name}</h5>
                            <p className="text-sm text-gray-600">
                              Quantity: {selectedRoom.quantity} • {calculateNights()} nights
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${selectedRoom.room.price * selectedRoom.quantity * calculateNights()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span className="font-semibold">
                          {bookingData.adults} adult{bookingData.adults > 1 ? 's' : ''}
                          {bookingData.children > 0 && `, ${bookingData.children} child${bookingData.children > 1 ? 'ren' : ''}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-semibold">{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-semibold">{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Rooms:</span>
                        <span className="font-semibold">{getTotalRooms()}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Room charges</span>
                        <span>${calculateRoomTotal()}</span>
                      </div>
                      {bookingData.guestInfo.earlyCheckIn && (
                        <div className="flex justify-between">
                          <span>Early check-in</span>
                          <span>$25</span>
                        </div>
                      )}
                      {bookingData.guestInfo.lateCheckOut && (
                        <div className="flex justify-between">
                          <span>Late check-out</span>
                          <span>$25</span>
                        </div>
                      )}
                      {bookingData.guestInfo.airportTransfer && (
                        <div className="flex justify-between">
                          <span>Airport transfer</span>
                          <span>$45</span>
                        </div>
                      )}
                      {(bookingData.loyaltyProgram.isLoggedIn || bookingData.loyaltyProgram.joinProgram) && (
                        <div className="flex justify-between text-green-600">
                          <span>Loyalty discount (5%)</span>
                          <span>-${(calculateRoomTotal() * 0.05).toFixed(2)}</span>
                        </div>
                      )}
                      {bookingData.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Coupon discount ({bookingData.discount}%)</span>
                          <span>-${((calculateRoomTotal()) * bookingData.discount / 100).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Form */}
                <div className="space-y-6">
                  {/* Coupon Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={bookingData.couponCode}
                        onChange={(e) => setBookingData(prev => ({ ...prev, couponCode: e.target.value }))}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Try: WELCOME10 or STAY20</p>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-yellow-800 text-sm">
                        <strong>Demo Mode:</strong> This is a placeholder for Stripe payment integration. 
                        In production, this would connect to your payment processor.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  onClick={processPayment}
                  disabled={isLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    `Pay $${calculateTotal().toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-xl text-gray-600 mb-4">Thank you for choosing Seaside Suites</p>
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 inline-block">
                  <p className="text-sky-800 font-semibold">Confirmation Number</p>
                  <p className="text-2xl font-bold text-sky-900">SS-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto">
                <h4 className="font-bold text-gray-900 mb-4">Booking Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Guest:</span>
                    <span className="font-semibold">{bookingData.guestInfo.firstName} {bookingData.guestInfo.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rooms:</span>
                    <span className="font-semibold">{getTotalRooms()} room{getTotalRooms() > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span className="font-semibold">{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span className="font-semibold">{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Paid:</span>
                    <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {(bookingData.loyaltyProgram.isLoggedIn || bookingData.loyaltyProgram.joinProgram) && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="w-6 h-6 text-amber-600 mr-2" />
                    <span className="font-semibold text-amber-800">
                      {bookingData.loyaltyProgram.isLoggedIn ? 'Loyalty Discount Applied!' : 'Welcome to Seaside Rewards!'}
                    </span>
                  </div>
                  <p className="text-sm text-amber-700 text-center">
                    {bookingData.loyaltyProgram.isLoggedIn 
                      ? `You saved $${(calculateRoomTotal() * 0.05).toFixed(2)} with your loyalty membership!`
                      : `You've been enrolled as a Bronze member and saved $${(calculateRoomTotal() * 0.05).toFixed(2)} on this booking!`
                    }
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-gray-600">
                  Confirmation details have been sent to <strong>{bookingData.guestInfo.email}</strong>
                </p>
                <p className="text-gray-600">
                  You'll also receive a WhatsApp message with check-in instructions.
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetBooking}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Book Another Stay
                </button>
                <button
                  onClick={onClose}
                  className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingEngine;