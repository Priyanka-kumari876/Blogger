import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Blog = ({
  title,
  category,
  image,
  id,
  auth_name,
  auth_Img,
  userid,
  description = "",
}) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleOnClick = () => {
    // Use navigate to change the route programmatically
    navigate(`/${id}`);
  };

  // Check if description is available and is a string
  const shortDescription =
    description && description.length > 140
      ? description.substr(0, 90) + "......."
      : description;

  return (
    <div className="blog">
      <div
        className="card"
        style={{
          width: "20rem",
          margin: "14px",
          boxShadow: "0px 0px 10px black",
          height: "500px",
        }}
      >
        <a href={`/${id}`}>
          <img
            src={image}
            className="card-img-top"
            alt="image"
            style={{ height: "170px" }}
          />
        </a>
        <p
          className="category"
          style={{
            backgroundColor: "black",
            display: "inline-block",
            textAlign: "center",
            color: "white",
            fontSize: "small",
            marginBottom: "0px",
          }}
        >
          {category}
        </p>
        <div className="card-body">
          <Link to={`/${id}`} style={{ textDecoration: "none" }}>
            <h5
              className="card-title"
              style={{ color: "black", height: "67px" }}
            >
              {title}
            </h5>
          </Link>
          <p style={{ color: "grey", fontSize: "16px" }}>{shortDescription}</p>
          <div
            className="reactions"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "0px",
            }}
          >
            <div
              className=""
              style={{
                margin: "19px 4px 0px 0px",
                justifyContent: "space-between",
              }}
            >
              <Link to={`/author/${userid}`}>
                <img
                  src={auth_Img}
                  alt="author"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "49px",
                  }}
                />
              </Link>
              <p style={{ color: "grey" }}>{auth_name}</p>
            </div>
            <button
              className="btn btn-primary"
              style={{
                height: "36px",
                margin: "44px 0px 0px 20px",
                width: "60%",
              }}
              onClick={handleOnClick} // Use onClick to navigate
            >
              Read more <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
