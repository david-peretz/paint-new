// Single source of truth for every SEO fact that is not the phone number
// (that one lives in contact.ts and must stay there).
//
// SITE_URL is the ONLY placeholder in this file. The moment a real domain exists,
// change this one line and the canonical link, the Open Graph URL, the sitemap and
// every JSON-LD @id follow. Keep it absolute and without a trailing slash.
export const SITE_URL = 'https://www.example.co.il';

export const BUSINESS_NAME = 'צביעה מקצועית';
export const BUSINESS_DESCRIPTION =
  'צביעת דירות, בתים ועסקים בגוש דן והמרכז. מחירון שקוף, צבע איכותי של נירלט וטמבור, ' +
  'הגנה מלאה על הרהיטים והרצפה וניקיון בסיום. הצעת מחיר וייעוץ ללא עלות וללא התחייבות.';

// Cities used for areaServed in the LocalBusiness markup and for the footer's
// service-area line. Adding a city here adds it to both.
export const SERVICE_AREA_LABEL = 'גוש דן והמרכז';
export const SERVICE_AREA_CITIES = [
  'תל אביב',
  'רמת גן',
  'גבעתיים',
  'בני ברק',
  'פתח תקווה',
  'ראשון לציון',
  'חולון',
  'בת ים',
  'הרצליה',
  'רמת השרון',
  'כפר סבא',
  'רעננה',
  'ראש העין',
  'אור יהודה',
];

// The business has no street address to publish, so the LocalBusiness markup is
// modelled as a service-area business: no `address`, an `areaServed` list instead.
// Google accepts this and it is what a painter who travels to the customer is.
export const GEO = {
  // Centre of the service area (Tel Aviv), for the geo circle in JSON-LD.
  latitude: 32.0853,
  longitude: 34.7818,
  radiusMeters: 30000,
};
