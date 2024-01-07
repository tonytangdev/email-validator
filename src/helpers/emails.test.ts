import { validateEmail } from "./emails";
import { faker } from "@faker-js/faker";

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
