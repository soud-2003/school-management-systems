import "../styles/About.css";

function About() {
  return (
    <div className="about">
      <div className="about-card">
        <h1>About School Management System</h1>

        <p className="intro">
          The School Management System is designed to improve transparency,
          efficiency and communication between all school stakeholders.
        </p>

        <div className="features">
          <div className="feature">
            <h3>Teachers</h3>
            <p>
              Teachers can access and manage examination results only
              for the classes they are responsible for.
            </p>
          </div>

          <div className="feature">
            <h3>Management (Admin)</h3>
            <p>
              School management can access overall school performance,
              statistics and reports.
            </p>
          </div>

          <div className="feature">
            <h3>Students</h3>
            <p>
              Students log in securely to view their own results
              and academic progress.
            </p>
          </div>

          <div className="feature">
            <h3>Parents</h3>
            <p>
              Parents can monitor their children's performance and
              confirm results using a digital signature.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;






