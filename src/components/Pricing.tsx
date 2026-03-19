import React from 'react';
import { CheckCircle, Phone, MessageCircle } from 'lucide-react';

type PricingRow = {
  type: string;
  totalAdditions: number;
  furnishedPrice: number;
};

const Pricing = () => {
  const phoneNumber = '0543051679';
  const whatsappLink = `https://wa.me/972${phoneNumber.substring(1)}`;

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    return gtag_report_conversion('tel:0543051679');
  };

  const pricingData: PricingRow[] = [
    {
      type: '3 חדרים',
      totalAdditions: 550,
      furnishedPrice: 3550
    },
    {
      type: '4 חדרים',
      totalAdditions: 600,
      furnishedPrice: 4400
    },
    {
      type: '5 חדרים',
      totalAdditions: 700,
      furnishedPrice: 5500
    }
  ];

  const includes = [
    'צבע איכותי (נירלט / טמבור)',
    'תיקוני שפכטל קלים',
    'הגנה על רהיטים ורצפה',
    'ניקיון בסיסי בסיום',
    'לא כולל מע"מ'
  ];

  const formatCurrency = (value: number) => `₪${value.toLocaleString('en-US')}`;

  return (
    <section
      id="pricing"
      className="pt-36 pb-8 md:pt-28 md:pb-20 relative"
      style={{
        backgroundImage: 'url("/painter-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-white/85"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4 justify-center mb-2 md:mb-8 max-w-2xl mx-auto w-full">
            <a
              href="tel:0543051679"
              onClick={handlePhoneClick}
              className="w-full bg-blue-600 text-white px-3 py-2 md:px-8 md:py-4 rounded-md md:rounded-lg text-xs sm:text-sm md:text-xl font-semibold hover:bg-blue-700 text-center transition-colors flex items-center justify-center leading-tight min-h-[40px]"
            >
              <Phone className="w-4 h-4 md:w-6 md:h-6 ml-1 md:ml-2 animate-pulse shrink-0" />
              התקשר עכשיו
              <span className="hidden sm:inline">&nbsp;054-305-1679</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white px-3 py-2 md:px-8 md:py-4 rounded-md md:rounded-lg text-xs sm:text-sm md:text-xl font-semibold hover:bg-green-700 text-center transition-colors flex items-center justify-center leading-tight min-h-[40px]"
            >
              <MessageCircle className="w-4 h-4 md:w-6 md:h-6 ml-1 md:ml-2 shrink-0" />
              שלח הודעה בוואטסאפ
            </a>
          </div>

          <h2 className="text-2xl md:text-6xl font-extrabold text-center mb-2 md:mb-8">מחירון צביעת דירות</h2>
          <p className="text-sm md:text-2xl font-semibold text-gray-700 text-center max-w-4xl mx-auto mb-4 md:mb-12">
            המחירים כוללים עבודה מקצועית עם חומרים איכותיים
          </p>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:hidden">
              <table className="w-full" dir="rtl">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-3 py-4 text-right text-sm font-extrabold text-gray-800">גודל דירה</th>
                    <th className="px-3 py-4 text-right text-sm font-extrabold text-gray-800">לא מרוהטת</th>
                    <th className="px-3 py-4 text-right text-sm font-extrabold text-gray-800">מרוהטת</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, index) => {
                    const unfurnishedPrice = row.furnishedPrice - row.totalAdditions;

                    return (
                      <tr key={`mobile-${index}`} className="border-b last:border-b-0">
                        <td className="px-3 py-4 text-base font-bold text-gray-900 whitespace-nowrap">{row.type}</td>
                        <td className="px-3 py-4 text-lg font-bold text-gray-800 whitespace-nowrap">{formatCurrency(unfurnishedPrice)}</td>
                        <td className="px-3 py-4 text-xl font-extrabold text-blue-700 whitespace-nowrap">{formatCurrency(row.furnishedPrice)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[900px]" dir="rtl">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">גודל דירה</th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">מחיר דירה לא מרוהטת</th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">סה״כ תוספות</th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">מחיר דירה מרוהטת</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, index) => {
                    const unfurnishedPrice = row.furnishedPrice - row.totalAdditions;

                    return (
                      <tr key={`desktop-${index}`} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">{row.type}</td>
                        <td className="px-6 py-5 text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap">{formatCurrency(unfurnishedPrice)}</td>
                        <td className="px-6 py-5 text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap">+{formatCurrency(row.totalAdditions)}</td>
                        <td className="px-6 py-5 text-2xl md:text-3xl font-extrabold text-blue-700 whitespace-nowrap">{formatCurrency(row.furnishedPrice)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-gray-50 text-base md:text-lg font-semibold text-gray-700" dir="rtl">
              <div>* לא כולל מע"מ</div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-8">מה כלול במחיר?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {includes.map((item, index) => (
                <div key={index} className="flex items-center" dir="rtl">
                  <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-blue-700 ml-3" />
                  <span className="text-lg md:text-2xl font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl md:text-4xl font-extrabold mb-8">רוצה הצעת מחיר מדויקת?</p>
            <a
              href="#contact"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-xl md:text-2xl font-extrabold hover:bg-blue-700 transition-colors"
            >
              השאר פרטים עכשיו
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
