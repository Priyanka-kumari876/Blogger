import React, { useContext, useState, useEffect } from "react";
import "./Heading.css";
import "./MyProfile.css";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { BlogContext } from "../Context/BlogContext";
import MyPost from "./MyPost";
import { useNavigate } from "react-router-dom";
import userimage from "./user.png";

const MyPofile = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("myprofile");
  const { userBlogs, currentUserId } = useContext(BlogContext);
  const Author_Image =
    userBlogs.length > 0
      ? userBlogs[userBlogs.length - 1].auth_Img || "path/to/default-image.jpg"
      : userimage;
  const author_name =
    userBlogs.length > 0
      ? userBlogs[userBlogs.length - 1].auth_name
      : currentUserId;

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("auth-token") ? true : false
  );
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
  // Function to handle user account deletion
  async function deleteAccount() {
    try {
      // Get the JWT token from localStorage (or wherever it's stored)
      const token = localStorage.getItem("auth-token");

      if (!token) {
        alert("You must be logged in to delete your account");
        return;
      }

      // Confirm deletion action with the user
      const confirmation = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );

      if (!confirmation) {
        return; // If user cancels, do nothing
      }

      // Send the DELETE request to the backend with the JWT token
      const response = await fetch("http://localhost:4000/deleteaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Pass the token in the request headers
        },
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message); // Account deleted successfully
        handleLogout();
        window.location.href = "/";
      } else {
        alert(data.message || "An error occurred while deleting the account");
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
      alert("An error occurred while deleting your account");
    }
  }

  return (
    <>
      <div className="blogheader">
        <div className="header-logo" style={{ listStyle: "none" }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
           <FaBlog size={50} />
          </Link>
          <h1>blogger</h1>
        </div>

        <div className="header-login">
          <img
            src={Author_Image}
            alt="profile-image"
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
          <FaChevronDown
            className="dropdown-icon"
            style={{
              fontSize: "20px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-dark">
            <li
              onClick={() => {
                setSelected("myprofile");
              }}
            >
              <Link
                className={
                  selected === "myprofile"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                to="/myprofile"
              >
                My Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li
              onClick={() => {
                setSelected("addPost");
              }}
            >
              <Link
                className={
                  selected === "addPost"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                to="/addpost"
              >
                Add Post
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li
              onClick={() => {
                setSelected("deletePost");
              }}
            >
              <Link
                className={
                  selected === "deletePost"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                to="/deletepost"
              >
                Delete Post
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="dropdown-item" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>

      <div className="myprofile">
        <div className="profile-info">
          <img src={Author_Image} alt="my-profile" />
          <h1>{author_name}</h1>
          <p>  <hr />All  Posts   <hr /></p>         
        </div>
        <div className="post">
          {userBlogs.length > 0 ? (
            userBlogs.map((item, index) => (
              <MyPost
                key={index}
                id={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
                auth_name={item.auth_name}
                auth_Img={item.auth_Img}
                description={item.description}
                date={item.date}
              />
            ))
          ) : (
            <p>No posts available. Please create or add a post.</p>
          )}
          <button className="btn btn-danger" onClick={deleteAccount}>
            Delete My Account
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPofile;
