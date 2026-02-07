// Utility function to get IST (Asia/Kolkata) date string in YYYY-MM-DD format
// Uses Intl.DateTimeFormat with formatToParts for reliable cross-environment timezone handling
export const getISTDateString = (date?: Date): string => {
  const d = date || new Date();
  
  // Use Intl.DateTimeFormat with formatToParts for reliable timezone conversion
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  const parts = formatter.formatToParts(d);
  
  // Extract year, month, day from parts array
  let year = '';
  let month = '';
  let day = '';
  
  for (const part of parts) {
    if (part.type === 'year') year = part.value;
    if (part.type === 'month') month = part.value;
    if (part.type === 'day') day = part.value;
  }
  
  return `${year}-${month}-${day}`;
};

// Backward compatibility wrapper
export const getLocalDateString = (date?: Date): string => {
  return getISTDateString(date);
};
