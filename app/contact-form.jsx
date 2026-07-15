"use client";

import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";

import { getContactEmail } from "./contact-email";

const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "";

export default function ContactForm({ copy }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const project = formData.get("project")?.toString().trim() || "";

    if (!name || !email || !project) {
      setStatus("error");
      setMessage(copy.required);
      return;
    }

    if (!formEndpoint) {
      const contactEmail = getContactEmail();
      const subject = encodeURIComponent(copy.subject.replace("{name}", name));
      const body = encodeURIComponent(
        copy.mailBody
          .replace("{name}", name)
          .replace("{email}", email)
          .replace("{project}", project)
      );
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setStatus("idle");
      setMessage("");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Contact provider rejected the submission.");
      }

      form.reset();
      setStatus("sent");
      setMessage(copy.sent);
    } catch {
      const contactEmail = getContactEmail();
      setStatus("error");
      setMessage(copy.fallback.replace("{email}", contactEmail));
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-pair">
        <label>
          <span>{copy.name}</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>{copy.email}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <label>
        <span>{copy.message}</span>
        <textarea
          name="project"
          rows="6"
          placeholder={copy.placeholder}
          required
        />
      </label>

      <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" hidden />
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <LoaderCircle aria-hidden="true" className="button-loader" size={16} strokeWidth={1.5} />
        ) : (
          <Send aria-hidden="true" size={16} strokeWidth={1.5} />
        )}
        <span>{status === "sending" ? copy.sending : copy.send}</span>
      </button>
      {message ? (
        <p className={`form-status ${status === "error" ? "error" : "success"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
