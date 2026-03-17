import React, { useState } from 'react';
import { Check, Phone, MessageCircle } from 'lucide-react';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const pricingData = [
    {
      size: 'דירת חדר / סטודיו',
      furnished: '690 ₪'
    },
    {
      size: '2 חדרים',
      furnished: '1,190 ₪'
    },
    {
      size: '3 חדרים',
      furnished: '1,490 ₪'
    },
    {
      size: '4 חדרים',
      furnished: '1,690 ₪'
    },
    {
      size: '5 חדרים',
      furnished: '1,990 ₪'
    },
    {
      size: '6 חדרים/בית פרטי',
      furnished: '2,490 ₪'
    },
    {
      size: 'צביעת משרדים',
      furnished: '490 ₪ לחדר'
    }
  ];

  const phoneNumber = '0543051679';
  const whatsappLink = `https://wa.me/972${phoneNumber.substring(1)}`;

  const getNextTicketNumber = () => {
    const currentNumber = parseInt(localStorage.getItem('ticketNumber') || '0');
    const nextNumber = currentNumber + 1;
    localStorage.setItem('ticketNumber', nextNumber.toString());
    return nextNumber;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const ticketNumber = getNextTicketNumber();

    try {
      const response = await fetch('https://formsubmit.co/ajax/david82761@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `פנייה חדשה מאתר צביעה מקצועית - קריאה מספר ${ticketNumber}`,
          _captcha: false,
          _template: 'box'
        })
      });

      if (response.ok) {
        setFormData({ name: '', phone: '', message: '' });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="pt-20 relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1565182999561-18d7dc61c393?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-8">
            מחירון צביעת דירות
          </h1>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-6 py-4 text-right">גודל דירה</th>

                  <th className="px-6 py-4 text-center">מחיר החל מ</th>

                </tr>
              </thead>
              <tbody>
                {pricingData.map((row, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{row.size}</td>

                    <td className="px-6 py-4 text-center font-medium text-blue-600">{row.furnished}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
              <div>* המחירים לצביעת קירות + תיקונים בדירה ריקה מריהוט, <br />
              בגוון דומה בהתאם למצב הקירות. לא כולל תיקרות.</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:0543051679"
              onClick={(e) => gtag_report_conversion('tel:0543051679')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 text-center transition-colors flex items-center justify-center"
            >
              <Phone className="w-6 h-6 ml-2 animate-pulse" />
              התקשר עכשיו  054-305-1679
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

          <div id="contact-form" className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center">השאירו פרטים ונחזור אליכם</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">שם מלא</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="הכנס את שמך המלא"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">טלפון</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="הכנס את מספר הטלפון שלך"
                  pattern="[0-9]{10}"
                  title="אנא הכנס מספר טלפון תקין (10 ספרות)"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">הודעה</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all h-32 resize-y"
                  placeholder="כתוב את הודעתך כאן..."
                ></textarea>
              </div>
              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center font-semibold animate-fade-in">
                  אירעה שגיאה בשליחת הטופס. אנא נסה שוב או צור קשר בטלפון.
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-gray-400' :
                  submitStatus === 'success' ? 'bg-green-600' :
                    'bg-blue-600 hover:bg-blue-700'
                  } text-white py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    שולח...
                  </span>
                ) : submitStatus === 'success' ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    נשלח בהצלחה!
                  </span>
                ) : (
                  'שלח'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;