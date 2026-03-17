import React from 'react';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    alt: 'סלון צבוע בגוון טורקיז',
    title: 'סלון מודרני בגוון טורקיז'
  },
  {
    src: 'https://images.unsplash.com/photo-1618221527692-1f50df4c0f8c?auto=format&fit=crop&w=1200&q=80',
    alt: 'חדר שינה עם קיר בצבע אפרסק',
    title: 'חדר שינה בגוון אפרסק'
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154457-42f69f3ad4c9?auto=format&fit=crop&w=1200&q=80',
    alt: 'מטבח לבן עם קיר ירקרק',
    title: 'מטבח נקי בגוון ירוק'
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    alt: 'חדר עבודה עם צבע קיר כסוף',
    title: 'חדר עבודה בצבע כסף'
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154355-0b0c746d3dca?auto=format&fit=crop&w=1200&q=80',
    alt: 'חדר ילדים עם קיר צבעוני',
    title: 'חדר ילדים צבעוני'
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154342-38c0cd2e3bb0?auto=format&fit=crop&w=1200&q=80',
    alt: 'מסדרון בצבעים רגועים',
    title: 'מסדרון בצבעים רגועים'
  }
];

const Catalog = () => {
  return (
    <section id="catalog" className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">קטלוג עבודות</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
          הנה כמה דוגמאות של דירות צבענו לאחרונה. כל תמונה מייצגת פרויקט אמיתי עם גוונים ועדכוני טקסטורות.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img.src} className="rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="relative aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
