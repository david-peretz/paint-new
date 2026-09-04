import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from '../contact';
import { faqs } from '../faqs';

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
                  {/* Every answer is always in the DOM and merely hidden, never
                      unmounted: a collapsed answer that does not render is text Google
                      cannot index, and eleven of the twelve are collapsed on load. */}
                  <div
                    id={`faq-answer-${index}`}
                    hidden={!isOpen}
                    className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1"
                  >
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
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
