'use client';

import React from 'react';
import { Menu, Sparkles, Zap, Gift, Award, Flame, Cpu, ArrowUpRight } from 'lucide-react';

interface SubNavProps {
  onCategorySelect: (slug: string) => void;
  onOpenCopilot: () => void;
}

export const SubNav: React.FC<SubNavProps> = ({ onCategorySelect, onOpenCopilot }) => {
  const departments = [
    { name: "Today's Deals", icon: Zap, action: () => onCategorySelect('all') },
    { name: "AI Innovations 2026", icon: Sparkles, highlight: true, action: onOpenCopilot },
    { name: "Electronics", icon: Cpu, action: () => onCategorySelect('Electronics & Gadgets') },
    { name: "Computers", action: () => onCategorySelect('Computers & AI Tech') },
    { name: "Smart Home", action: () => onCategorySelect('Smart Home & Audio') },
    { name: "Wearables", action: () => onCategorySelect('Wearables & Watches') },
    { name: "Gaming Gear", action: () => onCategorySelect('Gaming Gear') },
    { name: "Prime Video", action: () => onCategorySelect('all') },
    { name: "Registry & Gifts", icon: Gift, action: () => onCategorySelect('all') },
  ];

  return (
    <div className="bg-amazon-light_dark text-white text-xs select-none border-b border-gray-700/60 shadow-sm">
      <div className="max-w-[1540px] mx-auto px-4 py-1.5 flex items-center gap-4 overflow-x-auto scrollbar-none">
        {/* All Hamburger Menu */}
        <button
          onClick={() => onCategorySelect('all')}
          className="flex items-center gap-1.5 font-bold hover:border border-white/40 px-2 py-1 rounded transition text-white whitespace-nowrap"
        >
          <Menu className="w-4 h-4" />
          <span>All</span>
        </button>

        {departments.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              className={`flex items-center gap-1 hover:border border-white/40 px-2 py-1 rounded transition whitespace-nowrap ${
                item.highlight
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-yellow-200 font-bold shadow-sm'
                  : 'text-gray-200 font-medium'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{item.name}</span>
              {item.highlight && <span className="text-[10px] bg-yellow-300 text-purple-950 px-1 rounded font-black">NEW</span>}
            </button>
          );
        })}

        <div className="ml-auto hidden xl:flex items-center gap-1 text-amazon-yellow font-bold hover:underline cursor-pointer">
          <span>AI Price Guarantee</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
