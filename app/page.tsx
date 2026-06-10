"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wine, ShoppingCart, Grape, MapPin, Mountain } from "lucide-react";
import { useCart } from "@/components/CartContext";

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
  { option: "Unidad", price: 15000, label: "1 botella", save: null, image: "/images/foto-vino.jpeg" },
  // TODO: reemplazar por imagen de la caja (ej: /images/caja-vino.jpeg) cuando esté disponible
  { option: "Caja x6", price: 85000, label: "Caja de 6", save: "Ahorrás $5.000", image: "/images/foto-vino.jpeg" },
  { option: "Caja x12", price: 160000, label: "Caja de 12", save: "Ahorrás $20.000", image: "/images/foto-vino.jpeg" },
];

export default function Home() {
  const { addItem } = useCart();

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
            <p className="text-gold/80 text-sm sm:text-base tracking-[0.3em] uppercase font-sans font-light mb-6">
              Edición Limitada
            </p>
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo-don-vicario.png"
                alt="Don Vicario — Logo"
                width={320}
                height={320}
                className="w-48 sm:w-64 lg:w-80 h-auto drop-shadow-lg"
                priority
              />
            </div>
            <div className="w-20 h-0.5 bg-gold mx-auto my-6" />
            <p className="text-cream/70 text-lg sm:text-xl font-light max-w-xl mx-auto">
              Valle de Tunuyán, Mendoza
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
                <p className="text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-4">
                  Nuestra historia
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-dark mb-8 leading-tight">
                  Una tradición<br />que nace del alma
                </h2>
                <div className="w-12 h-0.5 bg-gold mb-10" />
                <blockquote className="border-l-4 border-gold pl-6 py-2">
                  <p className="font-serif text-xl lg:text-2xl italic text-wine/80 leading-relaxed">
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
            {/* Imagen — pegada al borde izquierdo con degradado decorativo */}
            <div className="relative -ml-6">
              {/* Línea decorativa wine — punto de origen de la animación */}
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

                {/* Íconos/badges */}
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

                {/* Notas de cata */}
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
          {/* Título de sección */}
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

          {/* 1. Imagen full-bleed */}
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

          {/* Contenido centrado con padding */}
          <div className="px-4 sm:px-6 max-w-lg mx-auto">
            {/* 2. Separador píldora dorada */}
            <FadeIn>
              <div className="flex justify-center mb-10">
                <div className="w-24 h-1 rounded-full bg-gold/50" />
              </div>
            </FadeIn>

            {/* 3. Título */}
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

            {/* 4-5. Íconos con labels */}
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

            {/* 6. Notas de cata */}
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
                  <div className="relative w-20 h-28 mx-auto mb-5">
                    <Image
                      src={product.image}
                      alt={product.label}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-wine mb-1">
                    {product.label}
                  </h3>
                  <p className="text-dark/60 text-sm lg:text-base mb-5">{product.option}</p>
                  <p className="font-serif text-3xl font-bold text-wine mb-1">
                    ${product.price.toLocaleString("es-AR")}
                  </p>
                  {product.save && (
                    <p className="text-green-700 text-sm font-medium mb-5">
                      {product.save}
                    </p>
                  )}
                  {!product.save && <div className="h-5 mb-5" />}
                  <button
                    onClick={() =>
                      addItem({
                        name: "Don Vicario Edición Limitada",
                        option: product.option,
                        price: product.price,
                      })
                    }
                    className="w-full flex items-center justify-center gap-2 bg-wine hover:bg-wine-dark text-cream font-semibold py-3 rounded-full transition-colors"
                  >
                    <ShoppingCart size={18} />
                    Agregar
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
    </>
  );
}
