import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    stock: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/product/${id}`);

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
      });

      setPreview(data.imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("stock", formData.stock);

      if (image) {
        productData.append("image", image);
      }

      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: productData,
      });

      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#18181b",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <h2
        style={{
          color: "#f97316",
          marginBottom: "25px",
        }}
      >
        Edit Product
      </h2>

      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          placeholder="Product Name"
          style={inputStyle}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={changeHandler}
          rows="4"
          placeholder="Description"
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={changeHandler}
          placeholder="Price"
          style={inputStyle}
        />

        <select
          name="category"
          value={formData.category}
          onChange={changeHandler}
          style={inputStyle}
        >
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home</option>
          <option>Beauty</option>
          <option>Books</option>
          <option>Sports</option>
          <option>Toys</option>
          <option>Groceries</option>
          <option>Accessories</option>
          <option>Other</option>
        </select>

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={changeHandler}
          placeholder="Stock"
          style={inputStyle}
        />

        {preview && (
          <img
            src={preview}
            alt=""
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={imageHandler}
          style={{
            color: "white",
          }}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #333",
  background: "#09090b",
  color: "#fff",
  fontSize: "15px",
};

const buttonStyle = {
  padding: "15px",
  background: "#f97316",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default EditProduct;