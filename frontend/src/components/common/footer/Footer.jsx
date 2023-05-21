import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <hr className="footer-seperator" />
      <div className="footer-info">
        <div className="footer-info-left">
          <div className="footer-info__name">Categories</div>
          <div className="footer-info__returns">
            <div className="item-footer">Graphics & Design</div>
            <div className="item-footer">Digital Marketing</div>
            <div className="item-footer">Writing & Translation</div>
            <div className="item-footer">Video & Animation</div>
            <div className="item-footer">Programming & Tech</div>
            <div className="item-footer">Data</div>
            <div className="item-footer">Business</div>
            <div className="item-footer">Lifestyle</div>
            <div className="item-footer">Sitemap</div>
          </div>
        </div>

        <div className="footer-info-left">
          <div className="footer-info__name">About</div>
          <div className="footer-info__returns">
            <div className="item-footer">Careers</div>
            <div className="item-footer">Press & News</div>
            <div className="item-footer">Partnerships</div>
            <div className="item-footer">Privacy Policy</div>
            <div className="item-footer">Terms of Service</div>
            <div className="item-footer">Intellectual Property Claims</div>
            <div className="item-footer">Investor Relations</div>
          </div>
        </div>

        <div className="footer-info-left">
          <div className="footer-info__name">Support</div>
          <div className="footer-info__returns">
            <div className="item-footer">Help & Support</div>
            <div className="item-footer">Trust & Safety</div>
            <div className="item-footer">Selling on Freelancer</div>
            <div className="item-footer">Buying on Freelancer</div>
          </div>
        </div>

        <div className="footer-info-left">
          <div className="footer-info__name">Community</div>
          <div className="footer-info__returns">
            <div className="item-footer">Events</div>
            <div className="item-footer">Blog</div>
            <div className="item-footer">Forum</div>
            <div className="item-footer">Community Standards</div>
            <div className="item-footer">Podcast</div>
            <div className="item-footer">Affiliates</div>
            <div className="item-footer">Invite a Friend</div>
            <div className="item-footer">Become a Seller</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
