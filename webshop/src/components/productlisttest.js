import React, { Component } from "react";
import Product from "./producttest";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";
import PropTypes from "prop-types";
import { fetchProduct } from "../actions/productActions";

class ProductList extends Component {
  componentWillMount() {
    this.props.fetchProduct();
  }

  addToCart = (product) => {
    console.log(product.id, product.key);
    if (this.props.auth.isAuthenticated) {
      console.log("yeyyy");
    } else {
      console.log("NOOOOO");
    }
    this.props.addToCart(product);
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <h2>Product List</h2>
        <br />
        <div className="row">
          {this.props.item.map((product) => (
            <Product
              product={product}
              addToCart={this.addToCart}
              inCart={
                this.props.cart.length > 0 &&
                this.props.cart.filter((e) => e.product._id === product._id)
                  .length > 0
              }
              key={product.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    products: state.product.products,
    cart: state.cart.cart,
    item: state.product.items,
  };
};

ProductList.propTypes = {
  //logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  fetchProduct: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    fetchProduct: () => {
      dispatch(fetchProduct());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
