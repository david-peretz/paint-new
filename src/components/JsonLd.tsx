import { PHONE_DIGITS, WHATSAPP_LINK } from '../contact';
import { faqs } from '../faqs';
import { pricingData, unfurnishedPrice, LOWEST_PRICE, HIGHEST_PRICE } from '../pricing';
import {
  SITE_URL,
  BUSINESS_NAME,
  BUSINESS_DESCRIPTION,
  SERVICE_AREA_LABEL,
  SERVICE_AREA_CITIES,
  GEO,
} from '../seo';

// Structured data for the whole page, built from the same modules the visible sections
// render from - contact.ts, faqs.ts, pricing.ts. Nothing here is retyped by hand, so the
// markup cannot claim a price or an answer the page does not show.
//
// It is emitted from React rather than pasted into index.html because the phone number
// is only allowed to live in contact.ts and the FAQ answers only in faqs.ts. Googlebot
// renders JavaScript before extracting JSON-LD, and every word of this page already
// requires that same rendering pass, so nothing is lost by generating it here.
//
// The static <meta>/Open Graph tags stay in index.html on purpose: WhatsApp, Facebook
// and Twitter scrape the raw HTML and never run JavaScript.

// E.164, which is the only phone format Google's structured data reads reliably.
const PHONE_E164 = `+972${PHONE_DIGITS.substring(1)}`;

const localBusiness = {
  '@type': ['HomeAndConstructionBusiness', 'HousePainter'],
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  description: BUSINESS_DESCRIPTION,
  url: `${SITE_URL}/`,
  telephone: PHONE_E164,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/favicon.svg`,
  priceRange: '₪₪',
  currenciesAccepted: 'ILS',
  sameAs: [WHATSAPP_LINK],
  // A painter who travels to the customer has no storefront to publish, so this is
  // modelled as a service-area business: areaServed instead of a postal address.
  areaServed: SERVICE_AREA_CITIES.map((city) => ({ '@type': 'City', name: city })),
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    geoRadius: GEO.radiusMeters,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE_E164,
    contactType: 'sales',
    areaServed: 'IL',
    availableLanguage: ['he', 'en'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `מחירון צביעת דירות - ${SERVICE_AREA_LABEL}`,
    itemListElement: pricingData.flatMap((row) => [
      {
        '@type': 'Offer',
        name: `צביעת דירת ${row.type} - לא מרוהטת`,
        price: unfurnishedPrice(row),
        priceCurrency: 'ILS',
        // The table's own footnote: prices are quoted before VAT.
        valueAddedTaxIncluded: false,
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: `צביעת דירת ${row.type}`,
          serviceType: 'צביעת דירות',
        },
      },
      {
        '@type': 'Offer',
        name: `צביעת דירת ${row.type} - מרוהטת`,
        price: row.furnishedPrice,
        priceCurrency: 'ILS',
        valueAddedTaxIncluded: false,
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: `צביעת דירת ${row.type} מרוהטת`,
          serviceType: 'צביעת דירות',
        },
      },
    ]),
  },
};

const service = {
  '@type': 'Service',
  '@id': `${SITE_URL}/#service`,
  serviceType: 'צביעת דירות ובתים',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: SERVICE_AREA_CITIES.map((city) => ({ '@type': 'City', name: city })),
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'ILS',
    lowPrice: LOWEST_PRICE,
    highPrice: HIGHEST_PRICE,
    offerCount: pricingData.length * 2,
  },
};

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const webPage = {
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: `${BUSINESS_NAME} - מחירון צביעת דירות ב${SERVICE_AREA_LABEL}`,
  description: BUSINESS_DESCRIPTION,
  inLanguage: 'he-IL',
  about: { '@id': `${SITE_URL}/#business` },
  primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
};

// One @graph rather than several loose <script> blocks, so the nodes can reference each
// other by @id instead of repeating the business on every entity.
const graph = {
  '@context': 'https://schema.org',
  '@graph': [localBusiness, service, faqPage, webPage],
};

const JsonLd = () => (
  <script
    type="application/ld+json"
    // JSON.stringify output contains no markup, and every value in it comes from this
    // repo's own modules - there is no user input anywhere in the graph.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
  />
);

export default JsonLd;
