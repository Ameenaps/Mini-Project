import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <AdminNavbar />
      <div
        className="container"
        style={{ marginLeft: "250px", padding: "2rem" }}
      >
        <h1 className="mb-4">Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-danger mb-3">
          Logout
        </button>
        <p>
          Welcome, Admin! Here you can manage users, view reports, and configure
          system settings.
        </p>
        {/* Add more admin dashboard content here */}
      </div>
    </>
  );
};

export default AdminDashboard;
