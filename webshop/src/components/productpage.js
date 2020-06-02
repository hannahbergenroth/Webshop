import React, { Component } from "react";
import Product from "./product";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";
import PropTypes from "prop-types";
import { fetchProduct } from "../actions/productActions";
import image from "./img/toplist.png";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangea = this.handleChangea.bind(this);
    this.state = {
      currentProducts: [],
      limit: 6,
      activePage: 1,
    };
  }

  componentDidMount() {
    this.props.fetchProduct();

  }

  addToCart = (product) => {
    this.props.addToCart(product);
  };

  handleClick(event) {
    this.setState({
      activePage: Number(event.target.id),
    });
  }

  handleChangea(e) {
    this.setState({ activePage: 1, limit: e.target.value });
  }

  render() {
    const { activePage, limit } = this.state;
    const { item } = this.props;

    // Logic for displaying products
    const indexOfLastProduct = activePage * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    var currentProducts = [];
    currentProducts = item.slice(indexOfFirstProduct, indexOfLastProduct);

    var renderproducts = [];
    renderproducts = currentProducts.map((product) => {
      return (
        <Product
          product={product}
          addToCart={this.addToCart}
          inCart={
            this.props.cart.length > 0 &&
            this.props.cart.filter((e) => e.product._id === product._id)
              .length > 0
          }
          key={product._id}
        />
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(item.length / limit); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <button
          type="submit"
          key={number}
          id={number}
          value={number}
          className="mx-1 btn btn-outline-dark"
          onClick={this.handleClick}
          style={{
            float: "left",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {number}
        </button>
      );
    });

    return (
      <div className="container">
        <div
          class="jumbotron jumbotron-fluid"
          style={{ height: "330px", padding: "0" }}
        >
          <img src={image} alt="" style={{ width: "100%" }} />
        </div>

        <div style={{ height: "40px" }}>
          {renderPageNumbers}
          <div
            className="container w-50 my-3 text-center"
            style={{
              height: "100%",
              alignItems: "center",
              position: "relative",
              verticalAlign: "middle",
            }}
          >
            <label name="control-label" style={{ marginRight: "15px" }}>
              Show number of products:{" "}
            </label>

            <label>
              <input
                className="with-gap form-check-input"
                name="group1"
                type="radio"
                value={6}
                onChange={this.handleChangea}
              />
              <span style={{ marginRight: "20px" }}>6</span>
            </label>

            <label>
              <input
                className="with-gap form-check-input"
                name="group1"
                type="radio"
                value={12}
                onChange={this.handleChangea}
              />
              <span style={{ marginRight: "20px" }}>12</span>
            </label>

            <label>
              <input
                className="with-gap form-check-input"
                name="group1"
                type="radio"
                value={18}
                onChange={this.handleChangea}
              />
              <span style={{ marginLeft: "0" }}>18</span>
            </label>
          </div>
        </div>
        <div className="row">{renderproducts}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,

    cart: state.cart.cart,
    item: state.product.items,
  };
};

ProductPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
