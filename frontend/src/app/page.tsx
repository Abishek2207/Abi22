'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { SubNav } from '../components/SubNav';
import { HeroBanner } from '../components/HeroBanner';
import { ProductCard } from '../components/ProductCard';
import { AICopilotDrawer } from '../components/AICopilotDrawer';
import { ProductModal } from '../components/ProductModal';
import { CartDrawer } from '../components/CartDrawer';
import { Product } from '../lib/types';
import { fetchProducts, fallbackProducts } from '../lib/api';
import { Sparkles, Bot, Zap, Clock, ShieldCheck, Heart, RefreshCw } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([
    { product: fallbackProducts[0], quantity: 1 } // seeded with 1 item for instant preview
  ]);

  // Load products on mount or filter change
  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async (search?: string, aiMode: boolean = false) => {
    setLoading(true);
    try {
      const data = await fetchProducts(search, aiMode, selectedCategory);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-amazon-background flex flex-col font-sans">
      {/* Top Amazon Navbar with AI Search & Voice/Copilot Trigger */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onSearch={(q, aiMode, cat) => {
          setSelectedCategory(cat);
          loadProducts(q, aiMode);
        }}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* Departments SubNav */}
      <SubNav
        onCategorySelect={(slug) => setSelectedCategory(slug)}
        onOpenCopilot={() => setIsCopilotOpen(true)}
      />

      {/* Hero Banner with Nova AI Spotlight */}
      <HeroBanner
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onExploreDeals={() => {
          const el = document.getElementById('catalog-grid');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-[1540px] mx-auto px-4 -mt-10 sm:-mt-14 relative z-20 space-y-8 pb-16 flex-1 w-full">
        {/* AI Flash Deals Ribbon */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-100 text-red-600 font-bold">
              <Zap className="w-5 h-5 fill-red-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                Today's AI Lightning Deals & Prime Exclusives
                <span className="text-xs bg-red-600 text-white font-extrabold px-2 py-0.5 rounded">
                  UP TO 40% OFF
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                Algorithmically curated deals refreshed every 15 minutes based on stock elasticity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Next price refresh in: <strong>14m 28s</strong></span>
          </div>
        </div>

        {/* Product Catalog Grid */}
        <section id="catalog-grid" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span>Results</span>
              <span className="text-xs font-normal text-gray-500">
                ({products.length} products with AI Confidence Ratings)
              </span>
            </h2>

            {/* Quick Filter Pill */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 hidden sm:inline">Active Filter:</span>
              <span className="bg-purple-100 text-purple-900 font-bold px-2.5 py-1 rounded-full border border-purple-200">
                {selectedCategory === 'all' ? 'All Departments' : selectedCategory}
              </span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-gray-400 hover:text-gray-600 underline text-xs"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
              <p className="text-sm font-semibold text-gray-600">
                Retrieving catalog with neural rankings...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Floating Copilot Trigger Widget (Bottom Right) */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-purple-700 via-indigo-700 to-amazon-dark text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition border-2 border-purple-400/50 group"
          >
            <div className="p-1 rounded-full bg-yellow-400 text-purple-950">
              <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black tracking-wide flex items-center gap-1">
                Nova AI Copilot <Sparkles className="w-3 h-3 text-yellow-300" />
              </p>
              <p className="text-[10px] text-purple-200">Click to compare or ask</p>
            </div>
          </button>
        </div>
      </main>

      {/* Modals & Drawers */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onAddToCart={handleAddToCart}
        onViewProduct={(p) => setSelectedProduct(p)}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {/* Amazon Style Footer */}
      <footer className="bg-amazon-dark text-white text-xs mt-auto">
        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full py-3 bg-amazon-light_dark hover:bg-gray-700 text-center text-xs font-bold transition"
        >
          Back to top
        </button>

        {/* Footer Links Columns */}
        <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-gray-300">
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Get to Know Us</h4>
            <p className="hover:underline cursor-pointer">About Amazon Nova</p>
            <p className="hover:underline cursor-pointer">Autonomous Retail AI</p>
            <p className="hover:underline cursor-pointer">Science & Sustainability</p>
            <p className="hover:underline cursor-pointer">Investor Relations</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Make Money with Us</h4>
            <p className="hover:underline cursor-pointer">Sell on Amazon Nova</p>
            <p className="hover:underline cursor-pointer">Supply Chain by AI</p>
            <p className="hover:underline cursor-pointer">Become an Affiliate</p>
            <p className="hover:underline cursor-pointer">Advertise Your Products</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Amazon Payment Products</h4>
            <p className="hover:underline cursor-pointer">Amazon Visa Card</p>
            <p className="hover:underline cursor-pointer">Shop with Points</p>
            <p className="hover:underline cursor-pointer">Reload Your Balance</p>
            <p className="hover:underline cursor-pointer">Currency Converter</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Let Us Help You</h4>
            <p className="hover:underline cursor-pointer">Your Account</p>
            <p className="hover:underline cursor-pointer">Your Orders</p>
            <p className="hover:underline cursor-pointer">Shipping Rates & Policies</p>
            <p className="hover:underline cursor-pointer">Help & Nova Copilot Support</p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-800 py-6 text-center text-gray-400 space-y-2">
          <p className="font-bold text-white text-sm">amazon nova</p>
          <p>© 2026, Amazon Nova Inc. or its affiliates. Built with Flask, PostgreSQL & Next.js.</p>
        </div>
      </footer>
    </div>
  );
}
