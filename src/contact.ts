// Single source of truth for the business phone number.
// It used to be hardcoded 9 times across Header and Pricing; change it here and the
// display text, both tel: links, the conversion tracking and the WhatsApp deep link
// all move together.
export const PHONE_DIGITS = '0542206365';
export const PHONE_DISPLAY = '054-220-6365';
export const PHONE_TEL = `tel:${PHONE_DIGITS}`;
export const WHATSAPP_LINK = `https://wa.me/972${PHONE_DIGITS.substring(1)}`;

// Where the lead form in Hero.tsx delivers. LEAD_EMAIL is the FormSubmit recipient;
// LEAD_EMAIL_CC keeps the original address copied on every lead.
export const LEAD_EMAIL = 'assafbiton@gmail.com';
export const LEAD_EMAIL_CC = 'david82761@gmail.com';
export const LEAD_SUBJECT = 'עבודות צבע פנייה מהאתר';
