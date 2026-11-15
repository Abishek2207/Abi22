from flask import Blueprint, jsonify, request
from models import Order, OrderItem, CartItem, Product, db

order_bp = Blueprint('orders', __name__)

DEMO_USER_ID = 1

@order_bp.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.filter_by(user_id=DEMO_USER_ID).order_by(Order.created_at.desc()).all()
    return jsonify([o.to_dict() for o in orders])

@order_bp.route('/orders/checkout', methods=['POST'])
def checkout():
    cart_items = CartItem.query.filter_by(user_id=DEMO_USER_ID).all()
    if not cart_items:
        return jsonify({"error": "Cart is empty"}), 400
        
    subtotal = sum(item.product.price * item.quantity for item in cart_items if item.product)
    total = round(subtotal * 1.03, 2) # with tax/discount
    
    order = Order(
        user_id=DEMO_USER_ID,
        total_amount=total,
        status="Arriving Tomorrow by 8 PM (Prime Next-Day)",
        delivery_address="742 Evergreen Terrace, Springfield, OR"
    )
    db.session.add(order)
    db.session.flush()
    
    for item in cart_items:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_purchase=item.product.price
        )
        db.session.add(order_item)
        
    # Clear cart
    CartItem.query.filter_by(user_id=DEMO_USER_ID).delete()
    db.session.commit()
    
    return jsonify({
        "message": "Order placed successfully! Tracking active.",
        "order": order.to_dict()
    })
