import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class Product extends Component {
  state = {
    inCart: this.props.inCart,
  };

  addToCart = (e) => {
    e.preventDefault();

    this.props.addToCart(this.props.product);

    this.setState({
      inCart: true,
    });
  };

  render() {
    const { product } = this.props;

    return (
      <div
        className=""
        style={{
          //height: "429px",
          height: "529px",
          width: "33%",
          display: "inline-block",
          padding: "3px",
        }}
      >
        <img
          src={product.imageUrl}
          style={{ height: "368px" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body" style={{ padding: "0" }}>
          <p
            className=""
            style={{
              color: "#333333",
              marginTop: "8px",
              marginBottom: "0",
              textAlign: "left",
            }}
          >
            {product.name}
          </p>
          <p className="" style={{ color: "#777777", textAlign: "left" }}>
            EUR {product.price}
          </p>

          {this.props.auth.isAuthenticated && this.state.inCart ? (
            <span
              className="btn btn-success"
              style={{ width: "100%" }}
              disabled
            >
              Added to cart
            </span>
          ) : null}
          {this.props.auth.isAuthenticated && !this.state.inCart ? (
            <a
              href="#"
              onClick={this.addToCart}
              className="btn btn-sm btn-primary float-right"
            >
              Add to cart
            </a>
          ) : null}
          {!this.props.auth.isAuthenticated ? (
            <Link to="/login" className="btn btn-sm btn-primary float-right">
              Add to cart
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Product);
