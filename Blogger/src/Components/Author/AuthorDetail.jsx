import React, { useContext, useEffect } from "react";
import "./AuthorDetail.css";
import { BlogContext } from "../../Context/BlogContext";
import { useParams } from "react-router-dom";
import AuthorBlog from "./AuthoBlog";

const AuthorDetail = () => {
  const { allBlog } = useContext(BlogContext);
  const { userid } = useParams();

  const authorBlogs = allBlog.filter((e) => e.userid === userid);
  const image = authorBlogs.length > 0 ? authorBlogs[0].auth_Img : null;
  const name =
    authorBlogs.length > 0
      ? authorBlogs[authorBlogs.length - 1].auth_name
      : null;
  const email =
    authorBlogs.length > 0 ? authorBlogs[authorBlogs.length - 1].email : null;

  return (
    <>
      <div className="author-detail">
        <div className="author-profile">
          <img src={image} alt="" />
          <h1>
            {name} <hr />
          </h1>
          <h5>Contact : {email}</h5>
        </div>
        <hr />
        <div className="blog">
          <h1>Blogs</h1>
          {authorBlogs.length > 0 ? (
            authorBlogs.map((item, index) => (
              <AuthorBlog
                key={index}
                id={item._id}
                image={item.image}
                title={item.title}
                category={item.category}
                auth_name={item.auth_name}
                auth_Img={item.auth_Img}
                description={item.description}
              />
            ))
          ) : (
            <p>No blogs found for the author.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthorDetail;
