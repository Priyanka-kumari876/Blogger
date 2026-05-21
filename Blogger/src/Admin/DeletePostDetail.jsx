import React, { useContext } from 'react';
import './DeletePostDetail.css';
import { MdAutoDelete } from 'react-icons/md';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BlogContext } from '../Context/BlogContext';

const DeletePostDetail = ({ image, title, id, category, date }) => {
  const { removeBlog } = useContext(BlogContext); // Get removeBlog from context

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const remove_blog = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/removeblog', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        toast.success('Blog deleted successfully!', { autoClose: 5000 });
        removeBlog(id);
      } else {
        toast.error('Failed to delete blog', { autoClose: 5000 }); 
      }
    } catch (error) {
      toast.error('Error deleting blog', { autoClose: 5000 }); 
    }
  };

  return (
    <>
     
      <div className="delete-blog">
        <img
          src={image}
          alt="icon"
          style={{ height: '84px', width: '120px' }}
        />
        <div className="blog-details">
          <h5>{title}</h5>
          <p>{category}</p>
          <p>{formattedDate}</p>
          <div
            className="remove"
            onClick={() => {
              remove_blog(id);
            }}
          >
            <MdAutoDelete size={25} />
          </div>
        </div>
      </div>
      <div>
        <hr />
      </div>
    </>
  );
};

export default DeletePostDetail;
