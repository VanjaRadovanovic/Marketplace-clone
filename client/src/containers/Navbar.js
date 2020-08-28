import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CURRENT_USER, CHANGE_PATH } from '../store/actionTypes';

export default function Navbar() {

  const isLoggedin = useSelector(state => state.currentUser.isAuthenticated);
  const dispatch = useDispatch();

  const loggingOutUser = (e) => {
    console.log('logging out user');
    dispatch({
      type: SET_CURRENT_USER,
      user: {}
    })
  }

  return (
    <nav className="navbar sticky-top navbar-light bg-light pad2">
      <Link to="/" className="navbar-brand" onClick={e => dispatch({ type: CHANGE_PATH, history: { path: '/', class: 'all' } })}>
        Marketplace
      </Link>

      {!isLoggedin ? (
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
      ) : (
          <ul className="navbar-nav flex-row">
            <li className="nav-item mr-1">
              <Link className="nav-link" to="/signin" onClick={e => loggingOutUser(e)}>
                Logout
              </Link>
            </li>
          </ul>
        )}

    </nav>
  )
}