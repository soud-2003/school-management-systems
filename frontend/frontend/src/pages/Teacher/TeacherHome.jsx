import "../../styles/Teacher/TeacherHome.css";
import { useState, useEffect } from "react";
import api from "../../api";

function TeacherHome() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get("/classes/");
      setClasses(response.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await api.get(`/teachers/${user.id}/subjects/`);
      setSubjects(response.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    setStudents([]);
    setResults([]);

    if (classId) {
      try {
        // Get students in this class
        const studentsResponse = await api.get(`/classes/${classId}/students/`);
        setStudents(studentsResponse.data);
        
        // Get results for subjects in this class
        const resultsResponse = await api.get("/results/");
        // Filter results for students in this class
        const classStudentIds = studentsResponse.data.map(s => s.id);
        const filteredResults = resultsResponse.data.filter(r => 
          classStudentIds.includes(r.student)
        );
        setResults(filteredResults);
      } catch (err) {
        console.error("Error fetching class data:", err);
      }
    }
  };

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId);
    return student?.user?.username || "Unknown";
  };

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.subject_name || "Unknown";
  };

  if (loading) {
    return <div style={{ padding: "30px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>Teacher Dashboard</h2>
      <p>Welcome, {user.first_name} {user.last_name}</p>

      {/* Select Class */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Class: </label>
        <select value={selectedClass} onChange={handleClassChange}>
          <option value="">-- Choose Class --</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.class_name}
            </option>
          ))}
        </select>
      </div>

      {/* My Subjects */}
      <div style={{ marginBottom: "20px" }}>
        <h3>My Subjects</h3>
        {subjects.length > 0 ? (
          <ul>
            {subjects.map((subj) => (
              <li key={subj.id}>
                {subj.subject_name} - {subj.class_assigned?.class_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No subjects assigned</p>
        )}
      </div>

      {/* Students in Class */}
      {students.length > 0 && (
        <div>
          <h3>{classes.find(c => c.id == selectedClass)?.class_name} - Students</h3>
          <table border="1" cellPadding="10" style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.user?.first_name} {student.user?.last_name}</td>
                  <td>{student.user?.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h3>Class Results</h3>
          <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{getStudentName(result.student)}</td>
                  <td>{getSubjectName(result.subject)}</td>
                  <td>{result.marks}</td>
                  <td>{result.comment || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TeacherHome;
