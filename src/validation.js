// Lab 3, step 4: check the contact form before "sending" it.
//
// A pure function: it gets the form's values and returns an object with
// one message per problem. No problems? It returns an empty object {}.
//
// TODO (Lab step 4): add a message for each rule that's broken:
//   name     empty (after trimming spaces)      → "Please enter your name."
//   email    doesn't match EMAIL_PATTERN         → "Please enter a valid email address."
//   message  shorter than MIN_MESSAGE_LENGTH     → "Your message needs at least 20 characters."
//            (after trimming)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // something@something.something

export const MIN_MESSAGE_LENGTH = 20;

/**
 * @param {{ name: string, email: string, message: string }} values
 * @returns {{ name?: string, email?: string, message?: string }}
 */
export function validateContact({ name, email, message }) {
  const errors = {};

  // TODO: check each field and add to errors

  return errors;
}
