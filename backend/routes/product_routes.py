from flask import Blueprint, jsonify, request
from models import Product, Category, Review, db
from services.ai_service import AIService

product_bp = Blueprint('products', __name__)

@product_bp.route('/products', methods=['GET'])
def get_products():
    category_slug = request.args.get('category')
    search_query = request.args.get('q')
    ai_mode = request.args.get('ai_mode', 'false').lower() == 'true'
    
    query = Product.query
    if category_slug:
        cat = Category.query.filter_by(slug=category_slug).first()
        if cat:
            query = query.filter_by(category_id=cat.id)
            
    products = query.all()
    
    if search_query:
        if ai_mode:
            # Semantic search with natural language parsing
            ai_results = AIService.semantic_search(search_query, products)
            return jsonify({
                "mode": "semantic_ai",
                "count": len(ai_results),
                "products": [item["product"] for item in ai_results],
                "meta": ai_results
            })
        else:
            search_lower = search_query.lower()
            filtered = [p.to_dict() for p in products if search_lower in p.title.lower() or search_lower in p.description.lower()]
            return jsonify({
                "mode": "standard",
                "count": len(filtered),
                "products": filtered
            })
            
    return jsonify({
        "mode": "standard",
        "count": len(products),
        "products": [p.to_dict() for p in products]
    })

@product_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    reviews = Review.query.filter_by(product_id=product.id).all()
    reviews_data = [r.to_dict() for r in reviews]
    
    # Generate on-the-fly AI review synthesis & customer sentiment
    ai_synthesis = AIService.generate_review_summary(product.to_dict(), reviews_data)
    
    # Also find frequently bought together products
    related = Product.query.filter(Product.id != product.id, Product.category_id == product.category_id).limit(3).all()
    
    return jsonify({
        "product": product.to_dict(),
        "reviews": reviews_data,
        "ai_synthesis": ai_synthesis,
        "frequently_bought_together": [r.to_dict() for r in related]
    })

@product_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([c.to_dict() for c in categories])
