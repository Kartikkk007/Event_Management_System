import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./vendor.css";

/* VENDOR MAIN PAGE */
const VendorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Vendor Dashboard</h1>

      <button onClick={() => navigate("items")}>Manage Items</button>
      <button onClick={() => navigate("orders")}>View Orders</button>
      <button onClick={() => navigate("profile")}>Profile</button>
    </div>
  );
};

/* MANAGE ITEMS */
const ManageItems = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item A", price: 100 },
    { id: 2, name: "Item B", price: 200 },
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Item ${String.fromCharCode(65 + items.length)}`,
      price: 150,
    };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h2>Manage Items</h2>
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* VENDOR ORDERS */
const VendorOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "Kartik",
      items: ["Item A", "Item B"],
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Amit",
      items: ["Item C"],
      status: "Accepted",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h2>Vendor Orders</h2>

      {orders.map((order) => (
        <div key={order.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Items:</strong> {order.items.join(", ")}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <button onClick={() => updateStatus(order.id, "Accepted")}>
            Accept
          </button>
          <button onClick={() => updateStatus(order.id, "Delivered")}>
            Mark Delivered
          </button>
        </div>
      ))}
    </div>
  );
};

/* VENDOR PROFILE (PROPER IMPLEMENTATION) */
const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "ABC Traders",
    email: "vendor@abc.com",
    phone: "9876543210",
    shopName: "ABC Grocery Store",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setIsEditing(false);
    console.log("Updated Profile:", profile);
  };

  return (
    <div>
      <h2>Vendor Profile</h2>

      {isEditing ? (
        <div>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Vendor Name"
          />
          <br /><br />

          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <br /><br />

          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <br /><br />

          <input
            name="shopName"
            value={profile.shopName}
            onChange={handleChange}
            placeholder="Shop Name"
          />
          <br /><br />

          <button onClick={saveProfile}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Shop:</strong> {profile.shopName}</p>

          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

const VendorPages = () => {
  return (
    <div className="vendor">
    <Routes>
      <Route index element={<VendorDashboard />} />
      <Route path="items" element={<ManageItems />} />
      <Route path="orders" element={<VendorOrders />} />
      <Route path="profile" element={<VendorProfile />} />
    </Routes>
    </div>
  );
};

export default VendorPages;

