import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "../Styles/profile.css";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/myOrders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else if (res.status === 401) {
          logout();
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const downloadInvoice = async (orderId) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/invoice`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to download invoice");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice-${orderId}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      alert("Error downloading invoice");
    }
  };

  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          background: "#d1fae5",
          color: "#065f46",
        };

      case "shipped":
        return {
          background: "#dbeafe",
          color: "#1d4ed8",
        };

      default:
        return {
          background: "#fef3c7",
          color: "#92400e",
        };
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">

      {/* Profile Card */}

      <div className="profile-card">

        <h2>👤 My Profile</h2>

        <p>
          <strong>Name :</strong> {user.name}
        </p>

        <p>
          <strong>Email :</strong> {user.email}
        </p>

        <p>
          <strong>Role :</strong>

          <span className="profile-role">
            {user.role}
          </span>

        </p>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* Summary */}

      <div className="summary-grid">

        <div className="summary-card">

          <h3>Total Orders</h3>

          <h1 className="total-orders">
            {orders.length}
          </h1>

        </div>

        <div className="summary-card">

          <h3>Total Spending</h3>

          <h1 className="total-spending">
            ₹{totalSpent.toLocaleString()}
          </h1>

        </div>

      </div>

      <h2 className="order-title">
        📦 Order History
      </h2>

      {loading ? (
        <h3>Loading...</h3>
      ) : orders.length === 0 ? (
        <div className="empty-orders">

          <h3>No Orders Found</h3>

          <Link to="/shop" className="btn">
            Start Shopping
          </Link>

        </div>
      ) : (

        orders.map((order) => (<div key={order._id} className="order-card">

          {/* Order Details */}

          <div className="order-details">

            <p>
              <strong>Order ID :</strong> {order._id}
            </p>

            <p>
              <strong>Date :</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <p>
              <strong>Total :</strong>{" "}
              <span className="order-total">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </p>

          </div>

          {/* Order Timeline */}

          <div className="timeline">

            <div
              className={
                [
                  "Pending",
                  "Processing",
                  "Shipped",
                  "Out For Delivery",
                  "Delivered",
                ].includes(order.status)
                  ? "active"
                  : ""
              }
            >
              📦 Pending
            </div>

            <div
              className={
                [
                  "Processing",
                  "Shipped",
                  "Out For Delivery",
                  "Delivered",
                ].includes(order.status)
                  ? "active"
                  : ""
              }
            >
              ⚙ Processing
            </div>

            <div
              className={
                [
                  "Shipped",
                  "Out For Delivery",
                  "Delivered",
                ].includes(order.status)
                  ? "active"
                  : ""
              }
            >
              🚚 Shipped
            </div>

            <div
              className={
                [
                  "Out For Delivery",
                  "Delivered",
                ].includes(order.status)
                  ? "active"
                  : ""
              }
            >
              🚛 Out For Delivery
            </div>

            <div
              className={
                order.status === "Delivered"
                  ? "active"
                  : ""
              }
            >
              ✅ Delivered
            </div>

          </div>

          {/* Status & Actions */}

          <div className="order-actions">

            <span
              className="status-badge"
              style={getStatusStyle(order.status)}
            >
              {order.status}
            </span>

            <button
              className="invoice-btn"
              onClick={() => downloadInvoice(order._id)}
            >
              📄 Download Invoice
            </button>

          </div>

        </div>
        ))
      )}

    </div>
  );
};

export default Profile;