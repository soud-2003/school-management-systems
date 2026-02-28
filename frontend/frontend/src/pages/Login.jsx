import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      });

      if (response.data.user) {
        const userRole = response.data.user.role;
        
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Check if role matches
        if (role && userRole !== role.toLowerCase()) {
          setError(`You are not logged in as ${role}`);
          setLoading(false);
          return;
        }

        setError("");

        // Navigate based on role
        if (userRole === "student") {
          navigate("/student");
        } else if (userRole === "parent") {
          navigate("/parent");
        } else if (userRole === "teacher") {
          navigate("/teacher");
        } else if (userRole === "admin") {
          navigate("/management");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>School Management System</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Parent">Parent</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/Admin">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
