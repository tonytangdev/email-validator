import dns from "node:dns/promises";

/**
 * Validate email
 * @param email email to validate
 * @returns true if email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  // explain the regex: https://stackoverflow.com/a/46181/12327981
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Validate domain
 * @param domain domain to validate
 * @returns true if domain is valid, false otherwise
 */
export async function validateDomain(domain: string): Promise<boolean> {
  let validDomain = false;
  try {
    await dns.lookup(domain);
    validDomain = true;
  } catch (error) {
    console.log(error);
  }
  return validDomain;
}
