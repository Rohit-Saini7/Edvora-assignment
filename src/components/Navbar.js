import React from "react";
import "./Navbar.css";

function Navbar({ userName, userImage }) {
  return (
    <header className="navbar">
      <div className="companyName">Edvora</div>
      <div className="userName">{userName}</div>
      <div className="userImage">
        <img src={userImage} alt="" />
      </div>
    </header>
  );
}

export default Navbar;
