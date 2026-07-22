import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import { removeFromWishlist } from "../redux/WishlistSlice";
import "../Styles/Wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    alert("Added to Cart");
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="wishlist-container">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <h3>Your Wishlist is Empty</h3>

          <Link to="/shop" className="shop-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div className="wishlist-card" key={product._id}>
              <img src={product.imageUrl} alt={product.name} />

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>

              <div className="wishlist-buttons">
                <button
                  className="cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;