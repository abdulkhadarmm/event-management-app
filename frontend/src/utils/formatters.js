/**
 * Utility formatting functions for currency, dates, and text strings.
 */

/**
 * Format currency amount into INR (Indian Rupee ₹) currency string format.
 * @param {number} amount numeric amount
 * @returns {string} formatted currency string e.g. "₹2,50,000"
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date string or timestamp into human-readable date.
 * @param {string|Date} dateIso ISO date string or Date instance
 * @returns {string} formatted date string e.g. "July 27, 2026"
 */
export const formatDate = (dateIso) => {
  if (!dateIso) return '';
  const date = new Date(dateIso);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
