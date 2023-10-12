import React from "react";

import logo from "./logo512.png";

const NavbarItem = ({ title, classprops }) => <li>{title}</li>;

const Navbar = () => {
  return (
    <div className="white-glassmorphism">
      <nav className="text-gradient">
        <ul>
          <img src={logo} alt="logo" className="logo" />
          {[
          ].map((item, index) => (
            <NavbarItem key={item + index} title={item} className="navbar-item"/>
          ))}
          <div className="centered-text">
            <span className="bold-text large-text">DecentraLibro</span>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;






