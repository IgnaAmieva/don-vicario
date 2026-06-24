import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-wine-dark text-cream/80">
      {/* NDSocial */}
      <div className="border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex flex-col items-center gap-5">
            <p className="text-cream/50 text-sm tracking-wide">Diseñado y desarrollado por</p>
            <div className="w-28 h-28" style={{ perspective: "600px" }}>
              <Image
                src="/images/NDSocial/NDSocial-20.png"
                alt="NDSocial"
                width={112}
                height={112}
                className="w-28 h-28 object-contain"
                style={{ animation: "spinY 3s linear infinite" }}
              />
            </div>
            <p className="text-gold font-bold text-2xl font-sans">NDSocial</p>
            <p className="text-cream/40 text-xs">Agencia de Marketing Digital</p>
            <a
              href="tel:+5492622465311"
              className="text-gold/80 hover:text-gold text-sm transition-colors"
            >
              +54 9 2622 46-5311
            </a>
            <div className="flex gap-4 mt-1">
              <a
                href="https://wa.me/5492622465311"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp NDSocial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/NDSocial_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="Instagram NDSocial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Don Vicario */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
        <div className="max-w-lg mx-auto text-center lg:text-left lg:max-w-none">
          <h3 className="font-serif text-2xl font-bold text-gold mb-4">
            DON VICARIO
          </h3>
          <p className="text-cream/60 leading-relaxed mb-6">
            Edición Limitada<br />
            Valle de Tunuyán, Mendoza, Argentina
          </p>

          <div className="flex gap-4 justify-center lg:justify-start">
            <a
              href="https://www.instagram.com/donvicario_vino/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="tel:+5492622254770"
              className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              aria-label="Teléfono"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a
              href="mailto:contacto@donvicario.com"
              className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-cream/10 text-sm text-cream/40">
            <p>Don Vicario &copy; 2025 — Valle de Tunuyán, Mendoza, Argentina</p>
            <p className="mt-1">
              Beber con moderación. Prohibida su venta a menores de 18 años.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
