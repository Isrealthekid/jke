"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="font-body text-sm uppercase tracking-widest text-brand-white/40">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-4 font-body text-lg text-brand-white outline-none transition-colors focus:border-brand-accent"
          required
        />
      </div>
      <div>
        <label className="font-body text-sm uppercase tracking-widest text-brand-white/40">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-4 font-body text-lg text-brand-white outline-none transition-colors focus:border-brand-accent"
          required
        />
      </div>
      <div>
        <label className="font-body text-sm uppercase tracking-widest text-brand-white/40">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="mt-2 w-full border-b border-brand-white/20 bg-transparent pb-4 font-body text-lg text-brand-white outline-none transition-colors focus:border-brand-accent"
          required
        />
      </div>
      <button
        type="submit"
        className="border border-brand-accent px-12 py-4 font-body text-sm uppercase tracking-widest text-brand-accent transition-colors hover:bg-brand-accent hover:text-brand-black"
      >
        Send Message
      </button>
    </form>
  );
}
