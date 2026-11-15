import { Product, Category, CartData, AISynthesis } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fallbackProducts: Product[] = [
  {
    id: 1,
    title: "Aura ANC Pro Wireless Noise-Cancelling Headphones",
    description: "Ultra-low latency lossless audio with active ambient sound cancellation, adaptive spatial soundscape, and 45-hour battery life. Engineered for studio creators and travelers.",
    price: 279.99,
    original_price: 349.99,
    stock: 42,
    rating: 4.9,
    rating_count: 3820,
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    badge: "Amazon's Choice",
    category_id: 1,
    category_name: "Electronics & Gadgets",
    ai_badge: "AI Best in Sound Isolation 2026",
    ai_summary: "AI Review Synthesis: Over 97% of buyers praise the adaptive noise cancellation and lightweight titanium band. Zero reported latency during conference calls.",
    ai_features_highlight: ["Active Noise Cancellation", "45hr Fast-Charge Battery", "Spatial AI Audio", "Titanium Frame"],
    tags: ["audio", "headphones", "wireless", "anc", "bluetooth"]
  },
  {
    id: 2,
    title: "QuantumBook Neo 16-inch M4 Ultra Laptop (32GB RAM, 1TB SSD)",
    description: "Next-gen neural AI architecture with 120Hz Liquid OLED display, all-day 22-hour battery life, and liquid cooling. Built for machine learning and heavy 3D rendering.",
    price: 1899.00,
    original_price: 2199.00,
    stock: 18,
    rating: 4.8,
    rating_count: 1420,
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    badge: "Overall Pick",
    category_id: 2,
    category_name: "Computers & AI Tech",
    ai_badge: "AI Top Computational Performance",
    ai_summary: "AI Analysis: Top-ranked laptop for code compilation and deep learning workloads. Reviewers highlight whisper-quiet thermal efficiency under 100% stress.",
    ai_features_highlight: ["32GB Unified Memory", "1TB Gen5 NVMe", "120Hz Liquid OLED", "22hr Battery Life"],
    tags: ["laptop", "computer", "coding", "apple", "m4", "ai"]
  },
  {
    id: 3,
    title: "OmniSphere 360 AI Smart Home Hub & High-Res Display",
    description: "Voice-driven home management with live camera feeds, Matter protocol interoperability, Dolby Atmos speaker, and private offline edge-AI voice commands.",
    price: 129.50,
    original_price: 179.99,
    stock: 85,
    rating: 4.7,
    rating_count: 980,
    image_url: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80",
    badge: "Limited Time Deal",
    category_id: 3,
    category_name: "Smart Home & Audio",
    ai_badge: "AI Smart Home Editor's Choice",
    ai_summary: "AI Review Synthesis: Seamless setup with 200+ smart home brands. Customers adore the instant local voice response and crisp Dolby audio.",
    ai_features_highlight: ["Dolby Atmos Audio", "Matter & Zigbee Support", "Private Offline Edge AI", "10-inch HD Display"],
    tags: ["smart home", "speaker", "alexa", "hub", "display"]
  },
  {
    id: 4,
    title: "Chronos Apex Titanium Smartwatch with Biometric ECG",
    description: "Sapphire crystal glass casing, dual-frequency GPS, VO2 max tracking, continuous blood oxygen & stress telemetry, waterproof up to 100 meters.",
    price: 389.00,
    original_price: 449.00,
    stock: 60,
    rating: 4.9,
    rating_count: 2150,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    badge: "Best Seller",
    category_id: 4,
    category_name: "Wearables & Watches",
    ai_badge: "AI Health & Fitness Benchmark",
    ai_summary: "AI Review Synthesis: Rated highest for sleep stage tracking accuracy and rugged outdoor durability. Battery consistently lasts 14 days per charge.",
    ai_features_highlight: ["Grade 5 Titanium", "14-Day Battery", "Dual-Frequency GPS", "Medical Grade ECG"],
    tags: ["smartwatch", "fitness", "apple watch", "garmin", "health"]
  },
  {
    id: 5,
    title: "Vortex HyperGlide Wireless Esports Gaming Mouse (32,000 DPI)",
    description: "Ultra-lightweight 49g honeycomb chassis, optical switches rated for 90 million clicks, 8000Hz polling rate for instantaneous competitive reaction.",
    price: 89.99,
    original_price: 119.99,
    stock: 75,
    rating: 4.8,
    rating_count: 4510,
    image_url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
    badge: "Amazon's Choice",
    category_id: 5,
    category_name: "Gaming Gear",
    ai_badge: "AI Precision Aim Benchmark",
    ai_summary: "AI Review Synthesis: Pro gamers award this mouse top marks for glide balance and zero sensor jitter. 95% of buyers recommend for competitive FPS.",
    ai_features_highlight: ["49 Gram Ultra-Light", "8000Hz Polling Rate", "32K Optical Sensor", "90hr Battery Life"],
    tags: ["mouse", "gaming", "esports", "wireless", "pc"]
  },
  {
    id: 6,
    title: "VisionPro Horizon 4K Ultra OLED Gaming Monitor (240Hz, 0.03ms)",
    description: "32-inch curved QD-OLED masterpiece with infinite contrast, true HDR 1000, KVM switch, and custom anti-glare micro-texture panel.",
    price: 799.00,
    original_price: 999.00,
    stock: 22,
    rating: 4.9,
    rating_count: 870,
    image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    badge: "Limited Time Deal",
    category_id: 5,
    category_name: "Gaming Gear",
    ai_badge: "AI Display of the Year",
    ai_summary: "AI Review Synthesis: Stunning color reproduction and inky true blacks. Instant response time eliminates motion blur completely in all titles.",
    ai_features_highlight: ["4K QD-OLED", "240Hz Ultra-Fluid Refresh", "0.03ms GtG Response", "Built-in KVM Switch"],
    tags: ["monitor", "gaming", "oled", "4k", "display"]
  }
];

