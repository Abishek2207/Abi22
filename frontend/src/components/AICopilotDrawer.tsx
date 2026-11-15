'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ShoppingCart, ArrowRight, Zap, RefreshCw, ThumbsUp } from 'lucide-react';
import { Product } from '../lib/types';
import { askAICopilot } from '../lib/api';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  products?: Product[];
  actions?: string[];
  timestamp: string;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onViewProduct,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm **Nova Copilot**, your next-generation autonomous AI shopping concierge. I don't just search keywords—I analyze live specs, compare hardware benchmarks, synthesize thousands of verified reviews, and find hidden price drops.\n\nHow can I help you shop today?",
      actions: [
        "Headphones under $300 with top ANC",
        "Compare QuantumBook M4 vs Gaming PC",
        "Best battery smartwatch for fitness",
        "Show today's 20%+ lightning deals"
      ],
      timestamp: "Just now"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await askAICopilot(textToSend);
      const aiMsg: Message = {
        sender: 'ai',
        text: response.reply,
        products: response.suggested_products,
        actions: response.suggested_actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "I encountered a brief latency spike while accessing the catalog neural index. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-purple-300/50">
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-amazon-dark px-4 py-3.5 text-white flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-md">
              <Bot className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-sm tracking-wide text-white">Nova AI Shopping Copilot</h2>
                <span className="text-[10px] bg-yellow-400 text-purple-950 font-extrabold px-1.5 py-0.2 rounded">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-purple-200">Autonomous product reasoning & comparison</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-gray-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/80">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {/* Formatting markdown bullet points and bolding */}
                <div className="whitespace-pre-wrap">{m.text}</div>

                {/* Suggested Products within chat */}
                {m.products && m.products.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-600" /> AI Picked Matches
                    </p>
                    {m.products.map((p) => (
                      <div
                        key={p.id}
                        className="bg-purple-50/60 p-2.5 rounded-lg border border-purple-200/80 flex items-center gap-3 hover:bg-purple-50 transition"
                      >
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-12 h-12 object-contain bg-white rounded border border-gray-200 p-1"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs text-gray-900 truncate">{p.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-bold text-xs text-purple-900">${p.price}</span>
                            <span className="text-[10px] text-emerald-600 font-medium">Prime Next-Day</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onAddToCart(p)}
                            className="p-1.5 bg-amazon-yellow hover:bg-amazon-orange rounded-full text-amazon-dark shadow transition"
                            title="Add to cart directly"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onViewProduct(p)}
                            className="p-1.5 bg-white hover:bg-gray-100 rounded-full text-gray-700 border border-gray-300 transition"
                            title="View AI specs"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action prompts pills */}
              {m.actions && m.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                  {m.actions.map((act, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => handleSend(act)}
                      className="text-[11px] font-medium bg-white hover:bg-purple-100 text-purple-900 px-2.5 py-1 rounded-full border border-purple-200 shadow-xs transition flex items-center gap-1 active:scale-95"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                      <span>{act}</span>
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-gray-400 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-50 p-3 rounded-lg border border-purple-200 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
              <span>Nova Copilot is synthesizing specifications & customer sentiment...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything (e.g., 'Compare best options under $1000')..."
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-full shadow transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-gray-400">
            <span>Powered by Flask backend + PostgreSQL</span>
            <span>Real-time AI Sentiment Analyzer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
