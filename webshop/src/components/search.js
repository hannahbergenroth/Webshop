import React from "react";
import axios from "axios";

import Product from "./product";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);

    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.state = {
      query: "",
      results: [],
      loading: false,
      message: "",
    };
    this.cancel = "";
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;

    if (!query) {
      this.setState({ query, results: [], message: "" });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  fetchSearchResults = (query) => {
    //console.log(query);
    const searchUrl = "http://localhost:5000/products/" + query;
    if (this.cancel) {
      // Cancel the previous request before making a new request
      this.cancel.cancel();
    }
    // Create a new CancelToken
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data.length
          ? "There are no more search results. Please try a new search."
          : "";
        this.setState({
          results: res.data,
          message: resultNotFoundMsg,
          loading: false,
        });
      });
  };

  addToCart = (product) => {
    this.props.addToCart(product);
  };

  render() {
    const { query, results } = this.state;

    var renderproducts = [];

    renderproducts = results.map((product, index) => {
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

    return (
      <div>
        <div className="container">
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "100px" }}
          >
            <label className="search-label" htmlFor="search-input">
              <input
                type="text"
                value={query}
                id="search-input"
                placeholder="Search for a product"
                onChange={this.handleOnInputChange}
                style={{ width: "310px" }}
              />
              <i class="material-icons">search</i>
            </label>
          </div>

          <div className="row">{renderproducts}</div>
        </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
