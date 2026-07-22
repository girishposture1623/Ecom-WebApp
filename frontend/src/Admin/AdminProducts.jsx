import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "../Styles/AdminProducts.css";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/product");
      const data = await res.json();

      if (res.ok) {
        setProducts(Array.isArray(data) ? data : []);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        alert("Product Deleted Successfully");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ap-container">

  <div className="ap-header">

    <div>
      <h1>Manage Products</h1>
      <p>Manage all products from one place.</p>
    </div>

    <Link
      to="/admin/add-product"
      className="ap-add-btn"
    >
      + Add Product
    </Link>

  </div>

  <div className="ap-search-box">

    <input
      type="text"
      placeholder="🔍 Search Product..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="ap-search"
    />

  </div>

  <div className="ap-total">
    Total Products : {filteredProducts.length}
  </div>

  <div className="ap-table-wrapper">

    <table className="ap-table">

      <thead>

        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>

      </thead>

      <tbody>

        {loading ? (

          <tr>
            <td colSpan="6" className="ap-empty">
              Loading Products...
            </td>
          </tr>

        ) : filteredProducts.length === 0 ? (

          <tr>
            <td colSpan="6" className="ap-empty">
              No Products Found
            </td>
          </tr>

        ) : (

          filteredProducts.map((product) => (

            <tr key={product._id}>

              <td>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="ap-image"
                />
              </td>

              <td>{product.name}</td>

              <td>₹{Number(product.price).toFixed(2)}</td>

              <td>{product.category}</td>

              <td>
                <span
                  className={
                    product.stock > 0
                      ? "ap-stock ap-in-stock"
                      : "ap-stock ap-out-stock"
                  }
                >
                  {product.stock}
                </span>
              </td>

              <td>

                <div className="ap-actions">

                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="ap-edit-btn"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="ap-delete-btn"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>
  );
};

export default AdminProducts;