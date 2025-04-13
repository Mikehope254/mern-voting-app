import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../store/actions";

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-container">
          <li>
            <Link className="navbar-brand" to="/">
              Voting app
            </Link>
          </li>

          {!auth.isAuthenticated ? (
            <React.Fragment>
              <li>
                <Link className="navbar-item" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="/login">
                  Login
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link className="navbar-item1" to="/poll/new">
                  New Poll
                </Link>
              </li>
              <li>
                <button
                  className="navbar-item"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </li>
            </React.Fragment>
          )}
        </ul>
        {auth.isAuthenticated && (
          <p className="navbar-user">Logged in as {auth.user.username}</p>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
