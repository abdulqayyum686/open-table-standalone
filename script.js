// Configuration
const TIERS = [100, 200, 300];
const MONTHS_PER_YEAR = 12;
const ANIMATION_DURATION = 600; // milliseconds

// Get input element
const averageSpendInput = document.getElementById("averageSpend");

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCalculations();
  averageSpendInput.addEventListener("input", updateCalculations);
  averageSpendInput.addEventListener("change", updateCalculations);
});

/**
 * Update all revenue calculations when input changes
 */
function updateCalculations() {
  const averageSpend = parseFloat(averageSpendInput.value) || 0;

  TIERS.forEach((tier) => {
    // Calculate monthly and annual revenue
    const monthlyRevenue = tier * averageSpend;
    const annualRevenue = monthlyRevenue * MONTHS_PER_YEAR;

    // Format and update values with animation
    const monthlyFormatted = formatCurrency(monthlyRevenue);
    const annualFormatted = formatCurrency(annualRevenue);

    animateValue(
      document.querySelector(`[data-tier="${tier}-monthly"]`),
      monthlyFormatted
    );
    animateValue(
      document.querySelector(`[data-tier="${tier}-annual"]`),
      annualFormatted
    );
  });
}

/**
 * Format number as GBP currency
 * @param {number} value - The value to format
 * @returns {string} - Formatted currency string
 */
function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Animate value change with rolling effect
 * @param {HTMLElement} element - The element to animate
 * @param {string} newValue - The new value to display
 */
function animateValue(element, newValue) {
  // If already the same value, skip animation
  if (element.textContent === newValue) {
    return;
  }

  // Add animation class
  element.style.opacity = "0.6";
  element.style.transform = "scale(0.95)";
  element.style.transition = "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";

  // Update value after brief delay for smooth transition
  setTimeout(() => {
    element.textContent = newValue;
    element.style.opacity = "1";
    element.style.transform = "scale(1)";
  }, 150);
}

/**
 * Handle contact button click
 */
function handleContactClick() {
  // You can replace this with your actual contact form or redirect
  window.open('https://www.opentable.co.uk/restaurant-solutions/products/reservation-management/#form', '_blank');
}

