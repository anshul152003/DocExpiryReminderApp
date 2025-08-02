// src/utils/dateUtils.js

export const getDaysLeft = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);

  // Clear time for accurate full-day difference
  now.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
