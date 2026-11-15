'use client';

import React from 'react';
import { Sparkles, Bot, Zap, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface HeroBannerProps {
  onOpenCopilot: () => void;
  onExploreDeals: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenCopilot, onExploreDeals }) => {
  return (
    <div className="relative bg-gradient-to-b from-[#131921] via-[#1b2533] to-[#EAEDED] pt-6 pb-20 px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-indigo-600/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1540px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Hero Message */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
            <span>Introducing Amazon Nova: Next-Generation Agentic Shopping</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            More Advanced than Amazon. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400">
              Powered by Live AI Copilot.
            </span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Experience real-time neural semantic searches, multi-vendor AI spec comparisons, instant verified review summaries, and sub-second 1-click Prime checkouts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenCopilot}
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-purple-900/30 hover:scale-[1.02] active:scale-95 transition"
            >
              <Bot className="w-5 h-5 text-yellow-300" />
              <span>Launch AI Copilot</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onExploreDeals}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition"
            >
              <Zap className="w-4 h-4 text-amazon-yellow" />
              <span>Explore Today's AI Picks</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="flex items-center gap-6 pt-3 text-xs text-gray-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              PostgreSQL ACID Data Security
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Sub-50ms Flask REST API
            </span>
          </div>
        </div>

        {/* Right Hero Interactive AI Spotlight Card */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/95 p-6 rounded-2xl border border-purple-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-gray-700/60">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-gray-300 tracking-wider uppercase">Live AI Copilot Agent</span>
              </div>
              <span className="text-xs font-mono text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded border border-purple-500/30">
                Nova v2.4
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="bg-gray-800/80 p-3 rounded-lg text-gray-300 border border-gray-700">
                <p className="font-semibold text-purple-300 mb-1 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5" /> Shopper Inquiry:
                </p>
                <p className="italic">"Find me ANC wireless headphones for long flights under $300 with 40h+ battery"</p>
              </div>

              <div className="bg-purple-950/40 p-3 rounded-lg text-gray-200 border border-purple-500/40">
                <p className="font-bold text-yellow-300 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Consensus Recommendation:
                </p>
                <p>
                  <strong>Aura ANC Pro ($279.99)</strong> matches 100% of constraints. 45-hour battery, adaptive titanium frame, and 98% verified positive noise-isolation rating.
                </p>
                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-purple-800/60">
                  <span className="text-amazon-yellow font-bold text-sm">$279.99 <span className="text-gray-400 line-through text-xs font-normal">$349.99</span></span>
                  <span className="text-emerald-400 font-semibold text-[11px]">Prime Overnight Eligible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
