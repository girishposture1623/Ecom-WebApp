import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import "../Styles/navbar.css";
import { useSelector } from 'react-redux'
import { AuthContext } from "../Context/AuthContext";

import logo from "../assets/Shoplix.PNG";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const createItems = useSelector((state) => state.cart.cartItems)
  const navigate = useNavigate()
const wishlistItems = useSelector((state) => state.wishlist.items);

  const handlelogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to='/'>
          <img src={logo} alt="Shoplix" className="nav-logo" /> Shoplix
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/wishlist" className="wishlist-link">
            <FiHeart className="wishlist-icon" />
            <span className="wishlist-count">
              {wishlistItems.length}
            </span>
          </Link>
        </li>
        <li>
          <Link to="/Cart">Cart({createItems.length})</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">Hi {user.name}</Link>
            </li>
            {user.role === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li>
              <button onClick={handlelogout} className="btn-logout">
                {" "}
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
