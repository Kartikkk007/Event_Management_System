import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminPages from "./pages/admin/AdminPages";
import VendorPages from "./pages/vendor/VendorPages";
import UserPages from "./pages/user/UserPages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin/*" element={<AdminPages />} />
      <Route path="/vendor/*" element={<VendorPages />} />
      <Route path="/user/*" element={<UserPages />} />
    </Routes>
  );
}

export default App;
