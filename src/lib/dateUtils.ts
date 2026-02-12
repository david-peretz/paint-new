// בדיקה האם כרגע שבת
export const isShabbat = (): boolean => {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  
  // בדיקה אם יום שבת (6)
  if (day === 6) {
    return true;
  }
  
  // בדיקה אם יום שישי אחרי כניסת שבת (בערך 17:00)
  if (day === 5 && hours >= 17) {
    return true;
  }
  
  // בדיקה אם מוצאי שבת לפני צאת השבת (בערך 18:00)
  if (day === 0 && hours < 18) {
    return true;
  }
  
  return false;
};