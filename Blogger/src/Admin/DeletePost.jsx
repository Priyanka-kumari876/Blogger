import React, { useContext, useState, useEffect } from "react";
import "./Heading.css";
import "./DeletePost.css";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { BlogContext } from "../Context/BlogContext";
import { FaBlog } from "react-icons/fa6";
import DeletePostDetail from "./DeletePostDetail";
import userimage from "./user.png";

const DeletePost = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("deletePost");
  const { userBlogs } = useContext(BlogContext);

  const Author_Image =
    userBlogs.length > 0
      ? userBlogs[userBlogs.length - 1].auth_Img || "path/to/default-image.jpg"
      : userimage;

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
    console.log("Before logout:", localStorage.getItem("auth-token"));
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    console.log("After logout:", localStorage.getItem("auth-token"));
    navigate("/");
  };

  return (
    <>
      <div className="blogheader">
        <div className="header-logo" style={{ listStyle: "none" }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaBlog size={50} />
              <h1>blogger</h1>
            </div>
          </Link>
        </div>

        <div className="header-login">
          <img
            src={Author_Image}
            alt="profile-image"
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
          <FaChevronDown
            className="dropdown-icon"
            style={{ fontSize: "20px", cursor: "pointer", marginLeft: "10px" }}
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

      <div className="delete-blogs">
        <div className="heading">
          <hr />
          <p>My Posts</p>
          <hr />
        </div>
        <div className="blogs">
          <div className="blog-index">
            <p>Icon</p>
            <p>Title</p>
            <p>Category</p>
            <p>Date</p>
            <p>Remove</p>
          </div>
          <div className="blog-element">
            <hr />
            {userBlogs.length > 0 ? (
              userBlogs.map((item, index) => (
                <DeletePostDetail
                  key={index}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  auth_Img={item.auth_Img}
                  auth_name={item.auth_name}
                  description={item.description}
                  date={item.date}
                />
              ))
            ) : (
              <p>No posts available. Please create or add a post.</p>
            )}
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePost;