export async function fetchProducts(search?: string, aiMode: boolean = false, category?: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (aiMode) params.append('ai_mode', 'true');
    if (category && category !== 'all') params.append('category', category);
    
    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    if (!res.ok) throw new Error("Backend offline");
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.warn("Using offline catalog fallback:", err);
    let list = [...fallbackProducts];
    if (category && category !== 'all') {
      list = list.filter(p => p.category_name?.toLowerCase().includes(category.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    return list;
  }
}

export async function fetchProductDetail(id: number) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error("Product fetch failed");
    return await res.json();
  } catch {
    const product = fallbackProducts.find(p => p.id === id) || fallbackProducts[0];
    return {
      product,
      reviews: [
        {
          id: 101,
          product_id: product.id,
          user_name: "Sarah Jenkins (Amazon Verified Reviewer)",
          rating: 5,
          title: "Remarkable performance and AI assistance",
          content: "The AI recommendation matched my exact specs requirement. Couldn't be happier with Prime next day delivery.",
          verified_purchase: true,
          sentiment: "positive",
          created_at: "November 4, 2026"
        }
      ],
      ai_synthesis: {
        summary: `AI Customer Consensus: Verified buyers consistently praise the ${product.title} for extraordinary durability, instant responsiveness, and modern design.`,
        pros: ["98% Verified satisfaction rate", "Whisper-quiet energy optimization", "Seamless multi-device connectivity"],
        cons: ["High demand may limit immediate replacement stock"],
        sentiment_distribution: { positive: 96, neutral: 3, negative: 1 },
        ai_rating_confidence: "99.1%"
      },
      frequently_bought_together: fallbackProducts.filter(p => p.id !== product.id).slice(0, 2)
    };
  }
}

export async function askAICopilot(message: string): Promise<{ reply: string; suggested_products?: Product[]; suggested_actions?: string[] }> {
  try {
    const res = await fetch(`${API_BASE}/ai/copilot/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    if (!res.ok) throw new Error("AI service error");
    return await res.json();
  } catch {
    const q = message.toLowerCase();
    const matches = fallbackProducts.filter(p => 
      q.split(" ").some(word => word.length > 2 && (p.title.toLowerCase().includes(word) || p.tags.includes(word)))
    );
    const picks = matches.length > 0 ? matches : fallbackProducts.slice(0, 2);
    
    return {
      reply: `I analyzed our live inventory for **"${message}"**. Here are the highest-rated recommendations with prime delivery and verified 5-star AI ratings:`,
      suggested_products: picks,
      suggested_actions: ["Add to Cart with 1-Click", "Compare Battery & Specs", "View Price Graph"]
    };
  }
}
