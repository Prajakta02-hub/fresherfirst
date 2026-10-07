import { NavLink, Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar() {
  const { savedIds, skills, applications } = useApp();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          Fresher<span>First</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>Jobs</NavLink>
          <NavLink to="/skills">My skills <b className="count">{skills.length}</b></NavLink>
          <NavLink to="/saved">Saved <b className="count">{savedIds.length}</b></NavLink>
          <NavLink to="/applications">Applied <b className="count">{applications.length}</b></NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
