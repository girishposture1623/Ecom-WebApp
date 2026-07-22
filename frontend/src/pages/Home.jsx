import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import "../Styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="home-container">

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            🛒 Trusted by Thousands
          </span>

          <h1>
            Discover Amazing Products
          </h1>

          <p>
            Shop the latest electronics, fashion, accessories and much more
            at unbeatable prices.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="shop-btn">
              Shop Now
            </Link>

            <Link to="/shop" className="explore-btn">
              Explore
            </Link>
          </div>

        </div>

      </section>

      {/* Featured */}

      <section className="featured">

        <div className="section-title">

          <h2>Featured Products</h2>

          <p>
            Best selling products picked for you
          </p>

        </div>

        {loading ? (

          <div className="loading">
            Loading Products...
          </div>

        ) : (

          <div className="product-grid">

            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>

        )}

      </section>

    </div>
  );
};

export default Home;