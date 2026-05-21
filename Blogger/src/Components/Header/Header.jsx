import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBlog } from "react-icons/fa6";
const Header = () => {
  const navigate = useNavigate();

  //First method
  //   // Check if the user is logged in by verifying if the 'auth-token' exists in localStorage
  //   const isLoggedIn = localStorage.getItem('auth-token');
  //   const handleLogout = () => {
  //     localStorage.removeItem('auth-token');
  //     navigate('/');
  //   };
  // ;

  //Second method
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth-token") ? true : false
  );

  // UseEffect to listen for changes in localStorage and update the state accordingly
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("auth-token") ? true : false);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("auth-token");

    console.log("Before logout:", localStorage.getItem("auth-token"));
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    console.log("After logout:", localStorage.getItem("auth-token"));
    navigate("/");
  };

  return (
    <>
      <div className="blogheader" style={{ backgroundColor: "#e7ebee" }}>
      <div className="header-logo" style={{listStyle: "none"}}>
    <Link to={'/'} style={{ textDecoration: "none", color: "inherit" }}>  <FaBlog size={50}/></Link><h1>blogger</h1>
  </div>

        <div className="header-login">
          {!isLoggedIn ? (
            // If the user is not logged in, show only the Login button
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className="get-start login">Login</button>
            </Link>
          ) : (
            // If the user is logged in, show the Get Started dropdown button
            <div className="dropdown">
              <button
                className="get-start btn-lg dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Get Started
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <Link className="dropdown-item active" to="/myprofile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/addpost">
                    Add Post
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link className="dropdown-item" to="/deletepost">
                    Delete Post
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li onClick={handleLogout} className="dropdown-item">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
