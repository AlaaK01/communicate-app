import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "./Header.css";

const Header = ({ fontColor, backgroundColor }) => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <header style={{ backgroundColor: backgroundColor }}>
      <p style={{ color: fontColor }}>
        COMMUNICATION <span>APP</span>
      </p>
      <nav ref={navRef}>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="./myFavorite">My Favorite</NavLink>
        <NavLink to="./comments">Comments</NavLink>
        <NavLink to="./users">Users</NavLink>
        <NavLink to="./about">About us</NavLink>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Header;
