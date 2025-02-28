import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { Sprout } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUserfn");
    localStorage.removeItem("loggedInUserln");
    localStorage.removeItem("loggenInUseremail");
    localStorage.removeItem("loggedInUseraddress");
    localStorage.removeItem("loggedInUserexp");
    localStorage.removeItem("loggedInUserphone");
    handleSuccess("User Logged out");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white relative overflow-hidden">
    <nav className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
      <div className="flex items-center space-x-2">
        <Sprout className="h-8 w-8" />
        <span className="text-2xl font-bold">Krishi Link</span>
      </div>
      <div className="hidden md:flex space-x-8">
        <NavLink to="/" className="hover:text-green-200">
          Home
        </NavLink>
        <NavLink to="/products" className="hover:text-green-200">
          Add Products
        </NavLink>
        <NavLink to="/marketplace" className="hover:text-green-200">
          MarketPlace
        </NavLink>
        <NavLink to="/employeeaprroval" className="hover:text-green-200">
          employeeaprroval
        </NavLink>
        <NavLink to="/profile" className="hover:text-green-200">
          Profile & Dashboard
        </NavLink>
        <NavLink className="hover:text-green-200" onClick={handleLogout}>
          Logout
        </NavLink>
      </div>
      <ToastContainer />
    </nav>
    </header>
  );
}

export default NavBar;