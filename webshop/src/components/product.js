import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "../actions/cartActions";
import classnames from "classnames";

class Product extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      product: this.props.product,
    };
  }

  onClick = (e) => {
    const newProduct = {};
    //console.log("TJA", this.state.product);
    this.props.addToCart(this.state.product);
  };

  render() {
    const { product } = this.props;
    return (
      <div
        className="card"
        style={{
          //height: "429px",
          height: "529px",
          width: "276px",
          display: "inline-block",
          padding: "3px",
        }}
      >
        <img
          src={product.imageUrl}
          style={{ height: "368px" }}
          className="card-img-top"
          alt="..."
        />
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            Card Title<i class="material-icons right">more_vert</i>
          </span>
          <p>
            <a href="#">This is a link</a>
          </p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            Card Title<i class="material-icons right">close</i>
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
          <p className="" style={{ color: "#777777", textAlign: "left" }}>
            EUR {product.price}
          </p>
          {this.state.inCart ? (
            <a
              //onClick={}
              className="btn btn-sm btn-primary"
            >
              Added to cart
            </a>
          ) : (
            <a
              href="#"
              onClick={this.onClick}
              className="btn btn-sm btn-primary"
            >
              Add to cart
            </a>
          )}
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
  }
}

const mapStateToProps = (state) => ({
  products: state.product,
});

export default connect(mapStateToProps, { addToCart })(withRouter(Product));
