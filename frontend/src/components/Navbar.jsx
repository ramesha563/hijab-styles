import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";

const Navbar = ({ userName, setUserName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo (not a link) */}
          <div className="navbar-logo">🧕 Hijab Styles</div>

          {/* Home link with icon */}
          <Link to="/" className="navbar-link">
            <FaHome className="navbar-icon" />
            Home
          </Link>

          {/* Auth Links */}
          {userName ? (
            <>
              <span className="navbar-user">👤 {userName}</span>
              <button
                className="navbar-button logout"
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt className="navbar-icon" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="navbar-link">
                <FaUserPlus className="navbar-icon" />
                Signup
              </Link>
              <Link to="/login" className="navbar-link">
                <FaSignInAlt className="navbar-icon" />
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Toast container to show toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Navbar;
