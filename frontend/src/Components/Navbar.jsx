import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import { useSelector } from "react-redux";
import { AuthContext } from "../Context/AuthContext";

import "../Styles/navbar.css";
import logo from "../assets/Shoplix.PNG";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}

      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Shoplix" className="nav-logo" />
          <span>Shoplix</span>
        </Link>
      </div>

      {/* Hamburger */}

      <button className="menu-btn" onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Menu */}

      <ul className={menuOpen ? "navbar-links active" : "navbar-links"}>

        <li>
          <Link to="/shop" onClick={closeMenu}>
            Shop
          </Link>
        </li>

        <li>
          <Link
            to="/wishlist"
            className="wishlist-link"
            onClick={closeMenu}
          >
            <FiHeart className="wishlist-icon" />
            <span>Wishlist</span>

            <span className="wishlist-count">
              {wishlistItems.length}
            </span>
          </Link>
        </li>

        <li>
          <Link to="/cart" onClick={closeMenu}>
            <FiShoppingCart />
            Cart ({cartItems.length})
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile" onClick={closeMenu}>
                <FiUser />
                {user.name}
              </Link>
            </li>

            {user.role === "admin" && (
              <li>
                <Link to="/admin" onClick={closeMenu}>
                  Admin
                </Link>
              </li>
            )}

            <li>
              <button
                className="btn-logout"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;