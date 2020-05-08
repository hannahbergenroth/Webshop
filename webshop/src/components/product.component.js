import React, { Component } from "react";
//import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import axios from "axios";
import img from "./bild1.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

class Product extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { name: "", description: "", price: 0 };
  }

  handleClick = (e) => {
    console.log(e.name);
  };

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
    return (
      <React.Fragment>
        <h2>{this.state.name}</h2>
        <div className="row">
          <Carousel className="w-50">
            <div>
              <img src={img} />
            </div>
            <div>
              <img src={img} />
            </div>
            <div>
              <img src={img} />
            </div>
          </Carousel>
          <div className="w-50 p-3">
            <span>{this.state.description}</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
