"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch {
      // Silent fail for now
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: 400 }}>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 400,
              textAlign: "center",
              gap: 20,
            }}
          >
            {/* Animated checkmark */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              style={{ overflow: "visible" }}
            >
              <circle
                cx="32"
                cy="32"
                r="30"
                stroke="#c8ff00"
                strokeWidth="2"
                fill="none"
                style={{
                  strokeDasharray: 188,
                  strokeDashoffset: 188,
                  animation: "draw-circle 0.6s ease-out 0.2s forwards",
                }}
              />
              <path
                d="M20 32L28 40L44 24"
                stroke="#c8ff00"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{
                  strokeDasharray: 40,
                  strokeDashoffset: 40,
                  animation: "draw-check 0.4s ease-out 0.7s forwards",
                }}
              />
            </svg>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "#f5f4f0",
                maxWidth: 320,
              }}
            >
              Message sent! I&rsquo;ll be in touch within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 28 }}
          >
            <FloatField
              label="Name"
              type="text"
              value={form.name}
              onChange={(v) => update("name", v)}
              required
            />

            <FloatField
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => update("email", v)}
              required
            />

            {/* Project type select */}
            <div style={{ position: "relative" }}>
              <label style={selectLabelStyle}>Project Type</label>
              <select
                value={form.projectType}
                onChange={(e) => update("projectType", e.target.value)}
                required
                style={selectStyle}
              >
                <option value="" disabled>
                  Select a type
                </option>
                <option value="social-media">Social Media</option>
                <option value="video">Video</option>
                <option value="film">Film</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Budget select */}
            <div style={{ position: "relative" }}>
              <label style={selectLabelStyle}>Budget Range</label>
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                style={selectStyle}
              >
                <option value="" disabled>
                  Select a range
                </option>
                <option value="under-500k">Under ₦500K / $500</option>
                <option value="500k-2m">₦500K – ₦2M / $500 – $2K</option>
                <option value="2m-5m">₦2M – ₦5M / $2K – $5K</option>
                <option value="5m-plus">₦5M+ / $5K+</option>
                <option value="discuss">Let&rsquo;s discuss</option>
              </select>
            </div>

            {/* Message */}
            <FloatField
              label="Message"
              type="textarea"
              value={form.message}
              onChange={(v) => update("message", v)}
              required
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "16px 0",
                borderRadius: 4,
                border: "1px solid rgba(200,255,0,0.4)",
                backgroundColor: "transparent",
                color: "#c8ff00",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "none",
                transition: "background-color 0.3s, color 0.3s",
                opacity: submitting ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#c8ff00";
                  (e.currentTarget as HTMLElement).style.color = "#0a0a0a";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "transparent";
                (e.currentTarget as HTMLElement).style.color = "#c8ff00";
              }}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes draw-circle {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw-check {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ---- Float-label input ---- */
function FloatField({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const shared: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#111",
    border: `1px solid ${focused ? "#c8ff00" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 4,
    padding: "20px 16px 8px",
    fontFamily: "var(--font-body)",
    fontSize: 15,
    color: "#f5f4f0",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ position: "relative" }}>
      <label
        style={{
          position: "absolute",
          left: 16,
          top: isActive ? 6 : 16,
          fontSize: isActive ? 10 : 15,
          letterSpacing: isActive ? "0.1em" : "0",
          textTransform: isActive ? "uppercase" : "none",
          color: focused
            ? "#c8ff00"
            : "rgba(245,244,240,0.35)",
          fontFamily: "var(--font-body)",
          transition: "all 0.2s",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          required={required}
          style={{ ...shared, resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={shared}
        />
      )}
    </div>
  );
}

const selectLabelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(245,244,240,0.35)",
  marginBottom: 6,
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#111",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 4,
  padding: "12px 16px",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  color: "#f5f4f0",
  outline: "none",
  cursor: "none",
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23666' stroke-width='1.2'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 16px center",
};
