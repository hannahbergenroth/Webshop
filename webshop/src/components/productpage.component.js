import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
//import Pagination from "react-js-pagination";

const Product = (props) => (
  //<tr>
  //<td className="w-20">{props.product.name}</td>

  <div
    className="text-center"
    style={{ display: "inline-block" }}
    className="m-4 card"
    style={{ height: "24rem", width: "16rem", display: "inline-block" }}
  >
    <img
      src={props.product.imageUrl}
      style={{ height: "14rem" }}
      className="card-img-top"
      alt="..."
    />
    <div className="card-body">
      <h5 className="card-title">{props.product.name}</h5>
      <p className="card-text">{props.product.description}</p>

      <Link to={"/products/" + props.product._id}>
        <a
          href="#"
          className="btn btn-dark stretched-link"
          style={{ margin: "auto", display: "block" }}
        >
          Go somewhere
        </a>
      </Link>
    </div>
  </div>

  //<td className="w-20">{props.product.description}</td>
  // <td className="w-20">{props.product.price}</td>
  //<td className="w-20">
  // <img src={props.product.imageUrl} width="50" alt="hej" />
  //</td>

  //<td>
  // <Link to={"/products/" + props.product._id}>Open</Link> |{" "}
  //<a
  //href="#"
  //onClick={() => {
  // props.deleteProduct(props.product._id);
  //}}
  //>
  //delete
  //</a>
  //</td>
  //</tr>
);

export default class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleChangea = this.handleChangea.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currentProducts: [],
      products: [],
      page: 0,
      limit: 10,
      activePage: 1,
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);

    if (values.page) {
      this.setState({
        page: values.page,
      });
    }

    if (values.limit) {
      this.setState({
        limit: values.limit,
      });
    }

    axios
      .get(
        "http://localhost:5000/products/"
        //, {
        //params: {
        //  page: values.page,
        // limit: values.limit,
        // },
        //}
      )
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProduct(id) {
    axios.delete("http://localhost:5000/products/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      products: this.state.products.filter((c) => c._id !== id),
    });
  }

  /*exerciseList() {
    return this.state.products.map((currentproduct) => {
      return (
        <Product
          product={currentproduct}
          deleteProduct={this.deleteProduct}
          key={currentproduct._id}
        />
      );
    });
  }*/

  handleChangea(e) {
    this.setState({ limit: e.target.value });

    //window.location.href = `http://localhost:3000/products?limit=${this.state.limit}`;
    //console.log(`http://localhost:3000/products?limit=${this.state.limit}`);

    axios
      .get("http://localhost:5000/products/", {
        params: {
          limit: e.target.value,
          page: this.state.page,
        },
      })
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleNext() {
    this.setState({
      page: this.state.page + 1,
    });
    console.log(this.state.page, this.state.limit);

    axios
      .get("http://localhost:5000/products/", {
        params: {
          // page: this.state.page,
          // limit: this.state.limit,
        },
      })
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // handlePageChange(pageNumber) {
  // console.log(`active page is ${pageNumber}`);
  // this.setState({ activePage: pageNumber });
  // }

  handleClick(event) {
    this.setState({
      activePage: Number(event.target.id),
    });
    console.log(this.state.activePage);
  }

  render() {
    const { products, todos, activePage, limit } = this.state;

    // Logic for displaying products
    const indexOfLastProduct = activePage * limit;
    const indexOfFirstProduct = indexOfLastProduct - limit;
    var currentProducts = [];
    currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    console.log(indexOfFirstProduct, indexOfLastProduct);

    var renderproducts = [];
    renderproducts = currentProducts.map((producten, index) => {
      return (
        <Product
          product={producten}
          deleteProduct={this.deleteProduct}
          key={index}
        />
      );
    });

    // Logic for displaying page numbers
    //console.log("hej", products.length);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / limit); i++) {
      pageNumbers.push(i);
    }

    console.log("number ", pageNumbers);

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <button
          type="submit"
          key={number}
          id={number}
          value={number}
          className="mx-1 btn btn-outline-dark"
          onClick={this.handleClick}
        >
          {number}
        </button>
      );
    });

    return (
      <div>
        <h3>Products</h3>
        {renderPageNumbers}
        <div className="container w-50 my-3 text-center">
          <div className="p-1 form-check form-check-inline">
            <input
              className=" form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value={2}
              onChange={this.handleChangea}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              2
            </label>
          </div>
          <div className="p-1 form-check form-check-inline">
            <input
              className=" form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value={5}
              onChange={this.handleChangea}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              5
            </label>
          </div>
          <div className="p-1 form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value={10}
              onChange={this.handleChangea}
            />
            <label className="form-check-label" htmlFor="inlineRadio3">
              10
            </label>
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              2
            </a>
            <a className="dropdown-item" href="#">
              5
            </a>
            <a className="dropdown-item" href="#">
              10
            </a>
          </div>
        </div>

        <table className="table">
          {" "}
          <thead className="thead-light">
            {" "}
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Option</th>{" "}
            </tr>{" "}
          </thead>
          <tbody></tbody>{" "}
        </table>

        <div style={{ textAlign: "center" }}>{renderproducts}</div>
      </div>
    );
  }
}
