"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wine, ShoppingCart } from "lucide-react";
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
  { option: "Unidad", price: 15000, label: "1 botella", save: null },
  { option: "Caja x6", price: 85000, label: "Caja de 6", save: "Ahorrás $5.000" },
  { option: "Caja x12", price: 160000, label: "Caja de 12", save: "Ahorrás $20.000" },
];

export default function Home() {
  const { addItem } = useCart();

  return (
    <>
      {/* ============ 1. HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center bg-wine-dark overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-wine-dark via-wine-dark/90 to-wine-dark" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-gold/80 text-sm sm:text-base tracking-[0.3em] uppercase font-sans font-light mb-4">
              Edición Limitada
            </p>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-cream tracking-wide">
              DON VICARIO
            </h1>
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

            <FadeIn delay={0.2}>
              <div>
                <p className="text-gold text-sm tracking-[0.2em] uppercase font-semibold mb-3">
                  Nuestra historia
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-wine mb-6 leading-tight">
                  Una tradición<br />que nace del alma
                </h2>
                <div className="w-12 h-0.5 bg-gold mb-8" />
                <p className="text-dark/70 leading-relaxed text-lg mb-6">
                  Don Vicario nace en el corazón del Valle de Tunuyán, donde la altitud,
                  el sol mendocino y los suelos pedregosos se combinan para crear un
                  terroir único. Cada botella es el resultado de una producción artesanal
                  y cuidada, con uvas seleccionadas a mano de viñedos propios.
                </p>
                <p className="text-dark/70 leading-relaxed text-lg mb-8">
                  Es un vino que lleva la impronta de su creador: pasión por la tierra,
                  respeto por el proceso y la convicción de que lo excepcional se logra
                  cuando no se apura nada.
                </p>

                <blockquote className="border-l-4 border-gold pl-6 py-2">
                  <p className="font-serif text-2xl italic text-wine/80 leading-relaxed">
                    &ldquo;Un vino con huella propia&rdquo;
                  </p>
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ 3. EL VINO ============ */}
      <section id="vino" className="py-24 lg:py-32 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <div className="flex justify-center">
                <div className="relative w-72 sm:w-80 lg:w-96 aspect-[3/4]">
                  <Image
                    src="/images/foto-vino.jpeg"
                    alt="Botella Don Vicario Edición Limitada"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="400px"
                    priority
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <div className="inline-block bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
                  Producción Limitada
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-wine mb-2">
                  DON VICARIO
                </h3>
                <p className="text-gold font-semibold text-lg mb-6">
                  Edición Limitada
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <span className="text-dark/50 w-24 flex-shrink-0">Varietal</span>
                    <span className="text-dark font-medium">Malbec</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-dark/50 w-24 flex-shrink-0">Origen</span>
                    <span className="text-dark font-medium">Valle de Tunuyán, Mendoza</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-dark/50 w-24 flex-shrink-0">Altitud</span>
                    <span className="text-dark font-medium">1.100 m.s.n.m.</span>
                  </div>
                </div>

                <div className="w-full h-px bg-gold/20 mb-8" />

                <h4 className="font-serif text-xl text-wine mb-3">Notas de cata</h4>
                <p className="text-dark/70 leading-relaxed text-base">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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

          <div className="grid sm:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => (
              <FadeIn key={product.option} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gold/10 hover:shadow-lg hover:border-gold/30 transition-all text-center">
                  <h3 className="font-serif text-xl font-bold text-wine mb-1">
                    {product.label}
                  </h3>
                  <p className="text-dark/50 text-sm mb-4">{product.option}</p>
                  <p className="font-serif text-3xl font-bold text-wine mb-1">
                    ${product.price.toLocaleString("es-AR")}
                  </p>
                  {product.save && (
                    <p className="text-green-700 text-sm font-medium mb-4">
                      {product.save}
                    </p>
                  )}
                  {!product.save && <div className="h-5 mb-4" />}
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
            <p className="text-center text-dark/50 text-sm mt-8">
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

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: "/images/vino-foto-linda.jpeg", alt: "Botella Don Vicario en exterior otoñal", span: "lg:col-span-2 lg:row-span-2" },
              { src: "/images/chica-tomandovino.jpeg", alt: "Disfrutando Don Vicario", span: "" },
              { src: "/images/dueñodelamarca-conelvino.jpeg", alt: "El bodeguero con Don Vicario", span: "" },
              { src: "/images/foto-vino.jpeg", alt: "Botella Don Vicario", span: "col-span-2 lg:col-span-1" },
            ].map((img, i) => (
              <FadeIn key={img.src} delay={i * 0.1} className={img.span}>
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
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
