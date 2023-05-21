import React from "react";
import BackgroundSlider from "react-background-slider";

import image1 from "../../assets/images/slideshow/1.webp";
import image2 from "../../assets/images/slideshow/2.jpg";
import image6 from "../../assets/images/slideshow/3.jpg";
import image3 from "../../assets/images/slideshow/4.jpg";
import image4 from "../../assets/images/slideshow/5.jpg";
import image5 from "../../assets/images/slideshow/6.jpg";

import "./home.css";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const HomePageSignIn = () => {
  return (
    <div className="imageScale">
      <BackgroundSlider
        images={[image1, image2, image3, image4, image5, image6]}
        position="relative"
      />
      <div className="centered">
        <div className="mainTitle">
          Find the perfect freelance services for your business <br />
          Sign up and get started
        </div>
        <div className="search">
          
        </div>
        <Link to="/login">
          <Button variant="outline-success buttonBottom">
            Let's Get Started
          </Button>
        </Link>
      </div>
      <div className="padding-div" />
    </div>
  );
};

export default HomePageSignIn;
