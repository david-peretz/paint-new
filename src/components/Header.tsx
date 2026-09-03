import React, { useState } from 'react';
import { Menu, X, Phone, MessageCircle, Paintbrush } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from '../contact';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    return gtag_report_conversion(PHONE_TEL);
  };

  // Single source of truth for both navs - they drifted apart before, which is how
  // three links ended up pointing at a #contact id that never existed.
  const navLinks = [
    { href: '#contact-form', label: 'צור קשר' },
    { href: '#catalog', label: 'קטלוג' },
    { href: '#services', label: 'שירותים' },
    { href: '#pricing', label: 'מחירון' },
    { href: '#about', label: 'אודות' },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Paintbrush className="w-8 h-8 text-blue-600 mr-3" style={{ transform: 'rotate(-15deg)' }} />
            <div>
              <div className="flex flex-col sm:flex-row items-center">
                <span className="text-xl sm:text-2xl font-bold text-blue-600 ml-2">צביעה מקצועית</span>
                <div className="flex items-center gap-2 mr-2">
                  <a
                    href={PHONE_TEL}
                    onClick={handlePhoneClick}
                    className="text-lg sm:text-2xl font-bold text-blue-800 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 transition-colors flex items-center"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-700 hover:text-blue-600">
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                וואטסאפ
              </a>
              <a
                href={PHONE_TEL}
                onClick={handlePhoneClick}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5 ml-2 animate-pulse" />
                התקשר עכשיו
              </a>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
