import { Shield, ThumbsUp, Clock, Users } from 'lucide-react';
import { SERVICE_AREA_LABEL } from '../seo';

const About = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'איכות מובטחת',
      description: 'עבודה מקצועית עם חומרים איכותיים',
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-blue-600" />,
      title: 'ניסיון רב',
      description: 'שנים של ניסיון בענף הצביעה',
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: 'עמידה בזמנים',
      description: 'ביצוע העבודה בזמן המוסכם',
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'שירות אישי',
      description: 'ליווי מקצועי לאורך כל הדרך',
    },
  ];

  return (
    <section id="about" className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">למה לבחור בנו?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              אנחנו מתמחים בביצוע עבודות צביעה מקצועיות לדירות, לבתים פרטיים ולעסקים
              ב{SERVICE_AREA_LABEL}. הצוות שלנו מורכב מאנשי מקצוע מנוסים המחויבים לאיכות
              ולשביעות רצון מלאה של לקוחותינו.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-5 sm:p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;