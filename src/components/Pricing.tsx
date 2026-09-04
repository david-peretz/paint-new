import React from "react";
import { CheckCircle, Phone, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_LINK } from "../contact";
// The rows and the "what's included" list live in pricing.ts so the Offer markup in
// JsonLd.tsx quotes the same numbers this table renders.
import { pricingData, includes, unfurnishedPrice } from "../pricing";
import { SERVICE_AREA_LABEL } from "../seo";

const Pricing = () => {
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    return gtag_report_conversion(PHONE_TEL);
  };

  const formatCurrency = (value: number) => `₪${value.toLocaleString("en-US")}`;

  return (
    <section
      id="pricing"
      className="pt-36 pb-6 md:pt-28 md:pb-12 relative border-b border-slate-300"
      style={{
        backgroundImage: 'url("/image2.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4 justify-center mb-2 md:mb-8 max-w-2xl mx-auto w-full">
            <a
              href={PHONE_TEL}
              onClick={handlePhoneClick}
              className="w-full bg-blue-600 text-white px-3 py-2 md:px-8 md:py-4 rounded-md md:rounded-lg text-xs sm:text-sm md:text-xl font-semibold hover:bg-blue-700 text-center transition-colors flex flex-wrap items-center justify-center gap-x-1 leading-tight min-h-[80px]"
            >
              <Phone className="w-4 h-4 md:w-6 md:h-6 ml-1 md:ml-2 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">התקשר עכשיו</span>
              <span className="hidden sm:inline whitespace-nowrap">
                {PHONE_DISPLAY}
              </span>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white px-3 py-2 md:px-8 md:py-4 rounded-md md:rounded-lg text-xs sm:text-sm md:text-xl font-semibold hover:bg-green-700 text-center transition-colors flex flex-wrap items-center justify-center gap-x-1 leading-tight min-h-[80px]"
            >
              <MessageCircle className="w-4 h-4 md:w-6 md:h-6 ml-1 md:ml-2 shrink-0" />
              <span className="whitespace-nowrap">שלח הודעה בוואטסאפ</span>
            </a>
          </div>

          {/* This is the page's only <h1>. Pricing renders first in App.tsx, so this is
              also the first heading in the DOM - which is where a crawler looks for the
              page's subject. Hero's headline is an <h2> for the same reason. */}
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-center mb-2 md:mb-8">
            מחירון צביעת דירות ב{SERVICE_AREA_LABEL}
          </h1>
          <p className="text-sm md:text-2xl font-semibold text-gray-700 text-center max-w-4xl mx-auto mb-4 md:mb-8">
            צביעת דירות ובתים בתל אביב, רמת גן, גבעתיים, פתח תקווה, ראשון לציון וכל
            אזור המרכז - עבודה מקצועית עם חומרים איכותיים ומחיר סגור מראש
          </p>

          <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
            <div className="md:hidden overflow-x-auto">
              <table className="w-full" dir="rtl">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-3 py-4 text-right text-sm font-extrabold text-gray-800">
                      גודל דירה
                    </th>
                    <th className="px-3 py-4 text-right text-sm font-extrabold text-gray-800">
                      לא מרוהטת
                    </th>
                    <th className="px-3 py-4 text-right text-sm font-extrabold text-gray-800">
                      מרוהטת
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, index) => {
                    return (
                      <tr
                        key={`mobile-${index}`}
                        className="border-b last:border-b-0"
                      >
                        <td className="px-3 py-4 text-base font-bold text-gray-900 whitespace-nowrap">
                          {row.type}
                        </td>
                        <td className="px-3 py-4 text-lg font-bold text-gray-800 whitespace-nowrap">
                          {formatCurrency(unfurnishedPrice(row))}
                        </td>
                        <td className="px-3 py-4 text-xl font-extrabold text-blue-700 whitespace-nowrap">
                          {formatCurrency(row.furnishedPrice)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[900px]" dir="rtl">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">
                      גודל דירה
                    </th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">
                      מחיר דירה לא מרוהטת
                    </th>
                    <th className="px-6 py-5 text-right text-xl md:text-2xl font-extrabold text-gray-800">
                      מחיר דירה מרוהטת
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, index) => {
                    return (
                      <tr
                        key={`desktop-${index}`}
                        className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-5 text-xl md:text-2xl font-bold text-gray-900 whitespace-nowrap">
                          {row.type}
                        </td>
                        <td className="px-6 py-5 text-xl md:text-2xl font-bold text-gray-800 whitespace-nowrap">
                          {formatCurrency(unfurnishedPrice(row))}
                        </td>
                        <td className="px-6 py-5 text-2xl md:text-3xl font-extrabold text-blue-700 whitespace-nowrap">
                          {formatCurrency(row.furnishedPrice)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div
              className="px-6 py-4 bg-gray-50 text-base md:text-lg font-semibold text-gray-700"
              dir="rtl"
            >
              <div>* לא כולל מע"מ</div>
              <div>* לא כולל תקרות</div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-lg border border-slate-200 p-5 sm:p-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6">
              מה כלול במחיר?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {includes.map((item, index) => (
                <div key={index} className="flex items-center" dir="rtl">
                  <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-blue-700 ml-3" />
                  <span className="text-lg md:text-2xl font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-6">
              רוצה הצעת מחיר מדויקת?
            </p>
            <a
              href="#contact-form"
              className="inline-block w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-10 py-4 rounded-lg text-lg sm:text-xl md:text-2xl font-extrabold hover:bg-blue-700 transition-colors"
            >
              השאירו פרטים לקבלת הצעת מחיר וייעוץ בחינם!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
