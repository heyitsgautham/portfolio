const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats a project's "MM.YYYY" start date for its gallery card,
 * as "September 01, 2025". Projects carry no day, so the first is shown.
 */
export function formatProjectDate(monthYear: string): string {
  const [month, year] = monthYear.split(".");
  return `${MONTHS[parseInt(month, 10) - 1]} 01, ${year}`;
}
