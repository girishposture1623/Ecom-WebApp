import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

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
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ color: "#f97316" }}>Manage Products</h2>

        <Link to="/admin/add-product" style={addBtn}>
          + Add Product
        </Link>
      </div>

      <input
        type="text"
        placeholder="🔍 Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={emptyStyle}>
                  Loading Products...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" style={emptyStyle}>
                  No Product Found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} style={rowStyle}>
                  <td style={tdStyle}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>

                  <td style={tdStyle}>{product.name}</td>

                  <td style={tdStyle}>
                    ₹{Number(product.price).toFixed(2)}
                  </td>

                  <td style={tdStyle}>{product.category}</td>

                  <td style={tdStyle}>{product.stock}</td>

                  <td style={tdStyle}>
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      style={editBtn}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>
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

const containerStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
  padding: "30px",
  background: "#18181b",
  borderRadius: "12px",
  color: "#fff",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const addBtn = {
  background: "#f97316",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px",
  textDecoration: "none",
};

const searchStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#111827",
  color: "#fff",
  fontSize: "16px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  padding: "15px",
  background: "#27272a",
  textAlign: "left",
};

const tdStyle = {
  padding: "15px",
  borderBottom: "1px solid #333",
};

const rowStyle = {
  transition: ".3s",
};

const emptyStyle = {
  textAlign: "center",
  padding: "30px",
  color: "#999",
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  padding: "8px 14px",
  borderRadius: "6px",
  textDecoration: "none",
  marginRight: "10px",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminProducts;