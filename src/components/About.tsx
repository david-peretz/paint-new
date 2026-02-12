import React from 'react';
import { Shield, ThumbsUp, Clock, Users } from 'lucide-react';

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

  const galleryImages = [
    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80',
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="grid grid-cols-1 gap-4">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative overflow-hidden rounded-xl shadow-lg"
                  >
                    <img 
                      src={image}
                      alt="עבודות צביעה"
                      className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-full opacity-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400 rounded-full opacity-10" />
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">למה לבחור בנו?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              אנחנו מתמחים בביצוע עבודות צביעה מקצועיות לבתים פרטיים ועסקים. הצוות שלנו מורכב מאנשי מקצוע מנוסים המחויבים לאיכות ולשביעות רצון מלאה של לקוחותינו.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
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