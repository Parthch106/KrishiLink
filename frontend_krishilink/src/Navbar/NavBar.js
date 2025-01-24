import React, { useState } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import { handleSuccess } from '../utils';
import { ToastContainer } from "react-toastify";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
        navigate('/login');
    }, 1000)
}

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/desc"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
               Page2
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/man"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Page3
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/ai"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Page4
              </NavLink>
            </li>
            <li className="nav-item">
            <div id="logout"><button className="button2" onClick={handleLogout}>Logout</button></div>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                {" "}
              </span>
            ) : (
              <span className="icon">
                
              </span>
            )}
          </div>
          <ToastContainer/>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
