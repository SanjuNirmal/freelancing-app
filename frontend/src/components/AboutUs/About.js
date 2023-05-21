import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="container">
      <div className="left">
        <div className="mainTitle">
          A whole world of freelance talent at your fingertips
        </div>
        <div className="subTitle">The best for every budget</div>
        <div className="subText">
          Find high-quality services at every price point. No hourly rates, just
          project-based pricing.
        </div>

        <div className="subTitle">Quality work done quickly</div>
        <div className="subText">
          Find the right freelancer to begin working on your project within
          minutes.
        </div>

        <div className="subTitle">Protected payments, every time</div>
        <div className="subText">
          Always know what you'll pay upfront. Your payment isn't released until
          you approve the work.
        </div>

        <div className="subTitle">24/7 support</div>
        <div className="subText">
          Questions? Our round-the-clock support team is available to help
          anytime, anywhere.
        </div>
      </div>
      <div className="right">
        <video loop autoPlay className="video">
          <source
            src={require("../../assets/videos/vmvv3czyk2ifedefkau7.mp4")}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default About;
