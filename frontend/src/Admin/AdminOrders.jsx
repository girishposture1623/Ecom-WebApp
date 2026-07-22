import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../Context/AuthContext";
import "../Styles/adminOrders.css";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const result = orders.filter((order) => {
      return (
        order.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.user?.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredOrders(result);
  }, [search, orders]);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
        setFilteredOrders(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [user.token]);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Status Updated");
        fetchOrders();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="admin-orders">

      <h1>📦 Orders Management</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search by Customer / Email / Order ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Total Orders : {filteredOrders.length}</h3>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(-8)}</td>

                <td>{order.user?.name}</td>

                <td>{order.user?.email}</td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="amount">
                  ₹{order.totalAmount}
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) => {
                      const updatedOrders = orders.map((item) =>
                        item._id === order._id
                          ? { ...item, status: e.target.value }
                          : item
                      );

                      setOrders(updatedOrders);
                      setFilteredOrders(updatedOrders);
                    }}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Out For Delivery">
                      Out For Delivery
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </td>

                <td>
                  <button
                    className="update-btn"
                    onClick={() =>
                      updateStatus(order._id, order.status)
                    }
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default AdminOrders;