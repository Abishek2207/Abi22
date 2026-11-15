import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db
from seed_data import seed_database
from routes.product_routes import product_bp
from routes.cart_routes import cart_bp
from routes.order_routes import order_bp
from routes.ai_routes import ai_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Configure CORS for Next.js frontend (default Next.js runs on 3000)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Test database connectivity before init_app to provide zero-downtime fallback
    db_uri = app.config['SQLALCHEMY_DATABASE_URI']
    if 'postgresql' in db_uri:
        from sqlalchemy import create_engine
        try:
            test_engine = create_engine(db_uri, connect_args={'connect_timeout': 2})
            with test_engine.connect() as conn:
                pass
            print(f"Connected to PostgreSQL database: {db_uri.split('@')[-1]}")
        except Exception as e:
            print(f"PostgreSQL connection offline or unavailable ({e}). Running local SQLite store (instance/ecommerce.db).")
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'

    db.init_app(app)
    with app.app_context():
        db.create_all()
        seed_database()

    # Register Blueprints
    app.register_blueprint(product_bp, url_prefix='/api')
    app.register_blueprint(cart_bp, url_prefix='/api')
    app.register_blueprint(order_bp, url_prefix='/api')
    app.register_blueprint(ai_bp, url_prefix='/api')

    @app.route('/')
    def root():
        return jsonify({
            "status": "online",
            "service": "NextGen AI E-Commerce API (Flask + PostgreSQL)",
            "version": "2.0.0",
            "endpoints": [
                "/api/products",
                "/api/categories",
                "/api/cart",
                "/api/orders",
                "/api/ai/copilot/chat",
                "/api/ai/recommendations"
            ]
        })

    return app

if __name__ == '__main__':
    application = create_app()
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Flask E-Commerce Core API on port {port}...")
    application.run(host='0.0.0.0', port=port, debug=True)
