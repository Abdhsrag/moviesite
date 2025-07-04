import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLanguage } from "../common/languageContext"; // adjust path if needed

function Navbar() {
  const location = useLocation();
  const favoritesCount = useSelector((state) => state.favorites.length);
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm modern-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-list-check me-2 fs-3"></i>
          <span className="fs-4">Movies+</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link
                className={`nav-link${location.pathname === "/login" ? " active" : ""}`}
                to="/login"
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${location.pathname === "/register" ? " active" : ""}`}
                to="/register"
              >
                <i className="bi bi-person-plus me-1"></i>Register
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${location.pathname === "/" ? " active" : ""}`}
                to="/"
              >
                <i className="bi bi-film me-1"></i>Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${location.pathname === "/towatch" ? " active" : ""} position-relative`}
                to="/towatch"
              >
                Watch List
                <span className="badge bg-danger ms-1">{favoritesCount}</span>
              </Link>
            </li>
            <li className="nav-item ms-3">
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="form-select form-select-sm"
                style={{ minWidth: 110 }}
                aria-label="Select language"
              >
                <option value="en-US">English</option>
                <option value="ar-SA">Arabic</option>
                <option value="fr-FR">French</option>
                <option value="es-ES">Spanish</option>
                <option value="de-DE">German</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;