import React from "react";
import { MdStart } from "react-icons/md";
import "./AuthorBlog.css";
import { Link } from "react-router-dom";

const AuthorBlog = ({ title, category, image, id }) => {
  // const shortDiscripton = description.length > 140 ?description.substr(0,100)+'.......':description;
  return (
    <>
      <div className="blog">
        <div className="blog-detail">
          <img src={image} alt="" />
          <div className="details">
            <h5 style={{ color: "gray" }}>{title}</h5>
          </div>
          <button>{category}</button>
          <div>
            <Link
              to={`/${id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MdStart size={25} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorBlog;
