import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className=" mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/dashboard">
          <img
            src={require(`../../assets/images/buddie_logo3.png`).default}
            alt="buddie logo"
            className="buddieLogo"
            key="logoBuddie"
          />
        </Link>

        <nav className="text-center navFont">
          {Auth.loggedIn() ? (
            <>
              {/* if logged in go to dashboard? */}
              <Link to="/dashboard">DASHBOARD</Link>
              <Link to="/taskboard">TASKBOARD</Link>
              {/* <Link to="/profile">MY PROFILE</Link> */}
              <a href="/" onClick={logout}>
                LOGOUT
              </a>
            </>
          ) : (
            <>
              <Link to="/login">LOGIN</Link>
              <Link to="/signup">SIGN UP</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
