import React from "react";
import "./herosection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="animate-slide-in">
          Welcome to Blogger - Learn, Share, and Grow Together
        </h1>
        <p className="animate-fade-in">
          A space where developers, tech enthusiasts, and innovators share
          knowledge, ideas, and experiences.
        </p>
        <p className="animate-zoom-in">
          Discover a wealth of insights from technology to startups, lifestyle,
          and more. Whether you're here to read, write, or connect, Blogger is
          your destination for inspiration and growth.
        </p>
        <p >
          Stay updated with trendy blogs, join engaging meetups, and explore
          topics that ignite your passion for learning.
        </p>
        <div className="hero-buttons">
          <button className="hero-button">Trendy Blogs Published</button>
          <button className="hero-button">Join Meetups</button>
          <button className="hero-button">Explore Topics</button>
        </div>
      </div>
      <div className="background-circles">
        <span className="circle pink animate-bounce"></span>
        <span className="circle yellow animate-float"></span>
        <span className="circle blue animate-spin"></span>
        <span className="circle purple animate-fade"></span>
      </div>
    </div>
  );
};

export default HeroSection;
