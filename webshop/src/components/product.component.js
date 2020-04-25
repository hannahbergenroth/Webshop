import React, { Component } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = { name: "", description: "", price: 0 };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return <div>HEJ WORLDx h {this.state.name} </div>;
  }
}

export default Product;
