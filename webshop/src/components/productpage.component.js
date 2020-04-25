import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = (props) => (
  <tr>
    <td>{props.product.name}</td>
    <td>{props.product.description}</td>
    <td>{props.product.price}</td>
    <td>
      <Link to={"/product/" + props.product._id}>Open</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteProduct(props.product._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ShowProduct extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = { products: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/")
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

  exerciseList() {
    return this.state.products.map((currentproduct) => {
      return (
        <Product
          product={currentproduct}
          deleteProduct={this.deleteProduct}
          key={currentproduct._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Products</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
