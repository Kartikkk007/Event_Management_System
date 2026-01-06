import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./admin.css";

/* ADMIN MAIN (MAINTENANCE MENU) */
const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Admin Maintenance Menu</h1>

      <button onClick={() => navigate("users")}>User Management</button>
      <button onClick={() => navigate("vendors")}>Vendor Management</button>
      <button onClick={() => navigate("settings")}>System Settings</button>
      <button onClick={() => navigate("reports")}>Reports</button>
    </div>
  );
};

/* USER MANAGEMENT (STARTED PROPERLY) */
const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Kartik", email: "kartik@gmail.com", status: "Active" },
    { id: 2, name: "Amit", email: "amit@gmail.com", status: "Blocked" },
  ]);

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Blocked" : "Active",
            }
          : user
      )
    );
  };

  return (
    <div>
      <h2>User Management</h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> {user.status}</p>

          <button onClick={() => toggleStatus(user.id)}>
            {user.status === "Active" ? "Block" : "Unblock"}
          </button>
        </div>
      ))}
    </div>
  );
};
const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "ABC Traders",
      email: "vendor@abc.com",
      shop: "ABC Grocery",
      status: "Pending",
    },
    {
      id: 2,
      name: "XYZ Foods",
      email: "xyz@foods.com",
      shop: "XYZ Restaurant",
      status: "Approved",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === id ? { ...vendor, status: newStatus } : vendor
      )
    );
  };

  return (
    <div>
      <h2>Vendor Management</h2>

      {vendors.map((vendor) => (
        <div
          key={vendor.id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <p><strong>Name:</strong> {vendor.name}</p>
          <p><strong>Email:</strong> {vendor.email}</p>
          <p><strong>Shop:</strong> {vendor.shop}</p>
          <p><strong>Status:</strong> {vendor.status}</p>

          {vendor.status === "Pending" && (
            <button onClick={() => updateStatus(vendor.id, "Approved")}>
              Approve
            </button>
          )}

          {vendor.status !== "Blocked" && (
            <button onClick={() => updateStatus(vendor.id, "Blocked")}>
              Block
            </button>
          )}

          {vendor.status === "Blocked" && (
            <button onClick={() => updateStatus(vendor.id, "Approved")}>
              Unblock
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
/* SYSTEM SETTINGS (PROPER IMPLEMENTATION) */
const SystemSettings = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    maxOrdersPerUser: 5,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = () => {
    console.log("Saved Settings:", settings);
    alert("System settings saved");
  };

  return (
    <div>
      <h2>System Settings</h2>

      <label>
        <input
          type="checkbox"
          name="maintenanceMode"
          checked={settings.maintenanceMode}
          onChange={handleChange}
        />
        Maintenance Mode
      </label>

      <br /><br />

      <label>
        <input
          type="checkbox"
          name="userRegistration"
          checked={settings.userRegistration}
          onChange={handleChange}
        />
        Allow User Registration
      </label>

      <br /><br />

      <label>
        Max Orders Per User:
        <input
          type="number"
          name="maxOrdersPerUser"
          value={settings.maxOrdersPerUser}
          onChange={handleChange}
        />
      </label>

      <br /><br />

      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
};
/* PLACEHOLDERS (NEXT STEPS) */
const Reports = () => {
  const reportData = {
    totalUsers: 120,
    activeUsers: 95,
    totalVendors: 18,
    approvedVendors: 15,
    totalOrders: 540,
    totalRevenue: 125000,
    recentOrders: [
      { id: "ORD120", amount: 450, status: "Delivered" },
      { id: "ORD121", amount: 320, status: "Pending" },
      { id: "ORD122", amount: 980, status: "Accepted" },
    ],
  };

  return (
    <div>
      <h2>Reports Dashboard</h2>

      <h3>Platform Summary</h3>
      <ul>
        <li>Total Users: {reportData.totalUsers}</li>
        <li>Active Users: {reportData.activeUsers}</li>
        <li>Total Vendors: {reportData.totalVendors}</li>
        <li>Approved Vendors: {reportData.approvedVendors}</li>
        <li>Total Orders: {reportData.totalOrders}</li>
        <li>Total Revenue: ₹{reportData.totalRevenue}</li>
      </ul>

      <h3>Recent Orders</h3>
      <ul>
        {reportData.recentOrders.map((order) => (
          <li key={order.id}>
            {order.id} — ₹{order.amount} ({order.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

const AdminPages = () => {
  return (
    <div className="admin">
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="vendors" element={<VendorManagement />} />
      <Route path="settings" element={<SystemSettings />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
    </div>
  );
};

export default AdminPages;
