import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
        className="card"
        style={{
          //height: "429px",
          height: "520px",
          width: "32%",
          display: "inline-block",
          margin: "6px",
          border: "0px",
        }}
      >
        <img
          src={product.imageUrl}
          style={{ height: "320px", padding: "2px" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {product.name}
            <i className="material-icons right">more_vert</i>
          </span>

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
          <p
            className=""
            style={{
              color: "#777777",
              textAlign: "left",
              marginBottom: "10px",
            }}
          >
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
              style={{ width: "100%" }}
            >
              Add to cart
            </a>
          ) : null}
          {!this.props.auth.isAuthenticated ? (
            <Link
              to="/login"
              className="btn btn-sm btn-primary float-right"
              style={{ width: "100%" }}
            >
              Add to cart
            </Link>
          ) : null}
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {product.name}
            <i className="material-icons right">close</i>
          </span>
          <p>{product.description}</p>
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
