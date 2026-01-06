import { useNavigate } from "react-router-dom";
import "./indexx.css";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="index">
      <div className="index-card">
        <h1>Vendor Management System</h1>

        <p>
          A unified platform for admins, vendors, and users to manage items,
          orders, and operations efficiently.
        </p>

        <button onClick={() => navigate("/login")}>
          Get Started
        </button>

        <div className="index-footer">
          Secure • Fast • Reliable
        </div>
      </div>
    </div>
  );
};

export default Index;
