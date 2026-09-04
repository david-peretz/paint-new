import { Paintbrush as Paint, Home, Building2, Paintbrush } from 'lucide-react';
import { SERVICE_AREA_LABEL } from '../seo';

const Services = () => {
  const services = [
    {
      icon: <Paint className="w-12 h-12 text-blue-600" />,
      title: 'צביעת פנים',
      alt: 'צבע מקצועי צובע קיר פנים בדירה בגלגל צבע',
      description: 'צביעה מקצועית של קירות פנים, תקרות וחדרים עם חומרים איכותיים',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=75&w=800',
      hoverImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=75&w=800'
    },
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: 'צביעת חוץ',
      alt: 'צביעת קיר חוץ של בית פרטי בצבע עמיד לתנאי מזג האוויר',
      description: 'צביעת קירות חיצוניים עם צבעים עמידים לתנאי מזג האוויר',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=75&w=800',
      hoverImage: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&q=75&w=800'
    },
    {
      icon: <Building2 className="w-12 h-12 text-blue-600" />,
      title: 'צביעת מבנים מסחריים',
      alt: 'חלל מסחרי צבוע - שירותי צביעה למשרדים, חנויות ומבני תעשייה',
      description: 'שירותי צביעה מקצועיים למשרדים, חנויות ומבני תעשייה',
      image: '/image2.webp',
      hoverImage: '/image2.webp'
    },
    {
      icon: <Paintbrush className="w-12 h-12 text-blue-600" />,
      title: 'עבודות מיוחדות',
      alt: 'קיר עם צביעה דקורטיבית ואפקט מיוחד בסלון',
      description: 'צביעה דקורטיבית, אפקטים מיוחדים ופתרונות מותאמים אישית',
      image: '/image1.webp',
      hoverImage: '/image1.webp'
    },
  ];

  return (
    <section id="services" className="py-10 md:py-14 bg-slate-100 border-y border-slate-300">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">השירותים שלנו</h2>
        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
          אנו מציעים מגוון רחב של שירותי צביעה מקצועיים ב{SERVICE_AREA_LABEL}, תוך שימוש
          בחומרים האיכותיים ביותר ובטכניקות המתקדמות בענף
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  decoding="async"
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