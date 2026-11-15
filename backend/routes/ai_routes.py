from flask import Blueprint, jsonify, request
from models import Product, CartItem, db
from services.ai_service import AIService

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/ai/copilot/chat', methods=['POST'])
def copilot_chat():
    data = request.json or {}
    message = data.get('message', '').strip()
    
    if not message:
        return jsonify({"reply": "Hello! How can I assist with your shopping today?"})
        
    products = [p.to_dict() for p in Product.query.all()]
    cart_items = [c.to_dict() for c in CartItem.query.all()]
    
    response = AIService.chat_copilot(message, products, cart_items)
    return jsonify(response)

@ai_bp.route('/ai/recommendations', methods=['GET'])
def get_ai_recommendations():
    """
    Returns AI-curated product tiers: 'Trending AI Picks', 'Lightning Tech Deals', 'Smart Home Essentials'
    """
    products = Product.query.all()
    products_data = [p.to_dict() for p in products]
    
    ai_picks = [p for p in products_data if p.get('badge') in ["AI Choice", "Best Seller", "Overall Pick"]]
    hot_deals = [p for p in products_data if p.get('original_price') and p['original_price'] > p['price']]
    
    return jsonify({
        "ai_top_picks": ai_picks[:4],
        "lightning_deals": hot_deals[:4],
        "all_recommendations": products_data[:6]
    })
