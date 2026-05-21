import React, { useState } from "react";
import { useContext } from "react";
import { BlogContext } from "../../Context/BlogContext";
import "./BlogList.css";
import Blog from "../Blog/Blog";

const BlogList = () => {
  const { allBlog } = useContext(BlogContext);
  const [menu, setMenu] = useState("All");
  const getRecentBlog = () => {
    return allBlog.slice(-8);
  };

  return (
    <>
      <div className="bloglist">
        <div className="btns">
          <button
            onClick={() => {
              setMenu("All");
            }}
            className={menu === "All" ? "Selected" : "unselected"}
          >
            All
          </button>
          <button
            onClick={() => {
              setMenu("Technology");
            }}
            className={menu === "Technology" ? "Selected" : "unselected"}
          >
            Technology
          </button>
          <button
            onClick={() => {
              setMenu("Lifestyle");
            }}
            className={menu === "Lifestyle" ? "Selected" : "unselected"}
          >
            Lifestyle
          </button>
          <button
            onClick={() => {
              setMenu("Startup");
            }}
            className={menu === "Startup" ? "Selected" : "unselected"}
          >
            Startup
          </button>
          <button
            onClick={() => {
              setMenu("Recent");
            }}
            className={menu === "Recent" ? "Selected" : "unselected"}
          >
            Recent
          </button>
        </div>
        <hr />

        <div className="bloglist-blog">
          {menu === "Recent"
            ? getRecentBlog().map((item, index) => (
                <Blog
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
            : allBlog
                .filter((item) =>
                  menu === "All" ? true : item.category === menu
                )
                .map((item, index) => (
                  <Blog
                    key={index}
                    id={item._id}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    auth_name={item.auth_name}
                    userid={item.userid}
                    auth_Img={item.auth_Img}
                    description={item.description}
                  />
                ))}
        </div>
      </div>
    </>
  );
};

export default BlogList;
