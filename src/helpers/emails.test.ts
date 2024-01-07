import { validateEmail, validateDomain } from "./emails";
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
    const invalidEmail = `${faker.word.noun()}@${faker.internet.domainSuffix()}${faker.string.alphanumeric()}.com`;
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
