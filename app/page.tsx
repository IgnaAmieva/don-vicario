"use client";

import Image from "next/image";
import { useRef, useState, useCallback, TouchEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Wine, Grape, MapPin, Mountain, ZoomIn, X,
  ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart,
  Truck, Store, ArrowRight, ArrowLeft, Send,
} from "lucide-react";

/* ===== Animation wrapper ===== */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== Product options ===== */
const PRODUCTS = [
  {
    option: "Combo Brindis",
    price: 30000,
    label: "Botella + Copa",
    images: [
      "/images/combo-brindis/IMG_3273.jpeg",
      "/images/combo-brindis/IMG_3271.jpeg",
      "/images/combo-brindis/IMG_3266.jpeg",
      "/images/combo-brindis/IMG_3306.jpeg",
    ],
  },
  {
    option: "Combo Sediento",
    price: 35000,
    label: "2 Botellas",
    images: [
      "/images/combo-sediento/IMG_3298.jpeg",
      "/images/combo-sediento/IMG_3321.jpeg",
      "/images/combo-sediento/IMG_3318.jpeg",
      "/images/combo-sediento/IMG_3287.jpeg",
    ],
  },
  {
    option: "Caja x6",
    price: 80000,
    label: "Caja de 6",
    images: ["/images/foto-vino.jpeg"],
  },
];

