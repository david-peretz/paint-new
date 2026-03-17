import { CheckCircle } from 'lucide-react';

const Pricing = () => {
  const pricingData = [
    {
      size: 'דירת חדר / סטודיו',
      furnished: '640 ₪'
    },
    {
      size: '2 חדרים',
      furnished: '1,140 ₪'
    },
    {
      size: '3 חדרים',
      furnished: '1,440 ₪'
    },
    {
      size: '4 חדרים',
      furnished: '1,640 ₪'
    },
    {
      size: '5 חדרים',
      furnished: '1,940 ₪'
    },
    {
      size: '6 חדרים/בית פרטי',
      furnished: '2,440 ₪'
    },
    {
      size: 'צביעת משרדים',
      furnished: '440 ₪ לחדר'
    }
  ];

  const includes = [
    'צבע איכותי (נירלט / טמבור)',
    'תיקוני שפכטל קלים',
    'הגנה על רהיטים ורצפה',
    'ניקיון בסיסי בסיום',
    'לא כולל מע״מ'
  ];

  return (
    <section
      id="pricing"
      className="py-24 relative"
      style={{
        backgroundImage: 'url("/painter-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-white/90"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-blue-800">מחירון צביעת דירות</h2>
          <p className="text-gray-700 text-center max-w-4xl mx-auto mb-16 text-lg leading-relaxed">
            המחירים שלנו כוללים עבודה מקצועית עם חומרים איכותיים ביותר, צוות מנוסה ומיומן, 
            והתחייבות לאיכות גבוהה. כל פרויקט מתחיל בהערכה חינמית וייעוץ מקצועי כדי להתאים את הפתרון המדויק לצרכים שלכם.
          </p>

          <div className="bg-white rounded-xl shadow-2xl mb-16">
            <div className="px-10 py-10">
              {pricingData.map((row, index) => (
                <div key={index} className="mb-6">
                  <div className="text-3xl md:text-4xl font-bold text-center">
                    מחירון – {row.size} החל מ {row.furnished}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-10 py-6 bg-gray-100 text-sm text-gray-700">
              <div className="text-lg font-medium">* המחירים לצביעת קירות + תיקונים בדירה ריקה מריהוט, <br />
              בגוון דומה בהתאם למצב הקירות. לא כולל תיקרות.</div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-xl shadow-2xl p-12">
            <h3 className="text-3xl font-bold mb-8 text-center">מה כלול במחיר?</h3>
            <p className="text-gray-600 text-center mb-8 text-lg">
              כל שירות שלנו מגיע עם חבילה מלאה של שירותים מקצועיים כדי להבטיח תוצאה מושלמת
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {includes.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 ml-3" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl font-semibold mb-8 text-gray-800">רוצה הצעת מחיר מדויקת ומקצועית?</p>
            <p className="text-lg text-gray-600 mb-8">אנחנו נגיע אליכם לבית, נעריך את המצב ונתן הצעה מותאמת אישית</p>
            <a
              href="#contact"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
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
