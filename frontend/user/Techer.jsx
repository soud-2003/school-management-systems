import { useState } from "react";

function TeacherHome() {
  const [selectedClass, setSelectedClass] = useState("");
  const [results, setResults] = useState([]);
  const [file, setFile] = useState(null);

  // Example data (temporary before backend)
  const sampleResults = {
    "Form 1": [
      { id: 1, name: "Ali Hassan", math: 75, english: 80 },
      { id: 2, name: "Asha Omar", math: 60, english: 70 },
    ],
    "Form 2": [
      { id: 1, name: "John Peter", math: 85, english: 88 },
      { id: 2, name: "Fatma Said", math: 78, english: 90 },
    ],
  };

  const handleClassChange = (e) => {
    const className = e.target.value;
    setSelectedClass(className);
    setResults(sampleResults[className] || []);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file || !selectedClass) {
      alert("Please select class and file first");
      return;
    }

    // Here you will send file to backend API
    alert(`Results uploaded for ${selectedClass}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Teacher Dashboard</h2>

      {/* Select Class */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Class: </label>
        <select value={selectedClass} onChange={handleClassChange}>
          <option value="">-- Choose Class --</option>
          <option value="Form 1">Form 1</option>
          <option value="Form 2">Form 2</option>
        </select>
      </div>

      {/* Upload Section */}
      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
          Upload Results
        </button>
      </div>

      {/* View Results */}
      {results.length > 0 && (
        <div>
          <h3>{selectedClass} Results</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Math</th>
                <th>English</th>
              </tr>
            </thead>
            <tbody>
              {results.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.math}</td>
                  <td>{student.english}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeacherHome;
