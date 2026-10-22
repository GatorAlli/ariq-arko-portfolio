"use client";

import { portfolioClass } from "@/lib/portfolio-styles";


import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { email } from "@/lib/portfolio";

type FieldErrors = Partial<Record<"name" | "email" | "reason" | "message", string>>;
export function ContactForm() {
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [prepared, setPrepared] = useState(false);
  const [draft, setDraft] = useState("");
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
    <form noValidate onSubmit={submit} className={portfolioClass("contact-form")} aria-label="Contact Ariq">
      <div className={portfolioClass("field-group")}><Label htmlFor="name">Name <span aria-hidden="true">*</span></Label><Input id="name" name="name" autoComplete="name" placeholder="Your name" required maxLength={120} className={portfolioClass("portfolio-input")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name ? <p id="name-error" className={portfolioClass("field-error")} role="alert">{errors.name}</p> : null}</div>
      <div className={portfolioClass("field-group")}><Label htmlFor="email">Email <span aria-hidden="true">*</span></Label><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} className={portfolioClass("portfolio-input")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email ? <p id="email-error" className={portfolioClass("field-error")} role="alert">{errors.email}</p> : null}</div>
      <div className={portfolioClass("field-group")}><Label htmlFor="reason">Reason for contact <span aria-hidden="true">*</span></Label><Select value={reason} onValueChange={setReason} required><SelectTrigger id="reason" className={portfolioClass("portfolio-input w-full")} aria-invalid={!!errors.reason} aria-describedby={errors.reason ? "reason-error" : undefined}><SelectValue placeholder="Select a reason" /></SelectTrigger><SelectContent>{["Hiring", "Project", "Research collaboration", "Other"].map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>{errors.reason ? <p id="reason-error" className={portfolioClass("field-error")} role="alert">{errors.reason}</p> : null}</div>
      <div className={portfolioClass("field-group")}><Label htmlFor="message">Message <span aria-hidden="true">*</span></Label><Textarea id="message" name="message" placeholder="Tell me about your idea" required maxLength={5000} rows={6} className={portfolioClass("portfolio-input")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message ? <p id="message-error" className={portfolioClass("field-error")} role="alert">{errors.message}</p> : null}</div>
      <Button type="submit" className={portfolioClass("editorial-button lime-button w-fit")}>Prepare email <span aria-hidden="true">→</span></Button>
      <p className="text-xs text-muted-foreground">* Required fields. Opens your email app with a draft for you to send.</p>
      {prepared ? <div className={portfolioClass("form-confirmation")} role="status"><strong>Your email draft is ready.</strong><p>Finish sending it in your email app. If it didn’t open, <a href={draft} className="underline underline-offset-4">open the draft again</a> or email <a href={`mailto:${email}`} className="underline underline-offset-4">{email}</a>.</p></div> : null}
    </form>
  );
}
