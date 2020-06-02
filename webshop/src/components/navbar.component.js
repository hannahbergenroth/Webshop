import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navbar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    this.props.cartUpdated();

    let total = 0;

    this.props.cart.map(
      (item) => (total += item.product.price * item.quantity)
    );
    return (
      <nav
        className="navbar navbar-light blue-grey lighten-5 navbar-expand-lg"
        style={{ height: "79px" }}
      >
        <Link to="/" className="navbar-brand">
          Webshop
        </Link>

        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            {this.props.auth.isAuthenticated ? (
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create product
                </Link>
              </li>
            ) : null}
          </ul>
        </div>

        {!this.props.auth.isAuthenticated ? (
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" style={{ height: "79px" }} className="nav-link">
                  <i
                    class="material-icons"
                    style={{ position: "relative", top: "6px" }}
                  >
                    search
                  </i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" style={{ height: "79px" }} className="nav-link">
                  <i
                    class="material-icons"
                    style={{ position: "relative", top: "6px" }}
                  >
                    search
                  </i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-cart" className="nav-link">
                  {this.props.cart.length > 0 ? (
                    <span className="label label-info">
                      {this.props.cart.length} item(s): (€{total})
                    </span>
                  ) : (
                    <span> Mypage</span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={this.onLogoutClick}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart.cart,
    cartUpdated: () => {
      return true;
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
