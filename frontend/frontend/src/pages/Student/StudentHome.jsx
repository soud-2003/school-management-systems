import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "../../styles/Student/StudentHome.css";

function StudentHome() {
  const navigate = useNavigate();
  
  // Initialize user from localStorage
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch (e) {
      console.error("Error parsing user data:", e);
      return {};
    }
  });
  
  const [student, setStudent] = useState(null);

  const fetchStudentProfile = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/student/`);
      setStudent(response.data);
    } catch (err) {
      console.error("Error fetching student profile:", err);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchStudentProfile(user.id);
    }
  }, [user.id]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      
      {user && Object.keys(user).length > 0 && (
        <div className="user-info">
          <p>Welcome, <strong>{user.first_name} {user.last_name}</strong>!</p>
          <p>Username: {user.username}</p>
          {student && <p>Class: {student.student_class?.class_name || "N/A"}</p>}
        </div>
      )}

      <div className="dashboard-menu">
        <button onClick={() => navigate("/student/result")}>
          View Results
        </button>

        <button onClick={() => navigate("/student/account")}>
          Account Information
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentHome;
