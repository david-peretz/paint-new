// Alt text and titles describe the gouache actually in each photo - the rooms, the
// colour and the finish. They used to read "תמונת דירה צבועה - CAT1", which told a
// screen reader and Google Images exactly nothing and wasted five indexable images.
//
// width/height are the intrinsic dimensions of the .webp files and are what stops the
// grid from reflowing as the photos arrive (Cumulative Layout Shift).
const images = [
  {
    src: '/cat1.webp',
    width: 1200,
    height: 670,
    alt: 'סלון, חדר שינה ומטבח צבועים בגוון תכלת בהיר עם תקרה וקירות לבנים',
    title: 'דירת 3 חדרים בגוון תכלת',
  },
  {
    src: '/cat2.webp',
    width: 1200,
    height: 670,
    alt: 'סלון ופינת אוכל צבועים בתכלת עם קירות לבנים ומטבח בגוון תואם',
    title: 'סלון ופינת אוכל בתכלת',
  },
  {
    src: '/cat3.webp',
    width: 1200,
    height: 670,
    alt: 'דירה ריקה בהכנה לצביעה - יריעות כיסוי, קיר דגש בכחול נייבי וקיר בגוון ירוק',
    title: 'קירות דגש בכחול נייבי ובירוק',
  },
  {
    src: '/cat4.webp',
    width: 1200,
    height: 670,
    alt: 'סלון בגוון שמנת, שני חדרי שינה בירוק מרווה ומסדרון לבן אחרי צביעה',
    title: 'דירת 4 חדרים בשמנת וירוק מרווה',
  },
  {
    src: '/cat5.webp',
    width: 1200,
    height: 670,
    alt: 'סלון מרווח צבוע בירוק מרווה עם קיר דגש אפור כהה סביב הקמין',
    title: 'סלון בירוק מרווה עם קיר דגש אפור',
  },
];

const Catalog = () => {
  return (
    <section id="catalog" className="py-10 md:py-14 bg-slate-100 border-y border-slate-300">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 md:mb-6">קטלוג עבודות צביעה</h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8 text-base sm:text-lg">
          דירות ובתים שצבענו בגוש דן ובמרכז. כל תמונה מייצגת פרויקט עם גוונים ועדכוני
          טקסטורות - מתכלת ולבן ועד קירות דגש בירוק מרווה ובכחול נייבי.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <figure key={img.src} className="rounded-2xl overflow-hidden shadow-lg bg-white border border-slate-200">
              <div className="relative aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{img.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
