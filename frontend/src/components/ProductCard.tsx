'use client';

import React from 'react';
import { Star, Sparkles, Check, ShoppingCart, Eye, Zap } from 'lucide-react';
import { Product } from '../lib/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group relative">
      {/* Top badges */}
      <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
        {product.badge && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wider uppercase ${
              product.badge === "Amazon's Choice"
                ? 'bg-amazon-dark text-white border-l-4 border-amazon-orange'
                : product.badge === "Best Seller"
                ? 'bg-amber-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* AI Innovation Tag */}
        <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1 ml-auto">
          <Sparkles className="w-2.5 h-2.5 text-purple-600" />
          <span>{product.ai_badge}</span>
        </span>
      </div>

      {/* Product Image */}
      <div
        onClick={() => onQuickView(product)}
        className="w-full h-48 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center p-2 cursor-pointer relative"
      >
        <img
          src={product.image_url}
          alt={product.title}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Quick View Overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white text-gray-900 font-bold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 hover:bg-gray-100 transition"
          >
            <Eye className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Review Insights</span>
          </button>
        </div>
      </div>

      {/* Title & Category */}
      <div className="mt-3 flex-1 flex flex-col">
        <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">
          {product.category_name || "Featured Category"}
        </p>
        <h3
          onClick={() => onQuickView(product)}
          className="font-medium text-sm text-gray-900 hover:text-amazon-blue cursor-pointer line-clamp-2 mt-0.5 leading-snug"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-800">{product.rating}</span>
          <span className="text-xs text-amazon-blue hover:underline cursor-pointer">
            ({product.rating_count.toLocaleString()})
          </span>
        </div>

        {/* AI Highlight Pills */}
        <div className="flex flex-wrap gap-1 mt-2">
          {product.ai_features_highlight?.slice(0, 2).map((feat, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-medium"
            >
              • {feat}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            {discount > 0 && (
              <span className="text-sm font-light text-red-700">-{discount}%</span>
            )}
            <div className="text-2xl font-black text-gray-900 leading-none">
              <span className="text-xs font-normal align-top">$</span>
              {Math.floor(product.price)}
              <span className="text-xs font-normal align-top">
                {(product.price % 1).toFixed(2).substring(1)}
              </span>
            </div>
            {product.original_price && (
              <span className="text-xs text-gray-500 line-through">
                ${product.original_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Prime Delivery Info */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-amazon-prime font-black italic text-xs tracking-tight">prime</span>
            <span className="text-xs text-gray-600">One-Day</span>
            <span className="text-xs text-gray-500">Get it by <strong>Tomorrow</strong></span>
          </div>

          <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
            FREE Delivery by Amazon Nova
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3.5 space-y-2">
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-2 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark font-bold text-xs rounded-full shadow-sm hover:shadow transition flex items-center justify-center gap-1.5 active:scale-98"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={() => onQuickView(product)}
          className="w-full py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold text-[11px] rounded-full border border-purple-200 transition flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-purple-600" />
          <span>View AI Specs & Review Summary</span>
        </button>
      </div>
    </div>
  );
};
