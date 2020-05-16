import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-dark bg-dark navbar-expand-lg"
        style={{ height: "79px" }}
      >
        <Link to="/" className="navbar-brand">
          Webshop
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create product
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/products" className="nav-link">
                Show products
              </Link>
            </li>

            <li className="navbar-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
