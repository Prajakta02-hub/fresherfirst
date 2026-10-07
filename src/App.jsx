import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import ApplyForm from "./pages/ApplyForm.jsx";
import MySkills from "./pages/MySkills.jsx";
import SavedJobs from "./pages/SavedJobs.jsx";
import Applications from "./pages/Applications.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/apply/:id" element={<ApplyForm />} />
          <Route path="/skills" element={<MySkills />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        FresherFirst: a portfolio project built with React, React Router and Context API.
      </footer>
    </>
  );
}
