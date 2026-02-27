import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>School Management System</h1>
        <p>
          A smart platform that connects Students, Parents, Teachers
          and School Management in one system.
        </p>
      </div>

      <div className="roles">
        <div className="role-card student">
          <h3>Student</h3>
          <p>
            Students can log in to view their own academic results
            and performance records.
          </p>
        </div>

        <div className="role-card parent">
          <h3>Parent</h3>
          <p>
            Parents can view their children's results and confirm them
            with a digital signature.
          </p>
        </div>

        <div className="role-card teacher">
          <h3>Teacher</h3>
          <p>
            Teachers can view and manage results for the specific
            classes they teach.
          </p>
        </div>

        <div className="role-card admin">
          <h3>Admin / Management</h3>
          <p>
            Management has access to overall school results and reports
            for decision making.
          </p>
        </div>
      </div>
    </div>
  );
  
  
}

export default Home;




