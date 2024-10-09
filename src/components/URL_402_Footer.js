

import React from "react";

import Link from "next/link";
import logo from './4NECOtechLOGO.png'

const URL_402_Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="https://profiles.eco/4n?ref=tm" rel="noopener" target="blank">
          <img
            class="eco-trustmark"
            alt=".eco profile for 4n.eco"
            src="https://trust.profiles.eco/4n/eco-circle.svg?color=%2327B438"
            id="logogreen"
          />
        </a>

        <div className="footer-links">
          <h3 className="heading">Company</h3>
          <ul className="list-unstyled">
            <li>
              <Link className="footer-link" href="/URL_403_About">
                About
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/URL_404_Contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/URL_405_Career">
                Career
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/URL_406_Sitemap">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h3 className="heading">Products</h3>
          <ul className="list-unstyled">
            <li>
              <Link className="footer-link" href="/">
                URL Shortener
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/login">
                Custom URLs
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/login">
                Custom QR Codes
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/">
                Custom Short URLs
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h3 className="heading">Resources</h3>
          <ul className="list-unstyled">
            <li>
              <Link className="footer-link" href="/">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h3 className="heading">Legal</h3>
          <ul className="list-unstyled">
            <li>
              <Link className="footer-link" href="/">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="footer-link" href="/">
                Code of Conduct
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h3 className="heading">Social Media</h3>
          <ul className="list-unstyled">
            <li>
              <Link
                className="footer-link"
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61561072294751"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                className="footer-link"
                target="_blank"
                href="https://www.instagram.com/4necotech"
              >
                Instagram
              </Link>
            </li>
            {/* <li> <Link className="footer-link" to="/">X</Link> </li> */}
            <li>
              <Link
                className="footer-link"
                target="_blank"
                href="https://www.linkedin.com/company/4necotech/"
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
        
      </div>
      <div className="footer-right">
        {/* <img src="./logo.png" alt="Company Logo" /> */}
        <img src={logo} alt="Company Logo" />
        <p id="company-name">
          <span className="fourN">4N</span> <span className="eco">Eco</span>
          <span className="tech">Tech</span>
        </p>
        <p style={{color:"black"}}>© 2024 4N EcoTech. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default URL_402_Footer;
