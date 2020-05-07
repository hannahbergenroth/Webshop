import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
//import Pagination from "react-js-pagination";
import bild from "./bild1.png";

const Product = (props) => (
  //<tr>
  //<td className="w-20">{props.product.name}</td>
  <Link to={"/products/" + props.product._id}>
    <div
      className=""
      style={{
        height: "429px",
        width: "276px",
        display: "inline-block",
        padding: "3px",
      }}
    >
      <img
        src={props.product.imageUrl}
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
          {props.product.name}
        </p>
        <p className="" style={{ color: "#777777", textAlign: "left" }}>
          EUR {props.product.price}
        </p>
      </div>
    </div>
  </Link>

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
      <div className=" container">
        <div
          class="jumbotron jumbotron-fluid"
          style={{ height: "330px", padding: "0" }}
        >
          <img src={bild} alt="" style={{ width: "100%" }} />
        </div>
        {renderPageNumbers}
        <div className="container w-50 my-3 text-center">
          <label name="control-label">Show number of products: </label>

          <label>
            <input
              className="with-gap form-check-input"
              name="group1"
              type="radio"
              value={5}
              onChange={this.handleChangea}
            />
            <span>5</span>
          </label>

          <label>
            <input
              className="with-gap form-check-input"
              name="group1"
              type="radio"
              value={10}
              onChange={this.handleChangea}
            />
            <span style={{ paddingLeft: "-10px" }}>10</span>
          </label>

          <label>
            <input
              className="with-gap form-check-input"
              name="group1"
              type="radio"
              value={20}
              onChange={this.handleChangea}
            />
            <span style={{ margin: "0" }}>20</span>
          </label>
        </div>

        <div style={{ textAlign: "center" }}>{renderproducts}</div>
      </div>
    );
  }
}
