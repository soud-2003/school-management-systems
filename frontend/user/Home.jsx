function Home() {
  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>

      <div className="dashboard-menu">
        <button className="menu-btn">View Results</button>
        <button className="menu-btn">Account Information</button>
        <button className="menu-btn logout">Logout</button>
      </div>
    </div>
  );
}

export default Home;
