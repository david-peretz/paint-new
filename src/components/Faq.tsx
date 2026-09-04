import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from '../contact';

const faqs = [
  {
    question: 'כמה זמן לוקחת צביעת דירה?',
    answer:
      'דירת 3 חדרים ריקה נצבעת בדרך כלל תוך יום עד יומיים, ודירת 5 חדרים תוך כשלושה ימים. בדירה מרוהטת מוסיפים כחצי יום לכיסוי הרהיטים ולסידור בסיום. תיקוני שפכטל נרחבים או שכבה שלישית עשויים להאריך את הלוח.',
  },
  {
    question: 'האם המחירים כוללים מע"מ ותקרות?',
    answer:
      'לא. המחירים במחירון הם לפני מע"מ ואינם כוללים צביעת תקרות. תקרות מתומחרות בנפרד לפי שטח ומצב, ונשמח לכלול אותן בהצעת המחיר שתקבלו.',
  },
  {
    question: 'האם צריך לפנות את הרהיטים מהבית?',
    answer:
      'אין צורך לפנות את הבית. אנחנו מרכזים את הרהיטים במרכז החדר ומכסים אותם ביריעות ניילון, יחד עם הרצפה, המשקופים ונקודות החשמל. פינוי מראש של פריטים קטנים ושבירים מזרז את העבודה וגם מוזיל אותה - מחיר דירה לא מרוהטת נמוך יותר.',
  },
  {
    question: 'כל כמה שנים כדאי לצבוע את הבית?',
    answer:
      'בדירת מגורים ממוצעת כל 5 עד 7 שנים. במטבח, בחדרי ילדים ובמסדרונות הצבע נשחק מהר יותר וסביר לרענן כל 3 עד 4 שנים. קירות חוץ החשופים לשמש ולגשם דורשים חידוש כל 5 עד 8 שנים, בהתאם לכיוון האוויר ולסוג הצבע.',
  },
  {
    question: 'כמה שכבות צבע אתם מורחים?',
    answer:
      'כברירת מחדל שתי שכבות מלאות מעל הכנת השטח. מעבר מגוון כהה לבהיר, כיסוי כתמי רטיבות או קיר שלא נצבע שנים רבות ידרשו לעיתים שכבה שלישית - נאמר לכם על כך מראש ולא בדיעבד.',
  },
  {
    question: 'מה ההבדל בין סופרקריל לפוליסיד?',
    answer:
      'סופרקריל הוא צבע אקרילי מט לקירות פנים, קל לתיקון ונעים לעין. פוליסיד עמיד יותר בפני שפשוף וניתן לשטיפה, ולכן מתאים למטבח, לשירותים, לחדרי ילדים ולמסדרונות. לקירות חוץ משתמשים בצבע חוץ ייעודי, עמיד לתנאי מזג האוויר.',
  },
  {
    question: 'האם אתם מטפלים בסדקים, בנזילות ובעובש?',
    answer:
      'כן. סדקים, תיקוני שפכטל, ליטוש ויסוד נכללים בעבודה, וכתמי עובש מטופלים בחומר ייעודי לפני הצביעה. חשוב לדעת: אם מקור הרטיבות עדיין פעיל - נזילה מצנרת או איטום לקוי - יש לתקן אותו קודם, אחרת הכתם יחזור גם מתחת לצבע החדש.',
  },
  {
    question: 'מתי אפשר לחזור לגור בדירה אחרי הצביעה?',
    answer:
      'צבעי מים מודרניים מתייבשים למגע תוך שעתיים עד ארבע שעות וכמעט חסרי ריח, כך שאפשר לחזור לשגרה באותו ערב. מומלץ לאוורר את החדרים ביממה הראשונה. התקשות מלאה של הצבע אורכת כשבועיים - עד אז כדאי להימנע משפשוף הקירות.',
  },
  {
    question: 'מי מספק את הצבע והחומרים?',
    answer:
      'אנחנו. המחיר במחירון כולל את הצבע, את חומרי ההכנה ואת כל הציוד - יריעות כיסוי, סולמות וכלי עבודה. אתם רק בוחרים גוונים, ונשמח לייעץ בבחירה.',
  },
  {
    question: 'האם אתם מנקים בסיום העבודה?',
    answer:
      'כן. בסיום מסירים את יריעות הכיסוי, מחזירים את הרהיטים למקומם ומנקים את שטח העבודה. הדירה נמסרת נקייה ומוכנה למגורים.',
  },
  {
    question: 'האם יש אחריות על העבודה?',
    answer:
      'כן. אנחנו עומדים מאחורי העבודה ומעניקים אחריות על טיב הביצוע. אם מתגלה פגם שנובע מהצביעה עצמה, אנחנו חוזרים ומתקנים ללא עלות.',
  },
  {
    question: 'איך מקבלים הצעת מחיר מדויקת?',
    answer:
      'טווח מחירים אפשר לקבל בטלפון תוך כמה דקות, לפי מספר החדרים ומצב הקירות. להצעה מחייבת נגיע לביקור מדידה ללא עלות וללא התחייבות, ותקבלו מחיר סופי בכתב הכולל את היקף העבודה המלא.',
  },
];

const Faq = () => {
  // Accordion state is local to this section, like every other bit of state on the page.
  // null collapses everything; only one answer is open at a time.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    return gtag_report_conversion(PHONE_TEL);
  };

  return (
    <section id="faq" className="py-10 md:py-14 bg-slate-100 border-y border-slate-300">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <HelpCircle className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">שאלות ותשובות</h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
            כל מה שכדאי לדעת לפני צביעת דירה או בית - זמנים, מחירים, חומרים והכנת הבית לעבודה
          </p>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-md border overflow-hidden transition-shadow duration-300 ${
                    isOpen ? 'border-blue-300 shadow-lg' : 'border-slate-200 hover:shadow-lg'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="w-full flex items-center justify-between gap-3 p-5 sm:p-6 text-right"
                    >
                      <span className="text-lg sm:text-xl font-bold text-gray-800">{faq.question}</span>
                      <ChevronDown
                        className={`w-6 h-6 shrink-0 text-blue-600 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div id={`faq-answer-${index}`} className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-lg border border-slate-200 p-5 sm:p-8 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">לא מצאתם תשובה?</h3>
            <p className="text-gray-700 mb-6">
              מוזמנים להתקשר או לשלוח הודעה - נענה על כל שאלה ונשמח לתת הצעת מחיר ללא התחייבות
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_TEL}
                onClick={handlePhoneClick}
                className="flex items-center justify-center bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5 ml-2 shrink-0" />
                <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 text-lg font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 ml-2 shrink-0" />
                שלחו הודעה בוואטסאפ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
