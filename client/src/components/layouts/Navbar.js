import React from "react";
import PropTyeps from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
      <div className="navbar bg-primary">
        <h3>
          <i className={icon}></i>
          {title}
        </h3>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
  );
};

Navbar.propTypes = {
  title: PropTyeps.string.isRequired,
  icon: PropTyeps.string,
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-address-book",
};

export default Navbar;
