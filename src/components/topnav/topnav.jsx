import React, { Component } from "react";
import "./topnav.scss";
import logo from "../../assets/img/logo.svg";

class Topnav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">
          <img src={logo} alt="logo" />
          ColorBlend
        </span>

        <div className="navbar-nav ml-auto">
          <a className="nav-item nav-link active" href="https://prasaddasanatti.in/" target="_blank" rel="noopener noreferrer">
            About
          </a>
        </div>
      </nav>
    );
  }
}

export default Topnav;
