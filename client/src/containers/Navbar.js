import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar sticky-top navbar-light bg-light pad2">
      <Link to="/" className="navbar-brand">
        Home page
      </Link>
      <ul className="navbar-nav flex-row">
        <li className="nav-item mr-4">
          <Link className="nav-link" to="/signup">
            Sign up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signin">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  )
}