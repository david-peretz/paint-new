import React from 'react';
import { CheckCircle, Lightbulb, Phone, MessageCircle } from 'lucide-react';

const Pricing = () => {
  const phoneNumber = '0543051679';
  const whatsappLink = `https://wa.me/972${phoneNumber.substring(1)}`;

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    return gtag_report_conversion('tel:0543051679');
  };

  const pricingData = [
    {
      type: '3 חדרים',
      furnitureAddition: '+₪1,500',
      ceilingAddition: '+₪610',
      totalAdditions: '+₪2,110',
      finalPrice: '₪3,550'
    },
    {
      type: '4 חדרים',
      furnitureAddition: '+₪1,900',
      ceilingAddition: '+₪860',
      totalAdditions: '+₪2,760',
      finalPrice: '₪4,400'
    },
    {
      type: '5 חדרים',
      furnitureAddition: '+₪2,400',
      ceilingAddition: '+₪1,160',
      totalAdditions: '+₪3,560',
      finalPrice: '₪5,500'
    }
  ];

  const includes = [
    'צבע איכותי (נירלט / טמבור)',
    'תיקוני שפכטל קלים',
    'הגנה על רהיטים ורצפה',
    'ניקיון בסיסי בסיום',
    'לא כולל מע"מ'
  ];

  return (
    <section
      id="pricing"
      className="py-20 relative"
      style={{
        backgroundImage: 'url("/painter-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-white/85"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:0543051679"
              onClick={handlePhoneClick}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 text-center transition-colors flex items-center justify-center"
            >
              <Phone className="w-6 h-6 ml-2 animate-pulse" />
              התקשר עכשיו 054-305-1679
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 text-center transition-colors flex items-center justify-center"
            >
              <MessageCircle className="w-6 h-6 ml-2" />
              שלח הודעה בוואטסאפ
            </a>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-8">מחירון צביעת דירות</h2>
          <p className="text-xl md:text-2xl font-semibold text-gray-700 text-center max-w-4xl mx-auto mb-12">
            המחירים כוללים עבודה מקצועית עם חומרים איכותיים
          </p>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b bg-amber-50/40 flex items-center justify-end gap-3" dir="rtl">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">המלצה לפיצול התוספות</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]" dir="rtl">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">מחיר סופי</th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">סה״כ תוספות</th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">תוספת תקרות</th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">תוספת ריהוט</th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">סוג דירה</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, index) => (
                    <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-2xl md:text-3xl font-extrabold text-blue-700 whitespace-nowrap">{row.finalPrice}</td>
                      <td className="px-6 py-5 text-xl md:text-2xl font-extrabold text-gray-800 whitespace-nowrap">{row.totalAdditions}</td>
                      <td className="px-6 py-5 text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap">{row.ceilingAddition}</td>
                      <td className="px-6 py-5 text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap">{row.furnitureAddition}</td>
                      <td className="px-6 py-5 text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">{row.type}</td>
                    </tr>
                  ))}
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
