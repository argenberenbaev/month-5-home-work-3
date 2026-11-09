function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <div className="product-info">
        <h3>{product.title}</h3>

        <p className="category">{product.category}</p>

        <p className="description">{product.description}</p>

        <div className="product-bottom">
          <span className="price">${product.price}</span>
          <span className="rating">⭐ {product.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;