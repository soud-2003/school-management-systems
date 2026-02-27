import { useState, useEffect } from "react";
import api from "../../api";
import "../../styles/Parrent/ParrentHome.css";

function ParrentHome() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/parents/${user.id}/children/`);
      setChildren(response.data);
    } catch (err) {
      console.error("Error fetching children:", err);
      setError("Failed to load children information");
    } finally {
      setLoading(false);
    }
  };

  const getChildResults = async (childId) => {
    try {
      const response = await api.get(`/students/${childId}/results/`);
      return response.data;
    } catch (err) {
      console.error("Error fetching results:", err);
      return [];
    }
  };

  if (loading) {
    return <div style={{ padding: "30px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Parent Dashboard</h2>
      <p>Welcome, {user.first_name} {user.last_name}</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "30px" }}>
        <h3>My Children</h3>
        
        {children.length > 0 ? (
          <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
            {children.map((child) => (
              <div key={child.id} style={{ 
                padding: "20px", 
                border: "1px solid #ddd", 
                borderRadius: "8px",
                background: "#f9f9f9"
              }}>
                <h4>{child.user?.first_name} {child.user?.last_name}</h4>
                <p><strong>Class:</strong> {child.student_class?.class_name || "N/A"}</p>
                <p><strong>Username:</strong> {child.user?.username}</p>
                <button 
                  onClick={async () => {
                    const results = await getChildResults(child.id);
                    if (results.length > 0) {
                      alert(`Results for ${child.user?.first_name}:\n` + 
                        results.map(r => `${r.subject?.subject_name}: ${r.marks}`).join("\n"));
                    } else {
                      alert("No results available");
                    }
                  }}
                  style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}
                >
                  View Results
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No children found linked to your account.</p>
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <button onClick={fetchChildren} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Refresh
        </button>
      </div>
    </div>
  );
}

export default ParrentHome;
