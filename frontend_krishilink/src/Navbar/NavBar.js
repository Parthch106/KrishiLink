import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <ul className={`nav-menu ${click ? "active" : ""}`}>
            <li className="nav-item">
              <NavLink to="/" className="nav-links" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-links" onClick={handleClick}>
                Farmer Registration
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-links" onClick={handleClick}>
                Farmer Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/employee" className="nav-links" onClick={handleClick}>
                Employee Verification
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/marketplace" className="nav-links" onClick={handleClick}>
                Marketplace
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/farmer-dashboard" className="nav-links" onClick={handleClick}>
                Farmer Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/business-dashboard" className="nav-links" onClick={handleClick}>
                Business Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="button2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            {click ? <span className="icon">✖</span> : <span className="icon">☰</span>}
          </div>

          <ToastContainer />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
