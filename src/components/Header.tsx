import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle, Paintbrush } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    return gtag_report_conversion('tel:0543051679');
  };

  const phoneNumber = '0543051679';
  const whatsappLink = `https://wa.me/972${phoneNumber.substring(1)}`;

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Paintbrush className="w-8 h-8 text-blue-600 mr-3" style={{ transform: 'rotate(-15deg)' }} />
            <div>
              <div className="flex flex-col sm:flex-row items-center">
                <span className="text-2xl font-bold text-blue-600 ml-2">צביעה מקצועית</span>
                <div className="flex items-center gap-2 mr-2">
                  <a
                    href="tel:0543051679"
                    onClick={handlePhoneClick}
                    className="text-2xl font-bold text-blue-800 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <Phone className="w-5 h-5 ml-1" />
                    054-305-1679
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors flex items-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <a href="#contact" className="text-gray-700 hover:text-blue-600">צור קשר</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600">שירותים</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">מחירון</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600">אודות</a>
            <div className="flex items-center gap-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                וואטסאפ
              </a>
              <a
                href="tel:0543051679"
                onClick={handlePhoneClick}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5 ml-2 animate-pulse" />
                התקשר עכשיו
              </a>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600">צור קשר</a>
            <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600">שירותים</a>
            <a href="#pricing" className="block py-2 text-gray-700 hover:text-blue-600">מחירון</a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600">אודות</a>
            <div className="flex flex-col gap-2 mt-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg font-bold shadow-lg"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                פתח וואטסאפ
              </a>
              <a
                href="tel:0543051679"
                onClick={handlePhoneClick}
                className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg font-bold shadow-lg"
              >
                <Phone className="w-5 h-5 ml-2 animate-pulse" />
                התקשר עכשיו
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;