import "../../styles/Student/AccountInformation.css";

function SchoolAccount() {
  const student = {
    fullName: "Ali Hassan",
    admissionNo: "SUZA2024-001",
    class: "Form 1",
    gender: "Male",
    dateOfBirth: "12 March 2010",
    email: "alihassan@gmail.com",
    phone: "+255 712 345 678",
    parentName: "Hassan Ali",
    parentPhone: "+255 713 987 654",
    accountStatus: "Active",
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h2>My School Account</h2>

        <div className="account-section">
          <h3>Personal Information</h3>
          <p><strong>Full Name:</strong> {student.fullName}</p>
          <p><strong>Admission No:</strong> {student.admissionNo}</p>
          <p><strong>Class:</strong> {student.class}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
        </div>

        <div className="account-section">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
        </div>

        <div className="account-section">
          <h3>Parent Information</h3>
          <p><strong>Parent Name:</strong> {student.parentName}</p>
          <p><strong>Parent Phone:</strong> {student.parentPhone}</p>
        </div>

        <div className="status">
          Account Status: <span>{student.accountStatus}</span>
        </div>
      </div>
    </div>
  );
}

export default SchoolAccount;
