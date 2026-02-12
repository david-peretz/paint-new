import React from 'react';
import { Paintbrush as Paint, Home, Building2, Paintbrush } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Paint className="w-12 h-12 text-blue-600" />,
      title: 'צביעת פנים',
      description: 'צביעה מקצועית של קירות פנים, תקרות וחדרים עם חומרים איכותיים',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80'
    },
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: 'צביעת חוץ',
      description: 'צביעת קירות חיצוניים עם צבעים עמידים לתנאי מזג האוויר',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&q=80'
    },
    {
      icon: <Building2 className="w-12 h-12 text-blue-600" />,
      title: 'צביעת מבנים מסחריים',
      description: 'שירותי צביעה מקצועיים למשרדים, חנויות ומבני תעשייה',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80'
    },
    {
      icon: <Paintbrush className="w-12 h-12 text-blue-600" />,
      title: 'עבודות מיוחדות',
      description: 'צביעה דקורטיבית, אפקטים מיוחדים ופתרונות מותאמים אישית',
      image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1604187350603-c0891d42944d?auto=format&fit=crop&q=80'
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">השירותים שלנו</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          אנו מציעים מגוון רחב של שירותי צביעה מקצועיים, תוך שימוש בחומרים האיכותיים ביותר ובטכניקות המתקדמות בענף
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 bg-white relative">
                <div className="flex justify-center mb-4 transform -translate-y-12 group-hover:-translate-y-16 transition-transform duration-300">
                  <div className="bg-white p-3 rounded-full shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <div className="text-center transform -translate-y-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;