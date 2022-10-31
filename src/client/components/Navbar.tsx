//! to do. make navbar
import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { apiService } from "../services/apiService";

const Navbar = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  //const loq = useLocation();

  //   useEffect(() => {
  //     apiService("/auth/verify")
  //       .then((data) => {
  //         setIsLoggedIn(true);
  //       })
  //       .catch((error) => {
  //         setIsLoggedIn(false);
  //       });
  //   }, [loq.pathname]);

  return (
    <nav className="nav nav-pills p-2 shadow">
      <NavLink to="/admin/Items" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Items
      </NavLink>
      {/* {isLoggedIn && ( */}
      <NavLink to="/admin/Ingredients" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Ingredients
      </NavLink>
      {/*    )} */}
      {/* {!isLoggedIn && ( */}
      <NavLink to="/admin/login" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Login/Register
      </NavLink>
      {/* )} */}
    </nav>
  );
};

export default Navbar;
