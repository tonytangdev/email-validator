/**
 * Validate email
 * @param email email to validate
 * @returns true if email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  // explain the regex: https://stackoverflow.com/a/46181/12327981
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
