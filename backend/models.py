from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_prime = db.Column(db.Boolean, default=True) # Prime VIP membership
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    orders = db.relationship('Order', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "is_prime": self.is_prime,
            "created_at": self.created_at.isoformat()
        }

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    slug = db.Column(db.String(80), nullable=False, unique=True)
    icon = db.Column(db.String(50), default="sparkles")
    
    products = db.relationship('Product', backref='category', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "icon": self.icon
        }

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float, nullable=True)
    stock = db.Column(db.Integer, default=50)
    rating = db.Column(db.Float, default=4.8)
    rating_count = db.Column(db.Integer, default=1240)
    image_url = db.Column(db.String(512), nullable=False)
    badge = db.Column(db.String(80), default="Best Seller") # "Amazon's Choice", "Overall Pick", "Limited Deal"
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    
    # Advanced AI Features metadata
    ai_badge = db.Column(db.String(120), default="AI Verified Excellence")
    ai_summary = db.Column(db.Text, nullable=True) # AI generated synthesis of pros/cons
    ai_features_highlight = db.Column(db.Text, nullable=True) # JSON or semicolon separated
    tags = db.Column(db.String(255), default="") # e.g. "wireless,noise-cancelling,audio"
    
    reviews = db.relationship('Review', backref='product', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "original_price": self.original_price,
            "stock": self.stock,
            "rating": self.rating,
            "rating_count": self.rating_count,
            "image_url": self.image_url,
            "badge": self.badge,
            "category_id": self.category_id,
            "category_name": self.category.name if self.category else "",
            "ai_badge": self.ai_badge,
            "ai_summary": self.ai_summary,
            "ai_features_highlight": self.ai_features_highlight.split(";") if self.ai_features_highlight else [],
            "tags": [t.strip() for t in self.tags.split(",") if t.strip()]
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    verified_purchase = db.Column(db.Boolean, default=True)
    sentiment = db.Column(db.String(20), default="positive") # positive, neutral, negative
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "user_id": self.user_id,
            "user_name": self.user.name if self.user else "Verified Customer",
            "rating": self.rating,
            "title": self.title,
            "content": self.content,
            "verified_purchase": self.verified_purchase,
            "sentiment": self.sentiment,
            "created_at": self.created_at.strftime("%B %d, %Y")
        }

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    
    product = db.relationship('Product')

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "product": self.product.to_dict() if self.product else None,
            "quantity": self.quantity,
            "subtotal": round((self.product.price * self.quantity), 2) if self.product else 0.0
        }

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="Confirmed") # Confirmed, Out for Delivery, Delivered
    delivery_address = db.Column(db.String(255), default="742 Evergreen Terrace, Springfield")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    items = db.relationship('OrderItem', backref='order', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_amount": self.total_amount,
            "status": self.status,
            "delivery_address": self.delivery_address,
            "created_at": self.created_at.isoformat(),
            "items": [item.to_dict() for item in self.items]
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    price_at_purchase = db.Column(db.Float, nullable=False)

    product = db.relationship('Product')

    def to_dict(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "product_title": self.product.title if self.product else "",
            "quantity": self.quantity,
            "price": self.price_at_purchase
        }
