import { validateEmail, validateDomain, extractDomainName } from "./emails";
import { faker } from "@faker-js/faker";
import dns from "node:dns/promises";
jest.mock("node:dns/promises");

describe("validateEmail", () => {
  test("should return true for a valid email", () => {
    const validEmail = faker.internet.email();
    const isValid = validateEmail(validEmail);
    expect(isValid).toBe(true);
  });

  test("should return false for an invalid email with no @ sign and domainSuffix", () => {
    const invalidEmail = faker.word.words();
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  test("should return false for an invalid email with only @ sign and domainSuffix", () => {
    const invalidEmail = `@${faker.internet.domainSuffix()}.com`;
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  test("should return false for an invalid email with only @ sign", () => {
    const invalidEmail = `@`;
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  test("should return false for an invalid email with only domainSuffix", () => {
    const invalidEmail = `${faker.internet.domainSuffix()}.com`;
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  test("should return false for an invalid email with invalid characters", () => {
    const invalidEmail = `${faker.word.noun()}@${faker.internet.domainSuffix()}${faker.string.symbol()}.com`;
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });

  test("should return false for an invalid email without domainSuffix", () => {
    const invalidEmail = `${faker.word.noun()}@.com`;
    const isValid = validateEmail(invalidEmail);
    expect(isValid).toBe(false);
  });
});

describe("validateDomain", () => {
  test("should return true for a valid domain", async () => {
    (dns.lookup as jest.Mock).mockImplementation(
      () => new Promise((resolve) => resolve(null))
    );
    const validDomain = "google.com";
    const isValid = await validateDomain(validDomain);
    expect(isValid).toBe(true);
  });

  test("should return false for an invalid domain", async () => {
    (dns.lookup as jest.Mock).mockImplementation(
      () => new Promise((_, reject) => reject(null))
    );
    const invalidDomain = "invalid.com";
    const isValid = await validateDomain(invalidDomain);
    expect(isValid).toBe(false);
  });
  test("should not throw an error for an invalid domain", async () => {
    (dns.lookup as jest.Mock).mockImplementation(
      () => new Promise((_, reject) => reject(null))
    );
    const invalidDomain = "invalid.com";
    await expect(validateDomain(invalidDomain)).resolves.not.toThrow();
  });
});

describe("extractDomainName", () => {
  test("should return the domain name from a valid email", () => {
    const fakeDomain = faker.internet.domainName();
    const email = `${faker.internet.userName()}@${fakeDomain}`;
    const domain = extractDomainName(email);
    expect(domain).toBe(fakeDomain);
  });

  test("should return the domain name from an email with subdomain", () => {
    const email = "user@subdomain.domain.com";
    const domain = extractDomainName(email);
    expect(domain).toBe("subdomain.domain.com");
  });

  test("should return empty string for an email without domain", () => {
    const email = `${faker.internet.userName()}@`;
    const domain = extractDomainName(email);
    expect(domain).toBe("");
  });

  test("should return undefined for a string without @", () => {
    const email = faker.word.noun();
    const domain = extractDomainName(email);
    expect(domain).toBeUndefined();
  });
});
