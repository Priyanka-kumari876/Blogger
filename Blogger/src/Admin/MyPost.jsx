import React from 'react'
import './MyPost.css'
import { IoLogInSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const MyPost = ({image , title ,id, category, description ,date}) => {
  const shortDescription = (description && description.length > 670) 
    ? description.substr(0, 550) + '....'
    : description;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  return (<>
   <div className="post-page">
    <div className="post-details">
      <div className="post-title">  <h2>{title}</h2></div>
    <div className="post-content">
      <div className="post-image"><img src={image} alt="bolg-image" /> </div>
      <div className="post-description">
        <p>{shortDescription} <Link to={`/${id}`}style={{ textDecoration: "none", color: "inherit" }}><IoLogInSharp  size={25}/></Link></p>
        <div className="blog-category">
          <h5>{category}</h5>
          <p>{formattedDate}
          </p>
        </div>
      </div>
    

    </div> 
      
    </div>
   </div>
   </>
  )
}

export default MyPost