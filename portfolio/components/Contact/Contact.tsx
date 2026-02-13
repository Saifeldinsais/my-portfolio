"use client";

import { useMemo, useState } from "react";
import styles from "./Contact.module.css";
import {
  FaLinkedin,
  FaGithub,
  FaKaggle,
  FaCopy,
  FaCheck,
  FaEnvelope,
} from "react-icons/fa";

type FormState = {
  name: string;
  email: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Contact() {
  
  const CONTACT_EMAIL = "saifeldinsais@gmail.com";

  const LINKS = useMemo(
    () => ({
      linkedin: "https://www.linkedin.com/in/saif-sais/",
      github: "https://github.com/Saifeldinsais",
      kaggle: "https://www.kaggle.com/saifsais",
    }),
    []
  );

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const [copied, setCopied] = useState(false);

  const errors = {
    name: form.name.trim().length < 2 ? "Please enter your name." : "",
    email: !isValidEmail(form.email) ? "Please enter a valid email." : "",
    message:
      form.message.trim().length < 10
        ? "Message should be at least 10 characters."
        : "",
  };

  const isFormValid = !errors.name && !errors.email && !errors.message;

  function onChange<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  function buildMailto() {
    const subject = encodeURIComponent(
      `Portfolio Contact — ${form.name || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  function handleSend() {
    setTouched({ name: true, email: true, message: true });
    if (!isFormValid) return;

    window.location.href = buildMailto();
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.subtitle}>
            Want to collaborate or ask about a project? Send a message and I’ll reply as soon as possible.
          </p>
        </div>

        <div className={styles.grid}>
          {/* LEFT CARD */}
          <div className={styles.infoCard}>
            <div className={styles.badge}>Let’s connect</div>

            <h3 className={styles.infoTitle}>Reach me directly</h3>
            <p className={styles.infoText}>
              You can contact me via email or connect through my professional profiles.
            </p>

            <div className={styles.row}>
              <div className={styles.rowLeft}>
                <span className={styles.rowLabel}>Email</span>
                <span className={styles.rowValue}>{CONTACT_EMAIL}</span>
              </div>

              <button
                type="button"
                className={styles.copyBtn}
                onClick={copyEmail}
              >
                {copied ? <FaCheck /> : <FaCopy />}
              </button>
            </div>

            <div className={styles.social}>
              <a className={styles.socialBtn} href={LINKS.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin /> LinkedIn
              </a>

              <a className={styles.socialBtn} href={LINKS.github} target="_blank" rel="noreferrer">
                <FaGithub /> GitHub
              </a>

              <a className={styles.socialBtn} href={LINKS.kaggle} target="_blank" rel="noreferrer">
                <FaKaggle /> Kaggle
              </a>
            </div>

            <div className={styles.note}>
              <FaEnvelope />
              <span>
                This form opens your email client (no backend required).
              </span>
            </div>
          </div>

          {/* FORM */}
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Send a message</h3>

            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  placeholder="Your name"
                />
                {touched.name && errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="you@email.com"
                />
                {touched.email && errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea
                  className={styles.textarea}
                  value={form.message}
                  onChange={(e) => onChange("message", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  placeholder="Write your message..."
                />
                {touched.message && errors.message && (
                  <span className={styles.error}>{errors.message}</span>
                )}
              </div>

              <button
                type="button"
                className={`${styles.sendBtn} ${!isFormValid ? styles.sendDisabled : ""}`}
                onClick={handleSend}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
