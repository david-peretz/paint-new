// The FAQ content, kept out of Faq.tsx so two consumers can share one copy:
// the accordion in Faq.tsx and the FAQPage JSON-LD in JsonLd.tsx. Duplicating the
// answers into the structured data by hand is how the two drift apart and how Google
// ends up showing a rich result the page no longer says.
//
// A file of its own (rather than an export from Faq.tsx) because
// eslint-plugin-react-refresh warns on non-component exports from a component file.
import { pricingData, unfurnishedPrice, type PricingRow } from './pricing';

export type Faq = {
  question: string;
  answer: string;
};

// The three price answers quote the price table instead of repeating its numbers.
// pricing.ts is already the single copy the visible table and the Offer markup share;
// an FAQ answer that stated "₪3,000" in prose would be a fourth copy waiting to
// contradict them. A row this file names but pricing.ts does not have throws at module
// load - which now happens during `npm run build`, inside scripts/prerender.mjs, so a
// renamed row fails the build instead of shipping a broken page.
const rowFor = (type: string): PricingRow => {
  const row = pricingData.find((candidate) => candidate.type === type);
  if (!row) {
    throw new Error(`faqs.ts quotes a price for "${type}", which pricing.ts has no row for`);
  }
  return row;
};

const shekels = (amount: number) => `₪${amount.toLocaleString('en-US')}`;
const empty = (type: string) => shekels(unfurnishedPrice(rowFor(type)));
const furnished = (type: string) => shekels(rowFor(type).furnishedPrice);

export const faqs: Faq[] = [
  {
    question: 'כמה עולה לצבוע דירת 3 חדרים?',
    answer:
      `דירת 3 חדרים ריקה נצבעת ב-${empty('3 חדרים')} ודירה מרוהטת ב-${furnished('3 חדרים')}, לפני מע"מ ולא כולל תקרות. ` +
      'המחיר סגור מראש וכולל את הצבע, תיקוני שפכטל קלים, הגנה על הרהיטים והרצפה וניקיון בסיום. העבודה נמשכת בדרך כלל יום עד יומיים.',
  },
  {
    question: 'כמה עולה לצבוע דירת 4 חדרים?',
    answer:
      `דירת 4 חדרים ריקה נצבעת ב-${empty('4 חדרים')} ודירה מרוהטת ב-${furnished('4 חדרים')}, לפני מע"מ ולא כולל תקרות. ` +
      'ההפרש בין ריקה למרוהטת הוא עבודת כיסוי הרהיטים וסידורם בסיום, כך שפינוי מוקדם של מה שאפשר מוזיל את העבודה בפועל.',
  },
  {
    question: 'כמה עולה לצבוע דירת 5 חדרים?',
    answer:
      `דירת 5 חדרים ריקה נצבעת ב-${empty('5 חדרים')} ודירה מרוהטת ב-${furnished('5 חדרים')}, לפני מע"מ ולא כולל תקרות. ` +
      'בדירה בגודל הזה כדאי לסגור מראש בהצעת המחיר גם את התקרות ואת חדרי השירות, כדי שהסכום שתקבלו יהיה סופי. העבודה נמשכת כשלושה ימים.',
  },
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
