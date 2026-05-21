import React from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../../Context/BlogContext";
import { useContext } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import "./Page.css";

const Page = () => {
  const { allBlog } = useContext(BlogContext);
  const { id } = useParams();
  const blog = allBlog.find((e) => e._id === id);

  return (
    <>
      <div>
        {blog ? (
          <div className="page">
            <div className="title">
              {" "}
              <h3>{blog.title}</h3>
              <Link to={`/author/${blog.userid}`}>
                <img
                  src={blog.auth_Img}
                  alt="image"
                  style={{
                    height: "70px",
                    width: "70px",
                    borderRadius: "39px",
                    margin: "0 auto",
                  }}
                />
              </Link>
              <p>{blog.auth_name} </p>
              <img src={blog.image} alt="image" className="image" />
            </div>
            <div className="content">
              <div className="description">
                <h2>{blog.title}</h2>
                <h1>Introduction:</h1>
                <p>{blog.description}</p>

                <h1> Conclusion:</h1>
                <p> {blog.conclusion} </p>
              </div>
              <div className="blogfooter">
                {/* <div className="footer-list">
                  <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {" "}
                    Share this article on social media{" "}
                  </h3>
                  <ul className="nav col-md-4 justify-content-end">
                    <li>
                      <FaFacebookSquare />
                    </li>
                    <li>
                      <FaTwitter />
                    </li>
                    <li>
                      <FaSquareInstagram />
                    </li>
                    <li>
                      <FaTelegram />
                    </li>
                  </ul>
                </div> */}
                <Link to={`/author/${blog.userid}`}>
                
                  <button className="view">View Profile</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Loading></Loading>
        )}
      </div>
    </>
  );
};

export default Page;
