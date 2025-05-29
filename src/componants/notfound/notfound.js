import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <div className="card shadow p-4">
        <h1 className="display-4 text-danger mb-3">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          404
        </h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="lead mb-4">
          the page you are looking for does not exist.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
