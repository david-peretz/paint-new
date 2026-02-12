import React from 'react';
import { CheckCircle } from 'lucide-react';

const Pricing = () => {
  const pricingData = [
    {
      size: '3 חדרים (עד 80 מ״ר)',
      unfurnished: '2,599 ₪',
      furnished: '4,450 ₪',
      ceiling: '2,250 ₪'
    },
    {
      size: '4 חדרים (עד 100 מ״ר)',
      unfurnished: '2,950 ₪',
      furnished: '6,950 ₪',
      ceiling: '2,450 ₪'
    },
    {
      size: '5 חדרים (עד 120 מ״ר)',
      unfurnished: '3,050 ₪',
      furnished: '7,450 ₪',
      ceiling: '2,450 ₪'
    }
  ];

  const includes = [
    'צבע איכותי (נירלט / טמבור)',
    'תיקוני שפכטל קלים',
    'הגנה על רהיטים ורצפה',
    'ניקיון בסיסי בסיום'
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">מחירון צביעת דירות</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          המחירים כוללים עבודה מקצועית עם חומרים איכותיים. בדירות מרוהטות המחיר כולל תקרה!
        </p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-right">גודל דירה</th>
                <th className="px-6 py-4 text-center">מחיר דירה לא מרוהטת</th>
                <th className="px-6 py-4 text-center">מחיר דירה מרוהטת<br/>(לא כולל תקרה)</th>
                <th className="px-6 py-4 text-center">תוספת תקרה<br/>לדירה לא מרוהטת</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((row, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">{row.size}</td>
                  <td className="px-6 py-4 text-center">{row.unfurnished}</td>
                  <td className="px-6 py-4 text-center font-medium text-blue-600">{row.furnished}</td>
                  <td className="px-6 py-4 text-center">{row.ceiling}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
            <div>* תיקוני שפכטל בלבד לא כולל ליטוש ולא כולל מע״מ</div>
            <div>* צביעת תקרה בנפרד 30 ₪ למ״ר 2 ידיים ותיקוני שפכטל</div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">מה כלול במחיר?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {includes.map((item, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 ml-2" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-semibold mb-6">רוצה הצעת מחיר מדויקת?</p>
          <a 
            href="#contact" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            השאר פרטים עכשיו
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;