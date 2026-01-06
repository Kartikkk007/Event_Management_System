import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "admin") navigate("/admin");
    else if (role === "vendor") navigate("/vendor");
    else navigate("/user");
  };

  return (
    <div className="login">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="vendor">Vendor</option>
          <option value="user">User</option>
        </select>

        <button type="submit">Login</button>

        <div className="login-footer">
          Select your role to continue
        </div>
      </form>
    </div>
  );
};

export default Login;
