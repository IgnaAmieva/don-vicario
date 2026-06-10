"use client";

import { useState, FormEvent } from "react";
import { Mail } from "lucide-react";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer id="contacto" className="bg-wine-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-cream mb-2">
              Contacto
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-8" />

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Nombre"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/10 border border-cream/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/10 border border-cream/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors"
              />
              <textarea
                placeholder="Mensaje"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/10 border border-cream/20 rounded-lg px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold transition-colors resize-none"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold-light text-wine-dark font-semibold px-8 py-3 rounded-full transition-colors"
              >
                {submitted ? "Mensaje enviado!" : "Enviar mensaje"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-gold mb-4">
                DON VICARIO
              </h3>
              <p className="text-cream/60 leading-relaxed mb-6">
                Edición Limitada<br />
                Valle de Tunuyán, Mendoza, Argentina
              </p>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a
                  href="mailto:contacto@donvicario.com"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-cream/10 text-sm text-cream/40">
              <p>Don Vicario &copy; 2025 — Valle de Tunuyán, Mendoza, Argentina</p>
              <p className="mt-1">
                Beber con moderación. Prohibida su venta a menores de 18 años.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
