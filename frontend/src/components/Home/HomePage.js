import React from "react";
import BackgroundSlider from "react-background-slider";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import image1 from "../../assets/images/slideshow/1.webp";
import image2 from "../../assets/images/slideshow/2.jpg";
import image6 from "../../assets/images/slideshow/3.jpg";
import image3 from "../../assets/images/slideshow/4.jpg";
import image4 from "../../assets/images/slideshow/5.jpg";
import image5 from "../../assets/images/slideshow/6.jpg";

import "./home.css";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
  const data = useSelector((state) => state.jobList.jobList);
  const onClickFunction = () => {
    console.log(data);
  };
  return (
    <div className="imageScale">
      <BackgroundSlider
        images={[image1, image2, image3, image4, image5, image6]}
        position="relative"
      />
      <div className="centered">
        <div className="mainTitle">
          Find the perfect freelance services for your business
        </div>
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <Link to="/explore">
          <Button
            variant="outline-success buttonBottom"
            onClick={() => {
              onClickFunction();
            }}
          >
            Let's Go
          </Button>
        </Link>
      </div>
      <div className="padding-div" />
    </div>
  );
};

export default HomePage;
