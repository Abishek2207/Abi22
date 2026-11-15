# Amazon Nova — Next-Generation AI-Powered E-Commerce Platform

An enterprise-grade, Amazon-inspired e-commerce platform that goes beyond standard online stores by natively integrating cutting-edge **Agentic AI capabilities**:

- **🤖 Autonomous AI Shopping Copilot ("Nova Copilot")**: Real-time natural language assistant capable of comparing complex hardware specifications, answering shopper questions, and triggering direct 1-click cart additions.
- **⚡ Neural Semantic Search & Intent Extraction**: Understands high-level queries like *"ANC headphones for long flights under $300"* and automatically filters by price, specs, and relevance.
- **📊 AI Review Synthesis & Sentiment Scoring**: Aggregates verified buyer feedback into actionable Pros/Cons highlights and sentiment distribution percentages with statistical confidence metrics.
- **🎯 Dynamic AI Deal Engine & Price Elasticity**: Algorithmically detects price changes, lightning deals, and Prime 1-day delivery schedules.
- **🛒 Prime 1-Click Checkout & Order Tracking**: Instant checkout workflow with order summary, address verification, and delivery tracking.

---

## 🛠️ Technology Stack

| Layer | Technology | Key Modules & Features |
|---|---|---|
| **Frontend** | **Next.js 14 (App Router)** | TypeScript, Tailwind CSS, Lucide Icons, Responsive Amazon Header |
| **Backend** | **Python Flask** | RESTful Blueprints, SQLAlchemy ORM, Flask-CORS, Modular Services |
| **Database** | **PostgreSQL** | Relational schemas for Users, Products, Reviews, Cart Items & Orders |
| **Containers** | **Docker & Docker Compose** | Multi-container orchestration (PostgreSQL + Flask + Next.js) |

---

## 🚀 Quick Start Guide

### Option 1: One-Click Docker Setup (Recommended)

Run the entire stack with PostgreSQL, Flask backend, and Next.js frontend:

```bash
docker compose up --build
```

- **Frontend Web UI**: [http://localhost:3000](http://localhost:3000)
- **Flask REST API**: [http://localhost:5000](http://localhost:5000)
- **PostgreSQL Database**: `localhost:5432` (Database: `ecommerce_db`)

---

### Option 2: Running Locally

#### 1. Backend (Flask + PostgreSQL / SQLite Fallback)

```bash
cd backend

# Create and activate virtual environment
python -m venv .venv
# Windows:
.\.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask API server
python app.py
```
*Note: The Flask application automatically seeds the database with flagship products, reviews, and AI tags upon initial launch. If local PostgreSQL is not configured, it gracefully runs with an automated SQLite instance.*

#### 2. Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live store!

---

## 📂 Project Architecture

```
Project_16/
├── backend/
│   ├── routes/
│   │   ├── product_routes.py   # Catalog endpoints & semantic AI search
│   │   ├── cart_routes.py      # Cart addition, updates & totals
│   │   ├── order_routes.py     # Prime 1-click checkout & orders
│   │   └── ai_routes.py        # Nova Copilot chat & recommendation endpoints
│   ├── services/
│   │   └── ai_service.py       # Review synthesis, semantic NLP & comparison logic
│   ├── models.py               # SQLAlchemy models (User, Product, Category, Review, Cart)
│   ├── config.py               # Database and API environment configuration
│   ├── seed_data.py            # Rich catalog data generator with reviews & AI tags
│   ├── app.py                  # Application factory & runner
│   ├── requirements.txt        # Python backend dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/                # Next.js App Router (page.tsx, layout.tsx, globals.css)
│   │   ├── components/
│   │   │   ├── Navbar.tsx            # Amazon Header with AI Neural search & Prime badge
│   │   │   ├── SubNav.tsx            # Department navigation & lightning deals
│   │   │   ├── HeroBanner.tsx        # Hero banner with AI Nova showcase
│   │   │   ├── ProductCard.tsx       # Amazon product cards with AI ratings & Prime logos
│   │   │   ├── AICopilotDrawer.tsx   # Interactive floating AI shopping copilot
│   │   │   ├── ProductModal.tsx      # Deep-dive specs with AI Pros/Cons review synthesis
│   │   │   └── CartDrawer.tsx        # Amazon-style slideout cart with 1-click checkout
│   │   └── lib/
│   │       ├── api.ts          # API connector with offline fallback support
│   │       └── types.ts        # TypeScript data interfaces
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
└── docker-compose.yml          # Multi-container orchestration
```
