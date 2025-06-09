import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, MessageSquare } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to Seaside Suites. I'm here to help you with any questions about our luxury apartment hotel. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('book') || input.includes('reservation')) {
      return "I'd be happy to help you with booking! For personalized assistance and to complete your reservation, I recommend connecting with our booking specialists on WhatsApp. They can help you find the perfect apartment and handle all the details. Would you like me to connect you to WhatsApp now?";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('rate')) {
      return "Our rates start at $120/night for Ocean View Studios, $150/night for Garden Suites, and $200/night for Family Apartments. All rates include complimentary WiFi, parking, and access to all amenities. For current availability and special offers, our team on WhatsApp can provide real-time pricing. Shall I connect you?";
    }
    
    if (input.includes('amenities') || input.includes('facilities') || input.includes('pool')) {
      return "We offer fantastic amenities including a heated swimming pool, beautiful gardens, fitness center, secure parking, high-speed WiFi, and 24/7 security. Each apartment features a fully equipped kitchen. For a virtual tour or specific questions about our facilities, our WhatsApp team can share photos and videos. Would you like to continue on WhatsApp?";
    }
    
    if (input.includes('location') || input.includes('address') || input.includes('where')) {
      return "We're located at 123 Ocean View Drive, just 2 minutes from the beach in a peaceful, scenic environment. Our WhatsApp team can send you detailed directions, local attraction recommendations, and transportation options. Ready to chat with them?";
    }
    
    if (input.includes('check') || input.includes('arrival') || input.includes('time')) {
      return "Check-in is at 3:00 PM and check-out is at 11:00 AM. We offer convenient online check-in and our front desk is available 24/7. For specific arrival arrangements or early check-in requests, our WhatsApp team can coordinate everything for you. Shall I connect you?";
    }
    
    if (input.includes('whatsapp') || input.includes('contact') || input.includes('phone') || input.includes('yes') || input.includes('connect')) {
      return "Perfect! I'm connecting you to our WhatsApp team now. They'll be able to provide personalized assistance, real-time availability, special offers, and handle your booking. Click the WhatsApp button below to continue your conversation with our specialists!";
    }
    
    if (input.includes('available') || input.includes('vacancy') || input.includes('free')) {
      return "For real-time availability and to secure your preferred dates, our WhatsApp team has access to our live booking system. They can check availability instantly and even hold rooms while you decide. Would you like me to connect you to WhatsApp for immediate assistance?";
    }
    
    if (input.includes('special') || input.includes('offer') || input.includes('discount') || input.includes('deal')) {
      return "We often have special offers and packages available! Our WhatsApp team can share current promotions, loyalty program benefits, and exclusive deals that might not be advertised elsewhere. Ready to see what special offers are available for your dates?";
    }
    
    return "I'm here to help with basic information about Seaside Suites! For detailed assistance, personalized recommendations, and to complete your booking, our WhatsApp specialists are standing by. They can provide real-time support, share photos, check availability, and handle special requests. Would you like to continue this conversation on WhatsApp?";
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I was chatting with your assistant and would like to continue our conversation about booking a stay at Seaside Suites.");
    window.open(`https://wa.me/15551234567?text=${message}`, '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat Widget */}
      <div
        className={`fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl transition-all duration-300 flex flex-col z-50 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-sky-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-sky-600 font-bold text-lg">SS</span>
            </div>
            <div>
              <h3 className="font-semibold">Seaside Suites</h3>
              <p className="text-sky-100 text-sm">Online • Ready to help</p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="text-white hover:text-sky-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start">
                  {message.sender === 'bot' && (
                    <div className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <span className="text-white text-xs font-bold">SS</span>
                    </div>
                  )}
                  {message.sender === 'user' && (
                    <User className="w-4 h-4 ml-2 mt-1 flex-shrink-0 order-2" />
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="px-4 py-2 border-t bg-green-50">
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Continue on WhatsApp
          </button>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            For instant booking assistance, use WhatsApp above
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;