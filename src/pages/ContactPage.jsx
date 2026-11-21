// Contact: a validated form. The checking rules live in validation.js
// (a pure function you can test on its own); this page shows the results.

import { useState } from "react";
import { validateContact, MIN_MESSAGE_LENGTH } from "../validation.js";
import SocialLinks from "../components/SocialLinks.jsx";

const EMPTY = { name: "", email: "", message: "" };

export default function ContactPage() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sentTo, setSentTo] = useState(null);

  // One change handler for every field, using the input's name.
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSentTo(values.name.trim());
      setValues(EMPTY);
    }
  }

  if (sentTo) {
    return (
      <section className="card stack-sm" role="status">
        <title>Thanks! · EcoTrack</title>
        <h2>Thanks, {sentTo}!</h2>
        <p>We got your message and we’ll reply soon.</p>
        <p className="muted small">(Demo version: messages aren’t actually sent anywhere yet.)</p>
        <button type="button" onClick={() => setSentTo(null)}>
          Send another message
        </button>
      </section>
    );
  }

  const messageLength = values.message.trim().length;

  return (
    <div className="contact-layout">
      <title>Contact · EcoTrack</title>
      <form className="card contact-form" onSubmit={handleSubmit} noValidate>
        <h2>Contact us</h2>

        <Field label="Name" name="name" value={values.name} error={errors.name} onChange={handleChange} autoComplete="name" />
        <Field label="Email" name="email" type="email" value={values.email} error={errors.email} onChange={handleChange} autoComplete="email" />
        <Field label="Message" name="message" multiline value={values.message} error={errors.message} onChange={handleChange}
          hint={`${messageLength} / ${MIN_MESSAGE_LENGTH} characters minimum`} />

        <button type="submit">Send message</button>
      </form>

      <section className="card">
        <h2>Other ways to reach us</h2>
        <p>Share EcoTrack with a friend, or follow along as we build it.</p>
        <SocialLinks />
      </section>
    </div>
  );
}

// A label, an input (or textarea), and its error message, wired together
// so screen readers announce the error with the field.
function Field({ label, name, error, hint, multiline, ...inputProps }) {
  const id = `contact-${name}`;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  const Input = multiline ? "textarea" : "input";

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Input id={id} name={name} aria-invalid={error ? true : undefined} aria-describedby={describedBy} rows={multiline ? 5 : undefined} {...inputProps} />
      {hint && <p id={`${id}-hint`} className="muted small">{hint}</p>}
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  );
}
