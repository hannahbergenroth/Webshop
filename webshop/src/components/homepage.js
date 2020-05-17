import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchProduct } from "../actions/productActions";
import Product from "./producttest";

class Home extends Component {
  componentWillMount() {
    this.props.fetchProduct();
  }

  render() {
    const postItems = this.props.products.map((product) => (
      <Product product={product} key={product.id} />
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
}

Home.propTypes = {
  fetchProduct: PropTypes.func.isRequired,
  //posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.product.items,
});

export default connect(mapStateToProps, { fetchProduct })(Home);
