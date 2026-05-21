import React from "react";
import Header from "./Header/Header";
import BlogList from "./BlogList/BlogList";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <div className="home">
        <Header></Header>
        <HeroSection></HeroSection>
        <BlogList></BlogList>
      </div>
    </>
  );
};

export default Home;
