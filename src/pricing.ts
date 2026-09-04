// The price table's data, kept out of Pricing.tsx so the Offer markup in JsonLd.tsx
// quotes the same numbers the visible table does. Structured data that disagrees with
// the page is a manual action waiting to happen, so there is exactly one copy.
//
// `furnishedPrice` is the headline number; the unfurnished price is derived from it by
// subtracting `totalAdditions`, which is how the table has always computed it.
export type PricingRow = {
  type: string;
  totalAdditions: number;
  furnishedPrice: number;
};

export const pricingData: PricingRow[] = [
  {
    type: '3 חדרים',
    totalAdditions: 550,
    furnishedPrice: 3550,
  },
  {
    type: '4 חדרים',
    totalAdditions: 600,
    furnishedPrice: 4400,
  },
  {
    type: '5 חדרים',
    totalAdditions: 700,
    furnishedPrice: 5500,
  },
];

export const unfurnishedPrice = (row: PricingRow) => row.furnishedPrice - row.totalAdditions;

// The cheapest thing on the price list, for the `lowPrice` of the JSON-LD AggregateOffer
// and for anything else that wants "starting from".
export const LOWEST_PRICE = Math.min(...pricingData.map(unfurnishedPrice));
export const HIGHEST_PRICE = Math.max(...pricingData.map((row) => row.furnishedPrice));

export const includes = [
  'צבע איכותי (נירלט / טמבור)',
  'תיקוני שפכטל קלים',
  'הגנה על רהיטים ורצפה',
  'ניקיון בסיסי בסיום',
];
