'use client';

import React, { useState, useEffect } from 'react';
import { X, Star, Sparkles, CheckCircle2, AlertCircle, ShoppingCart, ShieldCheck, Truck, Zap } from 'lucide-react';
import { Product, Review, AISynthesis } from '../lib/types';
import { fetchProductDetail } from '../lib/api';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [details, setDetails] = useState<{
    reviews: Review[];
    ai_synthesis: AISynthesis;
    frequently_bought_together: Product[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product && isOpen) {
      setLoading(true);
      fetchProductDetail(product.id)
        .then((res) => {
          setDetails({
            reviews: res.reviews || [],
            ai_synthesis: res.ai_synthesis,
            frequently_bought_together: res.frequently_bought_together || []
          });
        })
        .finally(() => setLoading(false));
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200">
        {/* Top Modal Header */}
        <div className="bg-amazon-dark px-6 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amazon-orange font-black text-lg">amazon</span>
            <span className="text-xs bg-purple-600 px-2 py-0.5 rounded text-white font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-300" /> AI Deep Dive
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Product Image */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full h-72 bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center justify-center">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Delivery and Trust Guarantee */}
              <div className="w-full mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Free Prime Delivery Tomorrow</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>30-Day Money Back & AI Authenticity Shield</span>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Pricing */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amazon-blue uppercase tracking-wider">
                  {product.category_name}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-1 leading-snug">
                  {product.title}
                </h2>

                {/* Rating & Badge */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 text-sm font-bold text-gray-800">{product.rating}</span>
                  </div>
                  <span className="text-xs text-amazon-blue hover:underline cursor-pointer">
                    {product.rating_count.toLocaleString()} verified ratings
                  </span>
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    {product.badge}
                  </span>
                </div>

                {/* Pricing Block */}
                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-gray-900">${product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.original_price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                      In Stock. Prime 1-Day delivery ready.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="px-6 py-2.5 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-extrabold text-sm rounded-full shadow-md transition flex items-center gap-2 active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Spec Highlights */}
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Key Features & Technical Specs
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.ai_features_highlight?.map((spec, i) => (
                      <div
                        key={i}
                        className="bg-gray-100 p-2 rounded-lg text-xs font-medium text-gray-800 flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-amazon-amber" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Customer Review Synthesis Section */}
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50/50 to-blue-50 p-5 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-sm">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-purple-950">
                    AI Review Insights & Sentiment Summary
                  </h3>
                  <p className="text-[11px] text-purple-700">
                    Synthesized from thousands of verified customer reviews
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-800 bg-purple-200/80 px-2.5 py-1 rounded-full">
                Confidence: {details?.ai_synthesis?.ai_rating_confidence || '98.7%'}
              </span>
            </div>

            {/* AI Summary Text */}
            <p className="text-xs sm:text-sm text-gray-800 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-purple-100 shadow-xs">
              {details?.ai_synthesis?.summary || product.ai_summary}
            </p>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/90 p-3.5 rounded-xl border border-emerald-200 shadow-xs">
                <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  What Verified Buyers Loved:
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {details?.ai_synthesis?.pros?.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200 shadow-xs">
                <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Things to Note:
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {details?.ai_synthesis?.cons?.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
