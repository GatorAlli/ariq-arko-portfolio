"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { email } from "@/lib/portfolio";

type FieldErrors = Partial<Record<"name" | "email" | "reason" | "message", string>>;

function resizeMessage(field: HTMLTextAreaElement) {
  if (CSS.supports("field-sizing", "content")) {
    field.style.removeProperty("height");
    return;
  }
  field.style.height = "auto";
  const style = window.getComputedStyle(field);
  const borders = (parseFloat(style.borderTopWidth) || 0) + (parseFloat(style.borderBottomWidth) || 0);
  field.style.height = `${Math.ceil(field.scrollHeight + borders)}px`;
}

export function ContactForm() {
  const messageField = useRef<HTMLTextAreaElement>(null);
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [prepared, setPrepared] = useState(false);
  const [draft, setDraft] = useState("");
  useLayoutEffect(() => {
    const field = messageField.current;
    if (!field) return;
    resizeMessage(field);
    if (CSS.supports("field-sizing", "content")) return;
    let disposed = false;
    let previousWidth = field.clientWidth;
    const resize = () => { if (!disposed) resizeMessage(field); };
    const observer = new ResizeObserver(() => {
      if (field.clientWidth === previousWidth) return;
      previousWidth = field.clientWidth;
      resize();
    });
    observer.observe(field);
    window.addEventListener("resize", resize);
    document.fonts.ready.then(resize);
    document.fonts.addEventListener("loadingdone", resize);
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.fonts.removeEventListener("loadingdone", resize);
    };
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const address = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!address || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) nextErrors.email = "Please enter a valid email address.";
    if (!reason) nextErrors.reason = "Please choose a reason for getting in touch.";
    if (!message) nextErrors.message = "Please tell me a little about your idea.";
    setErrors(nextErrors);
    setPrepared(false);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"], [id="${first}"]`)?.focus();
      return;
    }
    const subject = encodeURIComponent(`${reason} inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Ariq,\n\n${message}\n\n${name}\n${address}`);
    const href = `mailto:${email}?subject=${subject}&body=${body}`;
    setDraft(href);
    setPrepared(true);
    window.location.href = href;
  }
  return (
    <form noValidate onSubmit={submit} className="contact-composer" aria-labelledby="message-heading">
      <h2 id="message-heading">Your message</h2>
      <div className="contact-field-pair">
        <div className="contact-field"><label htmlFor="name">Name <span aria-hidden="true">*</span></label><input id="name" name="name" autoComplete="name" placeholder="Your name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name ? <p id="name-error" className="contact-error" role="alert">{errors.name}</p> : null}</div>
        <div className="contact-field"><label htmlFor="email">Email <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email ? <p id="email-error" className="contact-error" role="alert">{errors.email}</p> : null}</div>
      </div>
      <fieldset className="contact-topic" aria-describedby={errors.reason ? "reason-error" : undefined}>
        <legend>What’s it about? <span aria-hidden="true">*</span></legend>
        <div className="contact-topic-options">{["Project", "Hiring", "Research collaboration", "Other"].map(value => <label key={value}><input type="radio" name="reason" id={value === "Project" ? "reason" : undefined} value={value} checked={reason === value} onChange={() => setReason(value)} required /><span>{value}</span></label>)}</div>
        {errors.reason ? <p id="reason-error" className="contact-error" role="alert">{errors.reason}</p> : null}
      </fieldset>
      <div className="contact-field"><label htmlFor="message">Message <span aria-hidden="true">*</span></label><textarea ref={messageField} id="message" name="message" placeholder="A little about your idea, project, or opportunity…" required maxLength={5000} rows={1} onInput={event => resizeMessage(event.currentTarget)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message ? <p id="message-error" className="contact-error" role="alert">{errors.message}</p> : null}</div>
      <div className="contact-send"><button type="submit">Prepare email</button></div>
      {prepared ? <div className="contact-confirmation" role="status"><strong>Your email draft is ready.</strong><p>Finish sending it in your email app. If it didn’t open, <a href={draft}>open the draft again</a> or email <a href={`mailto:${email}`}>{email}</a>.</p></div> : null}
    </form>
  );
}
