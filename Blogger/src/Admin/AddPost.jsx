import "./Heading.css";
import "./AddPost.css";
import { FaBlog } from "react-icons/fa6";
import React, { useContext, useState, useEffect } from "react";
import userImage from "./user.png";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import upload from "./upload.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlogContext } from "../Context/BlogContext";
import userimage from "./user.png";

const AddPost = () => {
  const navigate = useNavigate();
  const { userBlogs } = useContext(BlogContext);
  const [image, setImage] = useState(null);
  const [auth_Img, setAuth_image] = useState(null);
  const [selected, setSelected] = useState("addPost");

  const Author_Image =
    userBlogs.length > 0
      ? userBlogs[userBlogs.length - 1]?.auth_Img || "path/to/default-image.jpg"
      : userimage;

  const [blogDetails, setBlogDetails] = useState({
    title: "",
    image: "",
    description: "",
    category: "Lifestyle",
    auth_Img: "",
    conclusion: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const auth_imageHandler = (e) => {
    setAuth_image(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });
  };

  const Add_Blog = async () => {
    try {
      let responseData;
      let blog = blogDetails;
      let formData = new FormData();

      formData.append("blog", image);
      formData.append("auth_Img", auth_Img);

      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      responseData = await uploadResponse.json();

      if (responseData?.success) {
        blog.image = responseData.blogImageUrl;
        blog.auth_Img = responseData.authImageUrl;

        const token = localStorage.getItem("auth-token");
        if (token) {
          const blogResponse = await fetch("http://localhost:4000/addblog", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify(blog),
          });

          const blogData = await blogResponse.json();

          if (blogData.success) {
            toast.success("Blog added successfully!", {
              autoClose: 5000,
            });
          } else {
            toast.error("Error while adding blog.", {
              autoClose: 5000,
            });
          }
        }
      } else {
        toast.error("Failed to upload images, please try again.", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", {
        autoClose: 5000,
      });
    }
  };

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
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="blogheader">
        <div className="header-logo" style={{ listStyle: "none" }}>
       <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
             <div style={{ display: "flex", alignItems: "center" }}>
               <FaBlog size={50} />
               <h1>blogger</h1>
             </div>
           </Link>         
        </div>

        <div className="heading">Add Blogs</div>

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
            <li>
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
            <li>
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
            <li>
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

      <div className="add-blog">
        <div className="inputs">
          <div className="inputfield">
            <p>Blog Title</p>
            <input
              type="text"
              value={blogDetails.title}
              name="title"
              placeholder="Type here"
              onChange={changeHandler}
            />
          </div>
          <div className="inputfield">
            <p>Upload Image</p>
            <label htmlFor="file-input">
              <img
                src={image ? URL.createObjectURL(image) : upload}
                alt="upload-image"
                className="upload"
              />
            </label>
            <input
              type="file"
              name="image"
              id="file-input"
              hidden
              onChange={imageHandler}
            />
          </div>
          <div className="inputfield">
            <p>Description</p>
            <textarea
              value={blogDetails.description}
              onChange={changeHandler}
              name="description"
              rows="4"
              cols="50"
              placeholder="Type here"
            ></textarea>
          </div>
          <div className="inputfield">
            <p>Category</p>
            <select
              name="category"
              className="selector"
              value={blogDetails.category}
              onChange={changeHandler}
            >
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Startup">Startup</option>
            </select>
          </div>
          <div className="author">
            <div className="inputfield">
              <label htmlFor="file-input-author">
                <img
                  src={auth_Img ? URL.createObjectURL(auth_Img) : userImage}
                  alt="auth_image"
                  className="auth_image"
                  style={{
                    height: "70px",
                    width: "70px",
                    borderRadius: "50%",
                    marginTop: "16px",
                  }}
                />
                <p style={{ fontSize: "16px", color: "gray" }}>Profile Pic</p>
              </label>
              <input
                type="file"
                name="auth_Img"
                id="file-input-author"
                hidden
                onChange={auth_imageHandler}
              />
            </div>
          </div>
          <div className="inputfield">
            <p>Conclusion</p>
            <textarea
              value={blogDetails.conclusion}
              onChange={changeHandler}
              name="conclusion"
              rows="2"
              cols="50"
              placeholder="Type here"
            ></textarea>
          </div>
          <button className="addblog-btn" onClick={Add_Blog}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPost;
