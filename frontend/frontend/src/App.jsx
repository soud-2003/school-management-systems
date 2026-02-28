import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyResult from "./pages/Student/ViewResult";
import SchoolAccount from "./pages/Student/AccountInformation";
import StudentHome from "./pages/Student/StudentHome";
import TeacherHome from "./pages/Teacher/TeacherHome";
import ManagementHome from "./pages/Management/ManagementHome";
import ParrentHome from "./pages/Parrent/ParrentHome";
import Login from "./pages/login";
import Register from "./pages/Register";
import About from "./pages/about";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/result" element={<MyResult />} />
        <Route path="/student/account" element={<SchoolAccount />} />
        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/parent" element={<ParrentHome />} />
        <Route path="/management" element={<ManagementHome />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
