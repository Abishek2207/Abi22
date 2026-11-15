'use client';

import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, CheckCircle2, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../lib/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const primeDiscount = Math.round(subtotal * 0.05 * 100) / 100;
  const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal - primeDiscount + estimatedTax) * 100) / 100;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-amazon-dark px-4 py-3 text-white flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amazon-yellow" />
            <h2 className="font-bold text-sm">Shopping Cart ({items.reduce((a, b) => a + b.quantity, 0)} items)</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {checkoutComplete ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-gray-900">Order Confirmed!</h3>
            <p className="text-xs text-gray-600 max-w-xs">
              Thank you Alex! Your order has been placed with <strong>Prime Next-Day Delivery</strong>. Expected arrival tomorrow by 8:00 PM.
            </p>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-left w-full text-xs space-y-1">
              <p className="font-bold text-gray-800">Delivery Address:</p>
              <p className="text-gray-600">742 Evergreen Terrace, Springfield, OR 97477</p>
              <p className="text-emerald-700 font-semibold pt-1">AI Package Route Optimization Active</p>
            </div>
            <button
              onClick={() => {
                setCheckoutComplete(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-bold text-xs rounded-full shadow"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16 text-gray-500 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto text-gray-300" />
                  <p className="text-sm font-semibold">Your Amazon Nova Cart is empty</p>
                  <p className="text-xs text-gray-400">Discover AI top picks or ask the Copilot for recommendations!</p>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex gap-3 items-center"
                  >
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-16 h-16 object-contain bg-white rounded p-1 border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">
                        {product.title}
                      </h4>
                      <p className="text-xs text-gray-900 font-black mt-0.5">
                        ${product.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-gray-300 rounded bg-white text-xs">
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="px-2 py-0.5 hover:bg-gray-100 font-bold"
                          >
                            -
                          </button>
                          <span className="px-2 font-semibold">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="px-2 py-0.5 hover:bg-gray-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-red-600 hover:text-red-700 text-xs flex items-center gap-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-purple-700">
                    <span className="flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3" /> Prime AI Savings (5%):
                    </span>
                    <span className="font-bold">-${primeDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax:</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Delivery:</span>
                    <span>FREE (Prime 1-Day)</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
                    <span>Order Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold text-sm rounded-full shadow-md flex items-center justify-center gap-2 transition active:scale-98"
                >
                  {loading ? (
                    <span>Securing Prime Order...</span>
                  ) : (
                    <>
                      <span>Proceed to 1-Click Prime Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Encrypted 256-bit checkout & Amazon Nova Guarantee</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
