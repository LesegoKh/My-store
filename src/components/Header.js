// Import Files & Components
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ loggedInUser, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My App
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/store">
                Store
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {loggedInUser ? (
            <>
              <span className="navbar-text me-3">Welcome, {loggedInUser}</span>
              <button className="btn btn-outline-danger" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
