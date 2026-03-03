import "../styles/About.css";

function About() {
  return (
    <div className="about-page">
      <h1>About the School Management System</h1>
      <p>
        This application was developed as a comprehensive platform to
        streamline communication and record keeping between students,
        parents, teachers, and school administrators. It provides
        features such as grade viewing, account management, and role-based
        dashboards to ensure everyone has access to the information they need.
      </p>
      <p>
        Built with React (Vite) on the frontend and Django REST framework on
        the backend, the system is designed for extensibility and easy
        deployment. We hope it improves your educational workflow!
      </p>
    </div>
  );
}

export default About;
