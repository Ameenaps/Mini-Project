import React from "react";
import { Link } from "react-router-dom";
import "../styles/admin-sidebar.css";

const AdminNavbar = () => (
  <div className="admin-sidebar">
    <div className="sidebar-header">
      <img
        src="/vite.svg"
        alt="Logo"
        width="32"
        height="32"
        className="sidebar-logo"
      />
      <span className="sidebar-title">Smart Park Admin</span>
    </div>
    <nav className="sidebar-nav">
      <Link to="/admin_dashboard" className="sidebar-link">
        <span>Dashboard</span>
      </Link>
      <Link to="/admin_dashboard/users" className="sidebar-link">
        <span>Users</span>
      </Link>
      <Link to="/admin_dashboard/reports" className="sidebar-link">
        <span>Reports</span>
      </Link>
      <button
        className="sidebar-link logout-btn"
        onClick={() => {
          localStorage.removeItem("isAdminLoggedIn");
          window.location.href = "/login";
        }}
      >
        <span>Logout</span>
      </button>
    </nav>
  </div>
);

export default AdminNavbar;
           