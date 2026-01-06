import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./user.css";


/* USER DASHBOARD (MAIN MENU) */
const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Dashboard</h1>

      <button onClick={() => navigate("browse")}>Browse Items</button>
      <button onClick={() => navigate("order")}>Place Order</button>
      <button onClick={() => navigate("orders")}>View Orders</button>
      <button onClick={() => navigate("profile")}>Profile</button>
    </div>
  );
};

/* BROWSE ITEMS */
const BrowseItems = () => {
  const [items] = useState([
    { id: 1, name: "Item A", price: 100 },
    { id: 2, name: "Item B", price: 150 },
    { id: 3, name: "Item C", price: 200 },
  ]);

  return (
    <div>
      <h2>Browse Items</h2>

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

/* PLACE ORDER */
const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const items = [
    { id: 1, name: "Item A", price: 100 },
    { id: 2, name: "Item B", price: 150 },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>
      <h2>Place Order</h2>

      <h3>Items</h3>
      {items.map((item) => (
        <div key={item.id}>
          {item.name} - ₹{item.price}
          <button onClick={() => addToCart(item)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.length === 0 ? (
        <p>No items added</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* VIEW ORDERS */
const ViewOrders = () => {
  const [orders] = useState([
    { id: "ORD101", total: 250, status: "Delivered" },
    { id: "ORD102", total: 150, status: "Pending" },
  ]);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order.id}>
          Order ID: {order.id} | ₹{order.total} | {order.status}
        </div>
      ))}
    </div>
  );
};

/* USER PROFILE */
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Kartik",
    email: "kartik@gmail.com",
    phone: "9876543210",
    address: "Delhi",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>User Profile</h2>

      {isEditing ? (
        <div>
          <input name="name" value={profile.name} onChange={handleChange} />
          <br /><br />
          <input name="email" value={profile.email} onChange={handleChange} />
          <br /><br />
          <input name="phone" value={profile.phone} onChange={handleChange} />
          <br /><br />
          <input name="address" value={profile.address} onChange={handleChange} />
          <br /><br />
          <button onClick={() => setIsEditing(false)}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Address: {profile.address}</p>

          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

/* USER ROUTES */
const UserPages = () => {
  return (
    <div className="user">
    <Routes>
      <Route index element={<UserDashboard />} />
      <Route path="browse" element={<BrowseItems />} />
      <Route path="order" element={<PlaceOrder />} />
      <Route path="orders" element={<ViewOrders />} />
      <Route path="profile" element={<UserProfile />} />
    </Routes>
    </div>
  );
};

export default UserPages;
