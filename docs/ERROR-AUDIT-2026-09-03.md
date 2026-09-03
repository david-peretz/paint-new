# דוח שגיאות — אתר "צביעה מקצועית"

**תאריך:** 2026-09-03
**קומיט:** `eef784d`
**היקף:** שגיאות בלבד (באגים, קישורים שבורים, קבצים חסרים, קוד לא תקין). **לא** שיפורים/עיצוב.
**מצב:** כל 16 הסעיפים **תוקנו ואומתו** ב-2026-09-03. `tsc` נקי, `eslint` נקי, `vite build` נקי מאזהרות.

שיטת הבדיקה: `tsc --noEmit`, `eslint .`, `vite build`, השוואת עוגנים (`href="#..."`) מול `id`, השוואת נכסים מקומיים מול `public/`, בדיקת HTTP לכל תמונות ה-Unsplash, קריאת כל 794 שורות המקור.

---

## חמור (שובר פונקציונליות ללקוח) — ✅ תוקן

### 1. ✅ שלוש כפתורי "צור קשר / השאר פרטים" מובילים לשום מקום
`href="#contact"` מופיע 3 פעמים, אבל **אין** אלמנט עם `id="contact"` באתר.
הטופס נמצא תחת `id="contact-form"`.

- [Header.tsx:47](src/components/Header.tsx#L47) — תפריט דסקטופ
- [Header.tsx:80](src/components/Header.tsx#L80) — תפריט מובייל
- [Pricing.tsx:158](src/components/Pricing.tsx#L158) — ה-CTA הראשי "השאר פרטים עכשיו"

**תוצאה:** לחיצה לא גוללת לטופס. זה מסלול ההמרה המרכזי של האתר.
**תוקן:** שלושת הקישורים שונו ל-`#contact-form`. בנוסף נוסף `scroll-mt-28` לעוטף הטופס ב-[Hero.tsx:84](src/components/Hero.tsx#L84), אחרת הגלילה מסתיימת מתחת ל-header הקבוע והכותרת "השאירו פרטים ונחזור אליכם" מוסתרת.
**אימות:** כל 5 העוגנים (`#about`, `#catalog`, `#contact-form`, `#pricing`, `#services`) מצביעים ל-`id` קיים.

### 2. ✅ תמונת הרקע של המחירון חסרה
[Pricing.tsx:52](src/components/Pricing.tsx#L52) מפנה ל-`url("/painter-bg.jpg")`, אבל `public/` מכיל רק `cat1-5.png`, `image1.png`, `image2.png`.

אומת מול שרת הפיתוח (`localhost:5173`):
```
GET /painter-bg.jpg  ->  200 OK   Content-Type: text/html   Content-Length: 1581
GET /cat1.png        ->  200 OK   Content-Type: image/png   Content-Length: 2502791
```
ה-200 מטעה — זהו ה-SPA fallback של Vite שמחזיר את `index.html` כ-`text/html`. הדפדפן מקבל HTML במקום תמונה.
בבנייה לפרודקשן זה 404 אמיתי: `dist/painter-bg.jpg` לא קיים.

**תוצאה:** סקשן המחירון מוצג בלי הרקע המיועד, ובקשה מבוזבזת בכל טעינת עמוד.

**תוקן:** הוחלף ל-`/image2.png` — נכס קיים, הקטן מבין השבעה (1.4MB). **הנחה:** מאחר שהתמונה המקורית מעולם לא הועלתה, לא ניתן היה לשחזר את הכוונה; קומיט `5af92bd` ("use existing image as background") מרמז שממילא נועדה תמונה קיימת, וה-overlay `bg-white/85` מסתיר כמעט את כולה. אם יש תמונה מיועדת — להעלות אותה ל-`public/painter-bg.jpg` ולהחזיר שורה אחת ב-[Pricing.tsx:52](src/components/Pricing.tsx#L52).
**אימות:** כל 7 הנכסים המקומיים שמוזכרים ב-`src/` קיימים ב-`dist/`.

### 3. ✅ הגופנים העבריים (Rubik / Heebo) לא נטענים בכלל בפרודקשן
[index.css:5](src/index.css#L5) — ה-`@import` של Google Fonts מופיע **אחרי** `@tailwind base/components/utilities`. לפי מפרט CSS, `@import` חייב להקדים כל כלל אחר.

הבנייה מזהה זאת ומשמיטה את השורה:
```
[vite:css] @import must precede all other statements
```
אימות בשני הכיוונים:
- פרודקשן: `grep -bo "@import" dist/assets/*.css` → **אין תוצאות**
- פיתוח חי: `curl localhost:5173/src/index.css | grep -c fonts.googleapis.com` → **0**

ה-import נמחק מה-CSS גם בפיתוח וגם בפרודקשן.

**תוצאה:** `font-family: 'Rubik','Heebo',sans-serif` (ב-[index.css:15](src/index.css#L15) וב-[tailwind.config.js](tailwind.config.js)) נופל לגופן ברירת המחדל של המערכת. כל הטיפוגרפיה בעברית שונה ממה שתוכנן.
**תוקן:** שורת ה-`@import` הועברה לשורה 1, לפני ה-`@tailwind`.
**אימות:** אזהרת הבנייה נעלמה; `head -c 130 dist/assets/*.css` מראה את ה-`@import` כהצהרה הראשונה; ה-CSS גדל 23.23 → 23.40 kB (ה-import נשמר); שרת הפיתוח מגיש אותו גם כן.

### 4. ✅ לחיצה על "התקשר עכשיו" נכשלת כשיש חוסם פרסומות
[index.html:19-33](index.html#L19-L33) — `gtag_report_conversion` מנווט ל-`tel:` **רק** מתוך `event_callback`:
```js
var callback = function () { window.location = url; };
gtag('event','conversion',{ ..., 'event_callback': callback });
```
ה-callback מופעל על ידי `gtag.js` מ-googletagmanager.com. אם הסקריפט חסום (חוסם פרסומות, רשת כושלת) — הוא לעולם לא נקרא.

בשני מקומות נעשה `e.preventDefault()` לפני הקריאה, כך שגם ניווט ברירת המחדל מבוטל:
- [Header.tsx:7-10](src/components/Header.tsx#L7-L10)
- [Pricing.tsx:14-17](src/components/Pricing.tsx#L14-L17)

**תוצאה:** אצל משתמש עם חוסם פרסומות, לחיצה על כפתור הטלפון **לא עושה כלום**. הטלפון לא נפתח.
**תוקן:** נוסף `setTimeout(callback, 1000)` לצד ה-`event_callback`, עם דגל `navigated` שמונע ניווט כפול. כשה-tracking עובד ה-callback מגיע תוך ~200ms וה-timeout לא מורגש; כשהוא חסום — הטלפון נפתח אחרי שנייה במקום בכלל לא.
**אימות:** `setTimeout(callback, 1000)` ו-`navigated` מופיעים ב-`dist/index.html` שנבנה.

---

## בינוני — ✅ תוקן

### 5. ✅ `<html lang="en">` באתר עברי RTL
[index.html:2](index.html#L2) — `lang="en"`, ואין `dir="rtl"` על ה-`<html>` (רק על ה-`<div>` הפנימי ב-[App.tsx:13](src/App.tsx#L13)).
**תוצאה:** קוראי מסך מקריאים עברית במנוע אנגלי; חלוקת שורות/מקפים שגויה; אות שלילי ל-SEO.
**תיקון:** `<html lang="he" dir="rtl">`.

### 6. ✅ `filter` על `documentElement` שובר את ה-header הקבוע
[AccessibilityWidget.tsx:37](src/components/AccessibilityWidget.tsx#L37) מוסיף `.high-contrast` ל-`<html>`, ו-[index.css:63-65](src/index.css#L63-L65) מחיל `filter: contrast(150%)`.

לפי מפרט CSS Filter Effects, אלמנט עם `filter` שאינו `none` הופך ל-containing block עבור צאצאים ב-`position: fixed`. כלומר ה-header (`fixed w-full top-0`, [Header.tsx:16](src/components/Header.tsx#L16)) וּווידג'ט הנגישות עצמו (`fixed bottom-4 left-4`) מפסיקים להיות מקובעים למסך.

**תוצאה:** במצב ניגודיות גבוהה — פיצ'ר נגישות — ה-header ווידג'ט הנגישות נגללים ונעלמים.
**תיקון:** להחיל את הפילטר על עוטף תוכן פנימי בלבד, או להשתמש בהחלפת צבעים (משתני CSS) במקום `filter`.

### 7. ✅ favicon חסר
[index.html:5](index.html#L5) מפנה ל-`/vite.svg` — הקובץ לא קיים ב-`public/` ולא ב-`dist/`.
כמו סעיף 2, שרת הפיתוח מחזיר `200` עם `text/html` (SPA fallback); בפרודקשן זה 404.
**תוצאה:** לאתר אין אייקון בלשונית הדפדפן.

### 8. ✅ כפתור התפריט במובייל בלי שם נגיש
[Header.tsx:73](src/components/Header.tsx#L73) — `<button className="md:hidden">` עם אייקון בלבד, בלי `aria-label` ובלי `aria-expanded`.
**תוצאה:** קורא מסך מכריז "button" בלי שום מידע.

בנוסף, [AccessibilityWidget.tsx:112](src/components/AccessibilityWidget.tsx#L112) — ה-`aria-label` תמיד "פתח תפריט נגישות", גם כשהתפריט פתוח, ואין `aria-expanded`.

### 9. ✅ תפריט המובייל לא נסגר אחרי בחירת קישור
[Header.tsx:78-86](src/components/Header.tsx#L78-L86) — לקישורים אין `onClick` שמאפס `isOpen`.
**תוצאה:** אחרי בחירת "שירותים" התפריט נשאר פתוח ומסתיר את התוכן שאליו נגללנו.

### 10. ✅ `.env` עם מפתחות Supabase מקומם ב-git
`git ls-files` מאשר ש-`.env` עוקב, ו-[.gitignore](.gitignore) לא מכיל `.env`.
מדובר ב-anon key (מיועד לצד לקוח) ולא ב-service key, אז הנזק מוגבל — אבל הדפוס שגוי וה-URL של הפרויקט חשוף.
**תיקון:** להוסיף `.env` ל-`.gitignore`, `git rm --cached .env`, ולהוסיף `.env.example`.

---

## קל — ✅ תוקן

### 11. ✅ תוכן: "לא כולל מע\"מ" מופיע כפריט תחת "מה כלול במחיר?"
[Pricing.tsx:42](src/components/Pricing.tsx#L42) — הפריט נמצא במערך `includes`, כלומר מוצג עם ✓ ירוק תחת הכותרת "מה כלול במחיר?". סתירה לוגית.
בנוסף הוא מוצג פעמיים: גם שם וגם בהערת השוליים [Pricing.tsx:139](src/components/Pricing.tsx#L139).

### 12. ✅ שגיאות TypeScript בבנייה נקייה
`tsc --noEmit -p tsconfig.app.json` — 7 שגיאות `TS6133`:
- `React` מיובא ולא בשימוש: `App.tsx`, `About.tsx`, `AccessibilityWidget.tsx`, `Catalog.tsx`, `Footer.tsx`, `Services.tsx`
- `Eye` מיובא ולא בשימוש: [AccessibilityWidget.tsx:3](src/components/AccessibilityWidget.tsx#L3)

`vite build` לא מריץ בדיקת טיפוסים, ולכן הבנייה עוברת בכל זאת — אבל ה-repo לא עובר קומפילציה נקייה.

### 13. ✅ שגיאות ESLint
```
src/components/AccessibilityWidget.tsx  3:3   'Eye' is defined but never used
src/components/Hero.tsx                48:14  'error' is defined but never used
```
[Hero.tsx:48](src/components/Hero.tsx#L48) — `catch (error)` תופס את השגיאה ולא מדווח עליה בכלל (לא `console.error`, לא דיווח). כשל שליחה נבלע.

### 14. ✅ BOM בקובץ Pricing.tsx
`src/components/Pricing.tsx` מתחיל ב-`EF BB BF` (UTF-8 BOM) — הקובץ היחיד ב-`src/` עם BOM. מוסיף תו נסתר לפני `import` ומייצר diff-ים רועשים.

### 15. ✅ `pattern="[0-9]{10}"` בשדה הטלפון
[Hero.tsx:111](src/components/Hero.tsx#L111) — דורש בדיוק 10 ספרות ללא מקפים.
**תוצאה:** משתמש שמקליד `054-305-1679` (הפורמט שמוצג לו באתר עצמו) נדחה; קווי נייח בן 9 ספרות נדחה.

### 16. ✅ Supabase מותקן ומוגר — ולא בשימוש
`@supabase/supabase-js` ב-`package.json`, מיגרציה מוכנה ב-`supabase/migrations/`, ומשתני סביבה — אבל `grep -rn supabase src/` מחזיר **אפס** תוצאות. הטופס שולח ל-`formsubmit.co` ([Hero.tsx:28](src/components/Hero.tsx#L28)).
**תוצאה:** תלות מיותרת ב-bundle ותשתית לא מחוברת. פניות לא נשמרות בשום DB.

---

## מה נבדק ונמצא תקין

- כל 5 תמונות ה-Unsplash: HTTP 200
- כל 7 הנכסים המקומיים (`cat1-5.png`, `image1.png`, `image2.png`) קיימים
- `id` ל-`about` / `catalog` / `pricing` / `services` — מוגדרים ותואמים לעוגנים
- קישור וואטסאפ: `https://wa.me/972543051679` — תקין
- חשבון המחירים (`furnishedPrice - totalAdditions`) עקבי בטבלת המובייל ובטבלת הדסקטופ
- אין `id` כפולים, אין `key` חסר ב-map, אין hook מותנה
- מיגרציית SQL: RLS מופעל, מדיניות INSERT/SELECT תקינות
- `vite build` עובר (עם אזהרת ה-`@import` מסעיף 3)
- `npm install` — exit 0, אין תלויות חסרות, אין peer conflicts
- `npm run dev` — עולה ב-162ms על פורט 5173
- כל 9 מודולי הקומפוננטות נטענים משרת הפיתוח ב-200 בלי שגיאת טרנספורמציה
- אין שגיאות ריצה בטעינה: `/`, `/src/main.tsx`, `/src/index.css` — כולם 200

## הערה על ביצועים (לא שגיאה — לבקשתך לא נכלל בדוח)
7 קבצי ה-PNG ב-`public/` שוקלים **15.6MB** יחד (2-2.6MB לתמונה), ומוגשים בגודל מלא.

---

## התיקונים לסעיפים 5-16

**5.** `<html lang="he" dir="rtl">`. ה-`dir="rtl"` על עוטף האפליקציה נשאר — עודף אך לא מזיק.

**6.** ה-class `high-contrast` עדיין מתחיל על `documentElement`, אבל ה-CSS משנה מ-`.high-contrast` ל-`.high-contrast #app-root > *` (נוסף `id="app-root"` ב-[App.tsx:12](src/App.tsx#L12)). כך ה-`filter` יושב על **הצאצאים** של השורש ולא על אב שלהם. `filter` על אלמנט הופך אותו ל-containing block עבור צאצאי `position:fixed` שלו — אבל האלמנט עצמו נשאר מקובע. לכן ה-header ווידג'ט הנגישות מקבלים את הפילטר וממשיכים להיות fixed.

**7.** נוצר `public/favicon.svg` — אייקון מכחול (אותו נתיב lucide `Paintbrush` שבשימוש ב-Header) על רקע `#2563eb`. אומת כ-XML תקין ונשלח ל-`dist/`.

**8.** כפתור התפריט במובייל קיבל `aria-label` דינמי, `aria-expanded` ו-`aria-controls="mobile-menu"`. ווידג'ט הנגישות קיבל `aria-label` שמשתנה לפי המצב, `aria-expanded` ו-`aria-controls="accessibility-panel"`.

**9.** קישורי המובייל עברו ל-`navLinks.map` עם `onClick={() => setIsOpen(false)}`. **שני התפריטים** (מובייל ודסקטופ) נבנים כעת מאותו מערך — הכפילות היא בדיוק מה שאיפשר לסעיף 1 לקרות.

**10.** `.env` הוסר מהמעקב (`git rm --cached`, הקובץ נשאר על הדיסק), נוסף ל-`.gitignore` יחד עם `.env.local`, `.env.*.local` ו-`vite.config.ts.timestamp-*.mjs` (שהופקדו ונמחקו 3 פעמים בהיסטוריה). נוצר `.env.example`.
**חשוב:** ה-key נשאר בהיסטוריית ה-git. הוא anon key שנועד לצד לקוח, ולכן אין דחיפות — אבל אם תרצה לנקות אותו לגמרי צריך rewrite של ההיסטוריה או רוטציה של המפתח ב-Supabase.

**11.** `'לא כולל מע"מ'` הוסר ממערך `includes`. הוא נשאר בהערת השוליים, כלומר מוצג פעם אחת ובמקום הנכון.

**12.** הוסר `import React` מ-5 קבצים (`tsconfig` מוגדר `"jsx": "react-jsx"`, כך שהוא לא נדרש). `Header.tsx` ו-`Hero.tsx` שומרים עליו כי הם משתמשים ב-`React.MouseEvent` / `React.FormEvent` / `React.ChangeEvent`. הוסר `Eye` הלא-מנוצל.

**13.** `catch (error)` מדווח כעת `console.error('Lead form submission failed:', error)` לפני הצגת ההודעה — כשל שליחה מפסיק להיעלם בשקט.

**14.** ה-BOM הוסר מ-`Pricing.tsx`. אין BOM באף קובץ ב-`src/`.

**15.** ה-pattern שונה ל-`[0-9+() -]{9,20}` (מקבל את `054-305-1679` שהאתר עצמו מציג, וגם קווים נייחים בני 9 ספרות), ונוסף `inputMode="tel"`. מכיוון ש-pattern של HTML לא יכול לספור ספרות תוך התעלמות ממפרידים, נוספה בדיקה ב-`handleSubmit`: `phone.replace(/[^0-9]/g,'')` חייב להיות 9-10 ספרות, אחרת מוצגת הודעת שגיאה חדשה (`invalid-phone`). כל שינוי בשדות מאפס status תקוע.

**16.** `@supabase/supabase-js` הוסר מ-`package.json` (`npm uninstall`) לאחר אימות של אפס imports ב-`src/` וב-`index.html`.
**החלטה שנותרה לך:** המיגרציה `supabase/migrations/` ומשתני הסביבה נשמרו במקום. **פניות עדיין לא נשמרות בשום DB** — הן נשלחות רק במייל דרך `formsubmit.co`. חיבור הטופס ל-Supabase הוא תוספת פונקציונליות, לא תיקון שגיאה, ולכן לא עשיתי אותה. אם תרצה — `npm i @supabase/supabase-js` מחזיר את התלות.

---

## מצב סופי (אומת)

```
npx tsc --noEmit -p tsconfig.app.json   ->  0 שגיאות  (היו 7)
npx eslint .                            ->  0 שגיאות  (היו 2)
npm run build                           ->  עובר, 0 אזהרות  (הייתה אזהרת @import)
```
- 5 העוגנים מצביעים ל-`id` קיים (היו 3 מתים)
- 8 הנכסים המקומיים המוזכרים קיימים ב-`dist/` (היו 2 חסרים)
- אין BOM באף קובץ ב-`src/`
- `@import` הוא ההצהרה הראשונה ב-CSS הבנוי; Rubik/Heebo נטענים
- 13 מודולים נטענים משרת הפיתוח ב-200 ללא שגיאה; אפס שגיאות ביומן ה-HMR
