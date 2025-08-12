import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (localStorage.getItem("isAdminLoggedIn") === "true") {
      navigate("/admin_dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }
      // Check role and status
      if (data.user.role === "admin" && data.user.status === "approved") {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin_dashboard", { replace: true }); // Redirect to admin dashboard
      } else {
        alert("You are not authorized or not approved as admin.");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="page-root">
      <div className="layout">
        <Navbar />

        <div className="content-outer">
          <div className="content-inner">
            {/* Hero image block */}
            <div className="hero-shell">
              <div
                className="hero"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxYKwCVTZMkHJY-B5kZ-aOsC66wp4Et59ZTaAild7FwN-24r5221mqoT8dH6zct8hOz6_8A2cetdLWCPdUiu_yiguzHTNp5tDGgKwsLFBk1naOJ1SOLhua1JhE0cEDBfeyqifSFbUDYYmPYJ4AmUKoZhK4PxbwKaoJ1bn4BVMoBVsPUXU9-s6eyaIMBc3kM-vrmseETbKH9bFZcR39hW_WjLpgz-khfVOXTCgJ9g7cDEeUS-nTG97OfUBzoXHnjNQ1sHwYyH2Gdh4")',
                }}
              />
            </div>

            {/* Headings */}
            <h1 className="page-title">SmartPark</h1>
            <h2 className="page-subtitle">Welcome back</h2>

            {/* Username */}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-field">
                  <p className="field-label">Username</p>
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Enter your username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              {/* Password */}
              <div className="form-row">
                <label className="form-field">
                  <p className="field-label">Password</p>
                  <input
                    className="text-input"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>

              {/* Forgot password */}
              <p className="helper-link">Forgot Password?</p>

              {/* Login button */}
              <div className="actions">
                <button type="submit" className="btn-wide">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
