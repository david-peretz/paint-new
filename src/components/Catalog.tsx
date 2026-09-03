
const images = [
  {
    src: '/cat1.png',
    alt: 'תמונת דירה צבועה - CAT1',
    title: 'דירה צבועה - CAT1'
  },
  {
    src: '/cat2.png',
    alt: 'תמונת דירה צבועה - CAT2',
    title: 'דירה צבועה - CAT2'
  },
  {
    src: '/cat3.png',
    alt: 'תמונת דירה צבועה - CAT3',
    title: 'דירה צבועה - CAT3'
  },
  {
    src: '/cat4.png',
    alt: 'תמונת דירה צבועה - CAT4',
    title: 'דירה צבועה - CAT4'
  },
  {
    src: '/cat5.png',
    alt: 'תמונת דירה צבועה - CAT5',
    title: 'דירה צבועה - CAT5'
  }
];

const Catalog = () => {
  return (
    <section id="catalog" className="py-10 md:py-14 bg-slate-100 border-y border-slate-300">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 md:mb-6">קטלוג עבודות</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
          כל תמונה מייצגת פרויקט עם גוונים ועדכוני טקסטורות.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img.src} className="rounded-2xl overflow-hidden shadow-lg bg-white border border-slate-200">
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
