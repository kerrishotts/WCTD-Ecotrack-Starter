// Lab 3, step 4: check the contact form before "sending" it.
//
// A pure function: it gets the form's values and returns an object with
// one message per problem. No problems? It returns an empty object {}.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // something@something.something

export const MIN_MESSAGE_LENGTH = 20;

/**
 * @param {{ name: string, email: string, message: string }} values
 * @returns {{ name?: string, email?: string, message?: string }}
 */
export function validateContact({ name, email, message }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Your message needs at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}
