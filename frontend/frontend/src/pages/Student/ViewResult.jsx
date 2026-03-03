import { useState, useEffect } from "react";
import api from "../../api";
import "../../styles/Student/ViewResult.css";

function MyResult() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Get student info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      setError("");
      // Use the new endpoint that gets results directly by user ID
      // This works even without a Student record
      const resultsResponse = await api.get(`/users/${user.id}/results/`);
      setResults(resultsResponse.data);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError(err.message || "Failed to fetch results");
      // If no results found, show empty state instead of error
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const total = results.reduce((sum, result) => sum + parseFloat(result.marks || 0), 0);
  const average = results.length > 0 ? (total / results.length).toFixed(2) : 0;

  const getGrade = () => {
    if (average >= 80) return "A";
    if (average >= 70) return "B";
    if (average >= 60) return "C";
    if (average >= 50) return "D";
    return "F";
  };

  if (loading) {
    return (
      <div className="result-container">
        <div className="result-card">
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="result-container">
        <div className="result-card">
          <p className="error">{error}</p>
          <button onClick={fetchResults}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className="result-card">
        <h2>My Result</h2>

        <div className="student-info">
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>

        {results.length > 0 ? (
          <>
            <table className="result-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{result.subject?.subject_name || "N/A"}</td>
                    <td>{result.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="summary">
              <p><strong>Total:</strong> {total}</p>
              <p><strong>Average:</strong> {average}%</p>
              <p><strong>Grade:</strong> {getGrade()}</p>
            </div>
          </>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default MyResult;
