import React, { useState } from 'react';

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80',
      title: 'צבעים חיים',
      description: 'פלטת צבעים עוצרת נשימה'
    },
    {
      url: 'https://images.unsplash.com/photo-1591078615031-a57ddf64cb90?auto=format&fit=crop&q=80',
      title: 'צבעוניות מודרנית',
      description: 'עיצוב עכשווי וצבעוני'
    },
    {
      url: 'https://images.unsplash.com/photo-1578926078328-123456789012?auto=format&fit=crop&q=80',
      title: 'טונים חמים',
      description: 'פלטה חמה וביתית'
    },
    {
      url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80',
      title: 'טונים קרים',
      description: 'צבעים רגועים ומרגיעים'
    },
    {
      url: 'https://images.unsplash.com/photo-1565886215895-23f425c0b9cd?auto=format&fit=crop&q=80',
      title: 'סגנון עתידי',
      description: 'צבעוניות וגיאומטריה'
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">גלריית צבעים</h2>
          <p className="text-xl text-gray-600">
            השראה מעולם הצבעים - בחר את הצבע המושלם לדירתך
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl h-64"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-white mb-1">{image.title}</h3>
                <p className="text-sm text-gray-200">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              מוכנים לשנות את המראה של הבית שלכם?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              בחרו את הצבע שהכי מעניין אתכם מהגלריה שלנו וספרו לנו עוד על ההעדפות שלכם. הצוות המקצועי שלנו יעזור לכם בחירת הצבע המושלם.
            </p>
            <a
              href="#contact-form"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              צור קשר עכשיו
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
