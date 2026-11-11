from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PRODUCTS = [
    {"id": "1", "name": " გაზ 1000 Laptop", "description": "15-inch business laptop", "price": 899.99},
    {"id": "2", "name": "Galaxy S24", "description": "128 GB smartphone", "price": 799.00},
    {"id": "3", "name": "iPad Air", "description": "11-inch tablet", "price": 599.00},
    {"id": "4", "name": "Sony WH-1000XM5", "description": "Wireless noise-cancelling headphones", "price": 349.99},
]

@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "product-details"})

@app.get("/api/products")
def get_products():
    return jsonify(PRODUCTS)

@app.get("/api/products/<product_id>")
def get_product(product_id):
    product = next((item for item in PRODUCTS if item["id"] == product_id), None)
    if product is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

if __name__ == "__main__":
    import os
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "8080")))
