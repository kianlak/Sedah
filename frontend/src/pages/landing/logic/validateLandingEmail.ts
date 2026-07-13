import { EMAIL_DOMAIN_PATTERN, EMAIL_LOCAL_PART_PATTERN } from "../constants/landingEmailValidation";

export function validateLandingEmail(email: string): string | null {
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    return "Enter an email address.";
  }

  if (normalizedEmail.includes(" ")) {
    return "Email addresses cannot contain spaces.";
  }

  const emailParts = normalizedEmail.split("@");

  if (emailParts.length !== 2) {
    return "Enter a valid email address.";
  }

  const [localPart, domain] = emailParts;

  if (!localPart || !domain) {
    return "Enter a valid email address.";
  }

  if (localPart.length > 64 || normalizedEmail.length > 254) {
    return "Enter a valid email address.";
  }

  if (!EMAIL_LOCAL_PART_PATTERN.test(localPart) || !EMAIL_DOMAIN_PATTERN.test(domain)) {
    return "Enter a valid email address.";
  }

  return null;
}
