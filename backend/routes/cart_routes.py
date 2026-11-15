from flask import Blueprint, jsonify, request
from models import CartItem, Product, db

cart_bp = Blueprint('cart', __name__)

# Default demo user ID
DEMO_USER_ID = 1

@cart_bp.route('/cart', methods=['GET'])
def get_cart():
    items = CartItem.query.filter_by(user_id=DEMO_USER_ID).all()
    subtotal = sum(item.product.price * item.quantity for item in items if item.product)
    prime_discount = round(subtotal * 0.05, 2) # 5% prime member savings
    estimated_tax = round(subtotal * 0.08, 2)
    final_total = round(subtotal - prime_discount + estimated_tax, 2)
    
    return jsonify({
        "items": [item.to_dict() for item in items],
        "count": sum(item.quantity for item in items),
        "subtotal": round(subtotal, 2),
        "prime_discount": prime_discount,
        "estimated_tax": estimated_tax,
        "total": final_total,
        "free_shipping": True
    })

@cart_bp.route('/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json or {}
    product_id = data.get('product_id')
    quantity = int(data.get('quantity', 1))
    
    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
        
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404
        
    item = CartItem.query.filter_by(user_id=DEMO_USER_ID, product_id=product_id).first()
    if item:
        item.quantity += quantity
    else:
        item = CartItem(user_id=DEMO_USER_ID, product_id=product_id, quantity=quantity)
        db.session.add(item)
        
    db.session.commit()
    return jsonify({"message": f"Added {product.title} to cart", "cart_item": item.to_dict()})

@cart_bp.route('/cart/update', methods=['PUT'])
def update_cart():
    data = request.json or {}
    item_id = data.get('item_id')
    quantity = int(data.get('quantity', 1))
    
    item = CartItem.query.filter_by(id=item_id, user_id=DEMO_USER_ID).first()
    if not item:
        return jsonify({"error": "Cart item not found"}), 404
        
    if quantity <= 0:
        db.session.delete(item)
    else:
        item.quantity = quantity
        
    db.session.commit()
    return jsonify({"message": "Cart updated successfully"})

@cart_bp.route('/cart/remove/<int:item_id>', methods=['DELETE'])
def remove_cart_item(item_id):
    item = CartItem.query.filter_by(id=item_id, user_id=DEMO_USER_ID).first()
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item removed from cart"})
    return jsonify({"error": "Item not found"}), 404

@cart_bp.route('/cart/clear', methods=['DELETE'])
def clear_cart():
    CartItem.query.filter_by(user_id=DEMO_USER_ID).delete()
    db.session.commit()
    return jsonify({"message": "Cart cleared"})