/* ===== Carousel component ===== */
function Carousel({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (images: string[], index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const single = images.length <= 1;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const handleTouchStart = (e: TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-5 group/carousel">
      {/* Image */}
      <div
        className="relative w-full h-full cursor-pointer group/img"
        onClick={() => onImageClick(images, current)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[current]}
          alt="Producto"
          fill
          className="object-cover transition-transform duration-300 group-hover/img:scale-105"
          sizes="(max-width: 640px) 100vw, 280px"
        />
        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn size={28} className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
        </div>
      </div>

      {/* Arrows */}
      {!single && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-opacity z-10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-opacity z-10"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Dots */}
      {!single && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
              className={`w-2 h-2 rounded-full transition-colors ${idx === current ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== Types ===== */
type DeliveryMethod = "envio" | "retiro";
interface OrderForm {
  nombre: string;
  telefono: string;
  delivery: DeliveryMethod;
  direccion: string;
}
interface FormErrors {
  nombre?: string;
  telefono?: string;
  direccion?: string;
}

export default function Home() {
  // Lightbox state
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  // Purchase modal state
  const [purchaseModal, setPurchaseModal] = useState<{ product: typeof PRODUCTS[0] } | null>(null);
  const [step, setStep] = useState(1);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState<OrderForm>({ nombre: "", telefono: "", delivery: "envio", direccion: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const openLightbox = useCallback((images: string[], index: number) => {
    setLightbox({ images, index });
  }, []);

  const closeLightbox = () => setLightbox(null);
  const lightboxPrev = () => setLightbox((lb) => lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : null);
  const lightboxNext = () => setLightbox((lb) => lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null);

  const openPurchase = (product: typeof PRODUCTS[0]) => {
    setPurchaseModal({ product });
    setStep(1);
    setQty(1);
    setForm({ nombre: "", telefono: "", delivery: "envio", direccion: "" });
    setErrors({});
  };
  const closePurchase = () => setPurchaseModal(null);

  const validateStep2 = (): boolean => {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = "Ingresá tu nombre";
    if (!form.telefono.trim()) e.telefono = "Ingresá tu teléfono";
    if (form.delivery === "envio" && !form.direccion.trim()) e.direccion = "Ingresá tu dirección";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppUrl = () => {
    if (!purchaseModal) return "#";
    const p = purchaseModal.product;
    const total = p.price * qty;
    const deliveryLine = form.delivery === "envio"
      ? `📍 Envío a: ${form.direccion}`
      : "📍 Retiro en bodega";
    const msg = `🍷 Nuevo pedido - Don Vicario
👤 Nombre: ${form.nombre}
📱 Teléfono: ${form.telefono}
${deliveryLine}
🛒 Pedido:
${p.option} x${qty} → $${total.toLocaleString("es-AR")}

💳 Pagar aquí: https://link.mercadopago.com.ar/donvicario`;
    return `https://wa.me/5492622254770?text=${encodeURIComponent(msg)}`;
  };

  // Lightbox touch
  const [lbTouchStart, setLbTouchStart] = useState<number | null>(null);

  return (
    <>
      {/* ============ 1. HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center bg-wine-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-wine-dark via-wine-dark/90 to-wine-dark" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex flex-col items-center gap-5 mb-6">
              <Image
                src="/images/montana-don-vicario.png"
                alt="Don Vicario — Montaña y nombre"
                width={400}
                height={200}
                className="w-52 sm:w-64 lg:w-80 h-auto drop-shadow-lg"
                priority
              />
              <Image
                src="/images/Huella_DonVicario.png"
                alt="Don Vicario — Huella con violín"
                width={320}
                height={320}
                className="w-44 sm:w-56 lg:w-72 h-auto drop-shadow-lg"
                priority
              />
            </div>
            <div className="w-20 h-0.5 bg-gold mx-auto my-6" />
            <p className="text-cream/70 text-lg sm:text-xl font-light max-w-xl mx-auto">
              Valle de Uco, Tunuyán, Mendoza
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10"
          >
            <a
              href="#vino"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-wine-dark font-semibold px-8 py-3.5 rounded-full transition-colors text-base"
            >
              <Wine size={20} />
              Conocé el vino
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gold/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ============ 2. HISTORIA ============ */}
      <section id="historia" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div>
                <p className="text-dark lg:text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-4">
                  Nuestra historia
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-wine lg:text-dark mb-8 leading-tight">
                  Una tradición<br />que nace del alma
                </h2>
                <div className="w-12 h-0.5 bg-gold mb-10" />
                <blockquote className="border-l-4 border-gold pl-6 py-2">
                  <p className="font-serif text-xl lg:text-2xl italic text-dark/80 leading-relaxed">
                    &ldquo;Esta viña nació en homenaje a quien me enseñó a creer, a soñar
                    y a amar la música. Como el sonido de un violín en casa, está pensado
                    para acompañar mesas largas, abrazos sinceros y momentos que se
                    vuelven recuerdo.&rdquo;
                  </p>
                </blockquote>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/dueñodelamarca-conelvino.jpeg"
                  alt="Bodeguero de Don Vicario en el viñedo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ 3. EL VINO ============ */}
      <section id="vino" className="py-24 lg:py-32 bg-cream-dark overflow-x-hidden">
        {/* ---- DESKTOP (lg+): layout 2 columnas ---- */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                Nuestro vino
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-wine">
                El producto
              </h2>
              <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <div className="relative -ml-6">
              <div className="absolute left-0 top-[10%] bottom-[10%] w-px bg-wine/40 z-10" />
              <div className="absolute left-0 top-[10%] bottom-[10%] w-6 z-10 bg-gradient-to-r from-wine/15 to-transparent blur-sm" />

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative w-full aspect-[3/4]"
              >
                <Image
                  src="/images/mis (1).png"
                  alt="Presentando la botella Don Vicario"
                  fill
                  className="object-contain object-left drop-shadow-2xl"
                  sizes="50vw"
                  priority
                />
              </motion.div>
            </div>

            <FadeIn delay={0.2}>
              <div>
                <p className="text-gold text-sm font-bold tracking-wider uppercase mb-6">
                  Producción Limitada
                </p>
                <h3 className="font-serif text-5xl font-bold text-wine mb-3">
                  DON VICARIO
                </h3>
                <p className="text-gold font-semibold text-xl mb-10">
                  Edición Limitada
                </p>

                <div className="flex gap-10 mb-12">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mb-3">
                      <Grape size={26} className="text-gold" />
                    </div>
                    <span className="text-dark/50 text-xs uppercase tracking-wider mb-1">Varietal</span>
                    <span className="text-dark font-medium text-base">Malbec</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mb-3">
                      <MapPin size={26} className="text-gold" />
                    </div>
                    <span className="text-dark/50 text-xs uppercase tracking-wider mb-1">Origen</span>
                    <span className="text-dark font-medium text-base">Tunuyán</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mb-3">
                      <Mountain size={26} className="text-gold" />
                    </div>
                    <span className="text-dark/50 text-xs uppercase tracking-wider mb-1">Altitud</span>
                    <span className="text-dark font-medium text-base">1.100 msnm</span>
                  </div>
                </div>

                <div className="border border-gold/20 rounded-lg p-8">
                  <h4 className="font-serif text-2xl text-wine mb-5">Notas de cata</h4>
                  <p className="text-dark/80 text-lg leading-[1.8]">
                    Color rojo violáceo profundo, de gran intensidad. En nariz despliega
                    aromas a frutos rojos maduros, ciruela negra y sutiles notas de
                    vainilla y tabaco, aportadas por su paso en roble. En boca es amplio,
                    con taninos sedosos y un final largo y persistente que invita a seguir
                    descubriéndolo.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ---- MOBILE / TABLET (hasta lg): layout vertical centrado ---- */}
        <div className="lg:hidden">
          <div className="px-4 sm:px-6">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                  Nuestro vino
                </p>
                <h2 className="font-serif text-4xl font-bold text-wine">
                  El producto
                </h2>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
              </div>
            </FadeIn>
          </div>

          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative w-full aspect-[3/4] mb-8"
          >
            <Image
              src="/images/mis (1).png"
              alt="Presentando la botella Don Vicario"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="100vw"
              priority
            />
          </motion.div>

          <div className="px-4 sm:px-6 max-w-lg mx-auto">
            <FadeIn>
              <div className="flex justify-center mb-10">
                <div className="w-24 h-1 rounded-full bg-gold/50" />
              </div>
            </FadeIn>

            <FadeIn>
              <div className="text-center mb-10">
                <h3 className="font-serif text-4xl font-bold text-wine mb-2">
                  DON VICARIO
                </h3>
                <p className="text-gold font-semibold text-lg">
                  Edición Limitada
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mb-3">
                    <Grape size={22} className="text-gold" />
                  </div>
                  <span className="text-dark/50 text-xs uppercase tracking-wider mb-1">Varietal</span>
                  <span className="text-dark font-medium text-sm">Malbec</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mb-3">
                    <MapPin size={22} className="text-gold" />
                  </div>
                  <span className="text-dark/50 text-xs uppercase tracking-wider mb-1">Origen</span>
                  <span className="text-dark font-medium text-sm">Tunuyán</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mb-3">
                    <Mountain size={22} className="text-gold" />
                  </div>
                  <span className="text-dark/50 text-xs uppercase tracking-wider mb-1">Altitud</span>
                  <span className="text-dark font-medium text-sm">1.100 msnm</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="border border-gold/20 rounded-lg p-6">
                <h4 className="font-serif text-xl text-wine text-center mb-4">
                  Notas de cata
                </h4>
                <p className="text-dark/80 text-base leading-[1.7] text-center">
                  Color rojo violáceo profundo, de gran intensidad. En nariz despliega
                  aromas a frutos rojos maduros, ciruela negra y sutiles notas de
                  vainilla y tabaco, aportadas por su paso en roble. En boca es amplio,
                  con taninos sedosos y un final largo y persistente que invita a seguir
                  descubriéndolo.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ 4. TIENDA ============ */}
      <section id="tienda" className="py-24 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                Tienda
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-wine">
                Comprá tu vino
              </h2>
              <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {PRODUCTS.map((product, i) => (
              <FadeIn key={product.option} delay={i * 0.1}>
                <div className="border border-gold/15 rounded-xl p-6 lg:p-8 hover:border-gold/40 transition-all text-center bg-cream-dark/30">
                  <Carousel images={product.images} onImageClick={openLightbox} />
                  <h3 className="font-serif text-xl font-bold text-wine mb-1">
                    {product.label}
                  </h3>
                  <p className="text-dark/60 text-sm lg:text-base mb-5">{product.option}</p>
                  <p className="font-serif text-3xl font-bold text-wine mb-6">
                    ${product.price.toLocaleString("es-AR")}
                  </p>
                  <button
                    onClick={() => openPurchase(product)}
                    className="w-full flex items-center justify-center gap-2 bg-wine hover:bg-wine-dark text-cream font-semibold py-3 rounded-full transition-colors"
                  >
                    <ShoppingCart size={18} />
                    Comprar ahora
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="text-center text-dark/60 text-sm lg:text-base mt-10">
              Envíos a todo el país. Retiro en bodega disponible.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============ 5. GALERÍA ============ */}
      <section id="galeria" className="py-24 lg:py-32 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                Galería
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-wine">
                El estilo Don Vicario
              </h2>
              <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { src: "/images/vino-foto-linda.jpeg", alt: "Botella Don Vicario en exterior otoñal", span: "lg:col-span-2 lg:row-span-2" },
              { src: "/images/chica-tomandovino.jpeg", alt: "Disfrutando Don Vicario", span: "" },
              { src: "/images/dueñodelamarca-conelvino.jpeg", alt: "El bodeguero con Don Vicario", span: "" },
            ].map((img, i) => (
              <FadeIn key={img.src} delay={i * 0.1} className={img.span}>
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-wine-dark/0 group-hover:bg-wine-dark/20 transition-colors duration-300" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeLightbox}
            onTouchStart={(e) => setLbTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (lbTouchStart === null) return;
              const diff = lbTouchStart - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 40) diff > 0 ? lightboxNext() : lightboxPrev();
              setLbTouchStart(null);
            }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>

            {lightbox.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.div
              key={lightbox.images[lightbox.index]}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.images[lightbox.index]}
                alt="Producto Don Vicario"
                width={1200}
                height={900}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                sizes="90vw"
              />
            </motion.div>

            {lightbox.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {lightbox.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: idx }); }}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === lightbox.index ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ PURCHASE MODAL ============ */}
      <AnimatePresence>
        {purchaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4"
            onClick={closePurchase}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative bg-cream w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-cream z-10 px-6 pt-5 pb-4 border-b border-gold/15">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-bold text-wine">
                    {purchaseModal.product.option}
                  </h3>
                  <button onClick={closePurchase} className="text-dark/40 hover:text-dark transition-colors">
                    <X size={22} />
                  </button>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        s === step ? "bg-gold text-wine-dark" : s < step ? "bg-wine text-cream" : "bg-dark/10 text-dark/40"
                      }`}>
                        {s}
                      </div>
                      {s < 3 && (
                        <div className={`flex-1 h-0.5 transition-colors ${s < step ? "bg-wine" : "bg-dark/10"}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-6">
                {/* STEP 1: Quantity */}
                {step === 1 && (
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-dark mb-2">¿Cuántos querés?</h4>
                    <p className="text-dark/60 text-sm mb-8">{purchaseModal.product.label}</p>

                    <div className="flex items-center justify-center gap-6 mb-8">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-12 h-12 rounded-full border-2 border-gold/30 hover:border-gold flex items-center justify-center text-wine transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="font-serif text-5xl font-bold text-wine w-16 text-center">{qty}</span>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="w-12 h-12 rounded-full border-2 border-gold/30 hover:border-gold flex items-center justify-center text-wine transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>

                    <div className="bg-cream-dark rounded-xl p-5 mb-8 text-center">
                      <p className="text-dark/50 text-sm mb-1">Subtotal</p>
                      <p className="font-serif text-3xl font-bold text-wine">
                        ${(purchaseModal.product.price * qty).toLocaleString("es-AR")}
                      </p>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full flex items-center justify-center gap-2 bg-wine hover:bg-wine-dark text-cream font-semibold py-3.5 rounded-full transition-colors"
                    >
                      Continuar
                      <ArrowRight size={18} />
                    </button>
                  </div>
                )}

                {/* STEP 2: Data */}
                {step === 2 && (
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-dark mb-6">Tus datos</h4>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-dark/70 mb-1.5">Nombre completo</label>
                        <input
                          type="text"
                          value={form.nombre}
                          onChange={(e) => { setForm({ ...form, nombre: e.target.value }); setErrors({ ...errors, nombre: undefined }); }}
                          className="w-full px-4 py-3 rounded-lg border border-dark/15 bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-dark"
                          placeholder="Tu nombre"
                        />
                        {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark/70 mb-1.5">Teléfono</label>
                        <input
                          type="tel"
                          value={form.telefono}
                          onChange={(e) => { setForm({ ...form, telefono: e.target.value }); setErrors({ ...errors, telefono: undefined }); }}
                          className="w-full px-4 py-3 rounded-lg border border-dark/15 bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-dark"
                          placeholder="Ej: 2622-123456"
                        />
                        {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark/70 mb-2">¿Cómo querés recibirlo?</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => setForm({ ...form, delivery: "envio" })}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                              form.delivery === "envio"
                                ? "border-gold bg-gold/10 text-wine"
                                : "border-dark/10 text-dark/50 hover:border-dark/20"
                            }`}
                          >
                            <Truck size={22} />
                            <span className="text-sm font-medium">Envío a domicilio</span>
                          </button>
                          <button
                            onClick={() => { setForm({ ...form, delivery: "retiro", direccion: "" }); setErrors({ ...errors, direccion: undefined }); }}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                              form.delivery === "retiro"
                                ? "border-gold bg-gold/10 text-wine"
                                : "border-dark/10 text-dark/50 hover:border-dark/20"
                            }`}
                          >
                            <Store size={22} />
                            <span className="text-sm font-medium">Retiro en bodega</span>
                          </button>
                        </div>
                      </div>

                      {form.delivery === "envio" && (
                        <div>
                          <label className="block text-sm font-medium text-dark/70 mb-1.5">Dirección de envío</label>
                          <input
                            type="text"
                            value={form.direccion}
                            onChange={(e) => { setForm({ ...form, direccion: e.target.value }); setErrors({ ...errors, direccion: undefined }); }}
                            className="w-full px-4 py-3 rounded-lg border border-dark/15 bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-dark"
                            placeholder="Calle, número, ciudad"
                          />
                          {errors.direccion && <p className="text-red-600 text-xs mt-1">{errors.direccion}</p>}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="flex items-center justify-center gap-1 px-5 py-3.5 rounded-full border border-dark/15 text-dark/60 hover:text-dark hover:border-dark/30 font-medium transition-colors"
                      >
                        <ArrowLeft size={16} />
                        Volver
                      </button>
                      <button
                        onClick={() => { if (validateStep2()) setStep(3); }}
                        className="flex-1 flex items-center justify-center gap-2 bg-wine hover:bg-wine-dark text-cream font-semibold py-3.5 rounded-full transition-colors"
                      >
                        Ver resumen
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Summary */}
                {step === 3 && (
                  <div>
                    <h4 className="font-serif text-2xl font-bold text-dark mb-6">Resumen del pedido</h4>

                    <div className="bg-cream-dark rounded-xl p-5 space-y-4 mb-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-dark">{purchaseModal.product.option}</p>
                          <p className="text-dark/50 text-sm">x{qty}</p>
                        </div>
                        <p className="font-serif text-2xl font-bold text-wine">
                          ${(purchaseModal.product.price * qty).toLocaleString("es-AR")}
                        </p>
                      </div>
                      <div className="h-px bg-dark/10" />
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <span className="text-dark/50">👤</span>
                          <span className="text-dark">{form.nombre}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-dark/50">📱</span>
                          <span className="text-dark">{form.telefono}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-dark/50">📍</span>
                          <span className="text-dark">
                            {form.delivery === "envio" ? `Envío a: ${form.direccion}` : "Retiro en bodega"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold py-3.5 rounded-full transition-colors"
                      >
                        <Send size={18} />
                        Confirmar pedido por WhatsApp
                      </a>
                      <button
                        onClick={() => setStep(2)}
                        className="flex items-center justify-center gap-1 py-3 text-dark/50 hover:text-dark font-medium transition-colors text-sm"
                      >
                        <ArrowLeft size={14} />
                        Volver a mis datos
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
