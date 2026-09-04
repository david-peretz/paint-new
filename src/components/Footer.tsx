import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from '../contact';
import { BUSINESS_NAME, SERVICE_AREA_LABEL, SERVICE_AREA_CITIES } from '../seo';

const Footer = () => {
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    return gtag_report_conversion(PHONE_TEL);
  };

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        {/* Name, phone and service area together in the footer: it is the block a local
            search engine reads as the business's identity, and it was previously a
            single line of text with no phone and no location in it at all. */}
        <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto text-center sm:text-right">
          <div>
            <h2 className="text-xl font-bold mb-2">{BUSINESS_NAME}</h2>
            <p className="text-gray-300 mb-4">
              צביעת דירות, בתים ועסקים ב{SERVICE_AREA_LABEL}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <a
                href={PHONE_TEL}
                onClick={handlePhoneClick}
                className="flex items-center justify-center bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 font-bold transition-colors"
              >
                <Phone className="w-5 h-5 ml-2 shrink-0" />
                <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 font-bold transition-colors"
              >
                <MessageCircle className="w-5 h-5 ml-2 shrink-0" />
                וואטסאפ
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">אזורי שירות</h2>
            <p className="text-gray-300 leading-relaxed">
              {SERVICE_AREA_CITIES.join(' · ')} וכל אזור המרכז
            </p>
          </div>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {BUSINESS_NAME} - כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
