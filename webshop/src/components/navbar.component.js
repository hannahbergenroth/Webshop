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

    const { user } = this.props;

    this.props.cart.map(
      (item) => (total += item.product.price * item.quantity)
    );
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
              <Link to="/products" className="nav-link">
                Show products
              </Link>
            </li>

            {this.props.auth.isAuthenticated ? (
              <React.Fragment>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Create product
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={this.onLogoutClick}
                  >
                    Logout
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/my-cart" className="nav-link">
                    {this.props.cart.length > 0 ? (
                      <span className="label label-info">
                        {this.props.cart.length} items: (${total.toFixed(2)})
                      </span>
                    ) : null}
                    ShoppingCart
                  </Link>
                </li>
              </React.Fragment>
            ) : null}

            {!this.props.auth.isAuthenticated ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : null}

            <li className="navbar-item">
              <Link to="/producten" className="nav-link">
                Producten
              </Link>
            </li>
          </ul>
        </div>
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

export default connect(mapStateToProps, { logoutUser })(Navbar);
