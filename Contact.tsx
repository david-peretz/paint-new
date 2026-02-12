import React, { FormEvent, useState, useEffect } from 'react';
import { Phone, Mail, Clock, MapPin, Check } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />, 
      title: 'טלפון',
      content: '053-595-5657',
      link: 'tel:0535955657',
    },
    {
      icon: <Mail className="w-6 h-6" />, 
      title: 'אימייל',
      content: 'david82761@gmail.com',
      link: 'mailto:david82761@gmail.com',
    },
    {
      icon: <Clock className="w-6 h-6" />, 
      title: 'שעות פעילות',
      content: 'א׳-ה׳: 8:00-19:00',
    },
    {
      icon: <MapPin className="w-6 h-6" />, 
      title: 'אזור שירות',
      content: 'כל אזור המרכז',
    },
  ];

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const getNextTicketNumber = () => {
    const currentNumber = parseInt(localStorage.getItem('ticketNumber') || '0');
    const nextNumber = currentNumber + 1;
    localStorage.setItem('ticketNumber', nextNumber.toString());
    return nextNumber;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
          _template: 'box',
          _next: window.location.href
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '' });
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">צור קשר</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4 text-blue-600">{info.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
              {info.link ? (
                <a 
                  href={info.link} 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  target={info.link.startsWith('mailto:') ? '_blank' : undefined}
                  rel={info.link.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-600">{info.content}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
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
              className={`w-full ${
                isSubmitting ? 'bg-gray-400' : submitStatus === 'success' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
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
    </section>
  );
};

export default Contact;