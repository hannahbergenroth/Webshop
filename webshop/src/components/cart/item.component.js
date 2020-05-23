import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../../actions/cartActions";

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.item.quantity,
    };
  }

  handleChange = (e) => {
    if (e.target.value < 0) {
      return;
    }

    this.setState({
      quantity: e.target.value,
    });

    this.props.updateCartQuantity(this.props.item.product._id, e.target.value);
  };

  handleRemove = (e) => {
    this.props.removeFromCart(this.props.item.product._id);
  };

  render() {
    const { item } = this.props;

    return (
      <div
        className="row"
        style={{ alignItems: "center", position: "relative" }}
      >
        <div className="col s12 m6 l3" style={{}}>
          <img
            className="img-responsive"
            src={item.product.imageUrl}
            alt={""}
            style={{ maxWidth: 180 }}
          />
        </div>
        <div className="col s12 m6 l3" style={{}}>
          <h5 className="product-name">{item.product.name}</h5>
        </div>
        <div style={{ textAlign: "center" }}>€ {item.product.price}</div>
        <div className="col s12 m6 l3" style={{}}>
          <input
            id="test"
            type="number"
            className="form-control input-sm"
            onChange={this.handleChange}
            value={this.state.quantity}
            style={{ width: "20%", float: "right", textAlign: "center" }}
          />
        </div>
        <div className="col s12 m6 l3" style={{}}>
          <button
            type="button"
            onClick={this.handleRemove}
            className="btn btn-info"
            style={{ width: "100%" }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCartQuantity: (productId, quantity) =>
      dispatch(updateCartQuantity(productId, quantity)),
    removeFromCart: (productId) => dispatch(removeFromCart(productId)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
