import { createContext, useEffect, useState } from "react";

export const BlogContext = createContext(null);

export const BlogContextProvider = (props) => {
  const [allBlog, setAllBlog] = useState([]);
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("User");

  useEffect(() => {
    // Fetch all blogs
    fetch("http://localhost:4000/allblogs")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch blogs");
        return response.json();
      })
      .then((data) => {
        console.log("Blogs fetched:", data);
        if (Array.isArray(data)) {
          setAllBlog(data);
        } else {
          console.error("Unexpected response format for blogs:", data);
          setAllBlog([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });

    // Fetch current user details
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/getuser", {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch user details");
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setCurrentUserName(data.id);
            setCurrentUserId(data.name);
          } else {
            console.error("Failed to fetch user details:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  const userBlogs = Array.isArray(allBlog)
    ? allBlog.filter((blog) => blog.userid === currentUserName)
    : [];

  const removeBlog = (id) => {
    setAllBlog((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  const contextValue = {
    allBlog,
    currentUserName,
    userBlogs,
    removeBlog,
    currentUserId,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {props.children}
    </BlogContext.Provider>
  );
};
