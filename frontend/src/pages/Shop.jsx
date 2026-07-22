import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import "../Styles/Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shop-container">

      {/* Page Heading */}

      <div className="shop-header">
        <h1 className="shop-title">Explore Products</h1>

        <p className="shop-subtitle">
          Discover premium products at the best prices.
        </p>
      </div>

      {/* Search */}

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>


      {/* Loading */}

      {loading ? (
        <div className="loading">
          Loading Products...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          <h2>No Products Found</h2>
          <p>Try searching with another keyword.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Shop;