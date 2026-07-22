import { Link } from "react-router-dom";

import "../Styles/product.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">

      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">

        <h3>{product.name}</h3>

        

        <p className="price">
          ₹{product.price.toLocaleString()}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;