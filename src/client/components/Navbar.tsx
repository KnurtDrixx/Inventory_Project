// to do. make navbar
import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { apiService } from "../services/apiService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const nav = useNavigate();
  const loq = useLocation();

  useEffect(() => {
    apiService("/auth/verify")
      .then((data) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
      });
  }, [loq.pathname]);

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    nav("/admin/login");
  };

  return (
    <nav className="nav nav-pills p-2 shadow">
      <NavLink to="/admin/Items" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Items
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/admin/Ingredients" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
          Ingredients
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink to="/admin/login" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
          Login/Register
        </NavLink>
      )}
      <NavLink to="/admin/checkout" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Checkout
      </NavLink>

      {isLoggedIn && (
        <button onClick={logOut} className="nav-link">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
