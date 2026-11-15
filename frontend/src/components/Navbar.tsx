'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, Sparkles, Menu, ChevronDown, Bot, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCopilot: () => void;
  onSearch: (query: string, aiMode: boolean, category: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenCopilot,
  onSearch,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [aiMode, setAiMode] = useState(true);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput, aiMode, selectedCategory);
  };

  return (
    <header className="sticky top-0 z-40 bg-amazon-dark text-white select-none">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 px-4 py-1.5 text-xs flex items-center justify-between border-b border-indigo-700/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
          <span className="font-semibold text-yellow-200">Amazon Nova AI Experience:</span>
          <span className="text-gray-200 hidden sm:inline">Semantic Neural Search, Predictive Price Tracking & Autonomous Copilot Active</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Prime AI Verified
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">Fast Delivery: <strong>Tomorrow, 8 PM</strong></span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1540px] mx-auto px-4 py-2.5 flex items-center gap-4">
        {/* Amazon Logo with Nova Branding */}
        <div className="flex items-center gap-1 hover:border border-white/20 p-1.5 rounded cursor-pointer transition">
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black tracking-tight text-white flex items-center">
              amazon<span className="text-amazon-orange text-3xl leading-none">.</span>
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-gradient-to-r from-indigo-500 to-purple-600 font-bold uppercase tracking-wider text-white shadow-sm">
                NOVA AI
              </span>
            </span>
            <span className="text-[10px] text-amazon-yellow -mt-1 font-semibold flex items-center gap-1">
              prime <span className="text-white/60">ultra</span>
            </span>
          </div>
        </div>

        {/* Deliver to address */}
        <div className="hidden lg:flex items-center gap-1 hover:border border-white/20 p-1.5 rounded cursor-pointer transition">
          <MapPin className="w-4 h-4 text-white" />
          <div className="text-xs leading-tight">
            <p className="text-gray-400 text-[11px]">Deliver to Alex</p>
            <p className="font-bold text-white">Springfield 97477</p>
          </div>
        </div>

        {/* Global Search Bar with AI Mode Toggle */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-3xl flex items-center shadow-lg">
          {/* Category Dropdown */}
          <div className="relative hidden md:block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 bg-gray-200 hover:bg-gray-300 text-gray-900 text-xs rounded-l-md px-2.5 border-r border-gray-300 outline-none cursor-pointer font-medium"
            >
              <option value="all">All Departments</option>
              <option value="Electronics & Gadgets">Electronics</option>
              <option value="Computers & AI Tech">Computers & AI</option>
              <option value="Smart Home & Audio">Smart Home</option>
              <option value="Wearables & Watches">Wearables</option>
              <option value="Gaming Gear">Gaming Gear</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={aiMode ? "Ask Nova AI: 'Best laptop for deep learning under $2000'..." : "Search Amazon Nova..."}
              className="w-full h-10 px-3.5 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-amazon-amber placeholder:text-gray-400 md:rounded-none rounded-l-md"
            />
          </div>

          {/* AI Mode Toggle Pill */}
          <button
            type="button"
            onClick={() => setAiMode(!aiMode)}
            className={`h-10 px-3 flex items-center gap-1.5 text-xs font-semibold transition border-l border-gray-300 ${
              aiMode
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-yellow-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Toggle Neural Semantic Search vs Exact Match"
          >
            <Sparkles className={`w-3.5 h-3.5 ${aiMode ? 'text-yellow-300 animate-spin' : 'text-gray-400'}`} />
            <span className="hidden sm:inline">AI Neural Search</span>
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="h-10 px-5 bg-amazon-yellow hover:bg-amazon-orange text-amazon-dark rounded-r-md flex items-center justify-center transition font-bold"
          >
            <Search className="w-5 h-5 text-gray-900" />
          </button>
        </form>

        {/* AI Copilot Quick Launcher Button */}
        <button
          onClick={onOpenCopilot}
          className="relative hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition"
        >
          <Bot className="w-4 h-4 text-yellow-300" />
          <span>Ask Nova Copilot</span>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300"></span>
          </span>
        </button>

        {/* Account & Lists */}
        <div className="hidden md:flex flex-col hover:border border-white/20 p-1.5 rounded cursor-pointer transition text-xs leading-tight">
          <span className="text-gray-400 text-[11px]">Hello, Alex</span>
          <span className="font-bold flex items-center gap-0.5">
            Account & Lists <ChevronDown className="w-3 h-3 text-gray-400" />
          </span>
        </div>

        {/* Returns & Orders */}
        <div className="hidden sm:flex flex-col hover:border border-white/20 p-1.5 rounded cursor-pointer transition text-xs leading-tight">
          <span className="text-gray-400 text-[11px]">Returns</span>
          <span className="font-bold">& Orders</span>
        </div>

        {/* Cart */}
        <div
          onClick={onOpenCart}
          className="flex items-center gap-1.5 hover:border border-white/20 p-1.5 rounded cursor-pointer transition relative"
        >
          <div className="relative">
            <ShoppingCart className="w-8 h-8 text-white" />
            <span className="absolute -top-1 -right-1 bg-amazon-orange text-amazon-dark font-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="font-bold text-sm hidden sm:inline mt-2">Cart</span>
        </div>
      </div>
    </header>
  );
};
