import React, { Component } from "react";
import Item from "./item.component";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

class Cart extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    let total = 0;

    this.props.cartUpdated();

    const { user } = this.props.auth;
    this.props.cart.map(
      (item) => (total += item.product.price * item.quantity)
    );

    const cart =
      this.props.cart.length > 0 ? (
        <div>
          <div className="panel-body">
            {this.props.cart.map((item) => {
              return (
                <div key={item.product._id}>
                  <Item item={item} />
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="panel-footer">
            <div className="row text-center">
              <div className="col-xs-11">
                <h4 className="text-right">
                  Total <strong>€{total}</strong>
                </h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col s12 center-align">
          <span>Your cart is empty, go shopping!</span>
        </div>
      );

    return (
      <React.Fragment>
        <div style={{ height: "45vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
              </h4>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <div className="panel-title">
                    <div className="row">
                      <div className="col-xs-6"></div>
                    </div>
                  </div>
                </div>

                {cart}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Cart.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart.cart,
    cartUpdated: () => {
      return true;
    },
  };
};

export default connect(mapStateToProps, { logoutUser })(Cart);
