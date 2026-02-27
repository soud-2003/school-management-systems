import { useState, useEffect } from "react";
import api from "../../api";

function ManagementHome() {
  const [stats, setStats] = useState({
    total_students: 0,
    total_teachers: 0,
    total_classes: 0,
    total_subjects: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await api.get("/dashboard/stats/");
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "30px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Management Dashboard</h2>
      <p>Welcome, {user.first_name} {user.last_name}</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "30px" }}>
        <div style={{ padding: "20px", background: "#3498db", color: "white", borderRadius: "8px", textAlign: "center" }}>
          <h3>Total Students</h3>
          <p style={{ fontSize: "36px", margin: "10px 0" }}>{stats.total_students}</p>
        </div>

        <div style={{ padding: "20px", background: "#2ecc71", color: "white", borderRadius: "8px", textAlign: "center" }}>
          <h3>Total Teachers</h3>
          <p style={{ fontSize: "36px", margin: "10px 0" }}>{stats.total_teachers}</p>
        </div>

        <div style={{ padding: "20px", background: "#e74c3c", color: "white", borderRadius: "8px", textAlign: "center" }}>
          <h3>Total Classes</h3>
          <p style={{ fontSize: "36px", margin: "10px 0" }}>{stats.total_classes}</p>
        </div>

        <div style={{ padding: "20px", background: "#9b59b6", color: "white", borderRadius: "8px", textAlign: "center" }}>
          <h3>Total Subjects</h3>
          <p style={{ fontSize: "36px", margin: "10px 0" }}>{stats.total_subjects}</p>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>Quick Actions</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "15px" }}>
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Manage Students</button>
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Manage Teachers</button>
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Manage Classes</button>
          <button style={{ padding: "10px 20px", cursor: "pointer" }}>Manage Subjects</button>
          <button onClick={fetchStats} style={{ padding: "10px 20px", cursor: "pointer" }}>Refresh Stats</button>
        </div>
      </div>
    </div>
  );
}

export default ManagementHome;
