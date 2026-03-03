import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login/", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200 && response.data.user) {
        // store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // navigate based on role
        const role = response.data.user.role;
        switch (role) {
          case "student":
            navigate("/student");
            break;
          case "parent":
            navigate("/parent");
            break;
          case "teacher":
            navigate("/teacher");
            break;
          case "admin":
            navigate("/management");
            break;
          default:
            navigate("/");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data.error || "Login failed. Please try again.");
      } else if (err.request) {
        setError("Network error. Please check the server.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login - School Management</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* demo credentials button */}
          <button
            type="button"
            className="demo-btn"
            onClick={() => setFormData({ username: "student1", password: "test123" })}
            style={{ marginTop: "10px" }}
          >
            Use Demo Account
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
