"use client";

import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "./CartContext";

const WHATSAPP_NUMBER = "5492615000000";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  const buildWhatsAppMessage = () => {
    let msg = "Hola! Quiero hacer un pedido de Don Vicario:\n\n";
    items.forEach((item) => {
      msg += `- ${item.option} x${item.quantity} — $${(item.price * item.quantity).toLocaleString("es-AR")}\n`;
    });
    msg += `\nTotal: $${total.toLocaleString("es-AR")}`;
    return encodeURIComponent(msg);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <h2 className="font-serif text-xl font-bold text-wine">Tu Pedido</h2>
          <button
            onClick={closeCart}
            className="text-dark/60 hover:text-wine transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-dark/50 text-center mt-12">
              Tu carrito está vacío
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.option}
                  className="flex items-center gap-4 bg-white/60 rounded-xl p-4"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-dark text-sm">
                      {item.option}
                    </p>
                    <p className="text-gold font-bold">
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.option, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.option, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(item.option)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-wine/60 hover:text-wine transition-colors"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gold/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-dark/70">Total</span>
              <span className="font-serif text-2xl font-bold text-wine">
                ${total.toLocaleString("es-AR")}
              </span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-full transition-colors"
            >
              <MessageCircle size={20} />
              Finalizar pedido por WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
