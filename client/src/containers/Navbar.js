import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link to="/">
          Home page
        </Link>
        <Link to="/signup">
          Sign up
        </Link>
        <Link to="/signin">
          Login
        </Link>
      </div>
    </nav>
  )
}