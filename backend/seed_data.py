from models import db, User, Category, Product, Review
from werkzeug.security import generate_password_hash

def seed_database():
    # Only seed if no products exist
    if Product.query.first():
        return

    print("Seeding database with ultra-modern Amazon-style catalog and AI metadata...")
    
    # 1. Create Demo User
    user = User(
        name="Alex Rivera",
        email="alex@primecustomer.com",
        password_hash=generate_password_hash("password123"),
        is_prime=True
    )
    db.session.add(user)
    db.session.flush()

    # 2. Categories
    categories = [
        Category(name="Electronics & Gadgets", slug="electronics", icon="cpu"),
        Category(name="Computers & AI Tech", slug="computers", icon="laptop"),
        Category(name="Smart Home & Audio", slug="smart-home", icon="home"),
        Category(name="Wearables & Watches", slug="wearables", icon="watch"),
        Category(name="Gaming Gear", slug="gaming", icon="gamepad-2")
    ]
    for c in categories:
        db.session.add(c)
    db.session.flush()

    cat_map = {c.slug: c.id for c in categories}

    # 3. Amazon-like rich products
    products = [
        Product(
            title="Aura ANC Pro Wireless Noise-Cancelling Headphones",
            description="Ultra-low latency lossless audio with active ambient sound cancellation, adaptive spatial soundscape, and 45-hour battery life. Engineered for studio creators and travelers.",
            price=279.99,
            original_price=349.99,
            stock=42,
            rating=4.9,
            rating_count=3820,
            image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            badge="Amazon's Choice",
            category_id=cat_map["electronics"],
            ai_badge="AI Best in Sound Isolation 2026",
            ai_summary="AI Review Synthesis: Over 97% of buyers praise the adaptive noise cancellation and lightweight titanium band. Zero reported latency during conference calls.",
            ai_features_highlight="Active Noise Cancellation;45hr Fast-Charge Battery;Spatial AI Audio;Titanium Lightweight Frame",
            tags="audio,headphones,wireless,anc,bluetooth"
        ),
        Product(
            title="QuantumBook Neo 16-inch M4 Ultra Laptop (32GB RAM, 1TB SSD)",
            description="Next-gen neural AI architecture with 120Hz Liquid OLED display, all-day 22-hour battery life, and liquid cooling. Built for machine learning and heavy 3D rendering.",
            price=1899.00,
            original_price=2199.00,
            stock=18,
            rating=4.8,
            rating_count=1420,
            image_url="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
            badge="Overall Pick",
            category_id=cat_map["computers"],
            ai_badge="AI Top Computational Performance",
            ai_summary="AI Analysis: Top-ranked laptop for code compilation and deep learning workloads. Reviewers highlight whisper-quiet thermal efficiency under 100% stress.",
            ai_features_highlight="32GB Unified Memory;1TB Gen5 NVMe;120Hz Liquid OLED;22hr Battery Life",
            tags="laptop,computer,coding,apple,m4,ai"
        ),
        Product(
            title="OmniSphere 360 AI Smart Home Hub & High-Res Display",
            description="Voice-driven home management with live camera feeds, Matter protocol interoperability, Dolby Atmos speaker, and private offline edge-AI voice commands.",
            price=129.50,
            original_price=179.99,
            stock=85,
            rating=4.7,
            rating_count=980,
            image_url="https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80",
            badge="Limited Time Deal",
            category_id=cat_map["smart-home"],
            ai_badge="AI Smart Home Editor's Choice",
            ai_summary="AI Review Synthesis: Seamless setup with 200+ smart home brands. Customers adore the instant local voice response and crisp Dolby audio.",
            ai_features_highlight="Dolby Atmos Audio;Matter & Zigbee Support;Private Offline Edge AI;10-inch HD Display",
            tags="smart home,speaker,alexa,hub,display"
        ),
        Product(
            title="Chronos Apex Titanium Smartwatch with Biometric ECG",
            description="Sapphire crystal glass casing, dual-frequency GPS, VO2 max tracking, continuous blood oxygen & stress telemetry, waterproof up to 100 meters.",
            price=389.00,
            original_price=449.00,
            stock=60,
            rating=4.9,
            rating_count=2150,
            image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            badge="Best Seller",
            category_id=cat_map["wearables"],
            ai_badge="AI Health & Fitness Benchmark",
            ai_summary="AI Review Synthesis: Rated highest for sleep stage tracking accuracy and rugged outdoor durability. Battery consistently lasts 14 days per charge.",
            ai_features_highlight="Grade 5 Titanium;14-Day Battery;Dual-Frequency GPS;Medical Grade ECG",
            tags="smartwatch,fitness,apple watch,garmin,health"
        ),
        Product(
            title="Vortex HyperGlide Wireless Esports Gaming Mouse (32,000 DPI)",
            description="Ultra-lightweight 49g honeycomb chassis, optical switches rated for 90 million clicks, 8000Hz polling rate for instantaneous competitive reaction.",
            price=89.99,
            original_price=119.99,
            stock=75,
            rating=4.8,
            rating_count=4510,
            image_url="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
            badge="Amazon's Choice",
            category_id=cat_map["gaming"],
            ai_badge="AI Precision Aim Benchmark",
            ai_summary="AI Review Synthesis: Pro gamers award this mouse top marks for glide balance and zero sensor jitter. 95% of buyers recommend for competitive FPS.",
            ai_features_highlight="49 Gram Ultra-Light;8000Hz Polling Rate;32K Optical Sensor;90hr Battery Life",
            tags="mouse,gaming,esports,wireless,pc"
        ),
        Product(
            title="VisionPro Horizon 4K Ultra OLED Gaming Monitor (240Hz, 0.03ms)",
            description="32-inch curved QD-OLED masterpiece with infinite contrast, true HDR 1000, KVM switch, and custom anti-glare micro-texture panel.",
            price=799.00,
            original_price=999.00,
            stock=22,
            rating=4.9,
            rating_count=870,
            image_url="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
            badge="Limited Time Deal",
            category_id=cat_map["gaming"],
            ai_badge="AI Display of the Year",
            ai_summary="AI Review Synthesis: Stunning color reproduction and inky true blacks. Instant response time eliminates motion blur completely in all titles.",
            ai_features_highlight="4K QD-OLED;240Hz Ultra-Fluid Refresh;0.03ms GtG Response;Built-in KVM Switch",
            tags="monitor,gaming,oled,4k,display"
        )
    ]

    for p in products:
        db.session.add(p)
    db.session.flush()

    # 4. Verified Customer Reviews
    for p in products:
        r1 = Review(
            product_id=p.id,
            user_id=user.id,
            rating=5,
            title="Beyond expectations - beats any competitor I've tried!",
            content=f"Purchased this {p.title} during Prime Week. The build quality, speed, and reliability blew me away. Arrived next morning in pristine packaging.",
            verified_purchase=True,
            sentiment="positive"
        )
        r2 = Review(
            product_id=p.id,
            user_id=user.id,
            rating=5,
            title="Top tier recommendation, AI copilot was spot on",
            content="I used the AI shopping assistant to compare this model with others and it made the right call. 10/10 purchase.",
            verified_purchase=True,
            sentiment="positive"
        )
        db.session.add(r1)
        db.session.add(r2)

    db.session.commit()
    print("Database successfully seeded with 6 flagship products, reviews, categories, and AI tags.")
