import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../../actions/cartActions";

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.item.quantity,
      btnVisible: false,
    };
  }

  handleChange = (e) => {
    if (this.state.quantity != e.target.value) {
      this.setState({
        quantity: e.target.value,
        btnVisible: true,
      });
    }

    

    this.props.updateCartQuantity(
      this.props.item.product._id,
      this.state.quantity
    );

    this.setState({
      btnVisible: false,
    });

    
  };

  handleSubmit = (e) => {
    e.preventDefault();


  };

  handleRemove = (e) => {
    this.props.removeFromCart(this.props.item.product._id);
  };

  render() {
    const { item } = this.props;

    return (
      <div className="row" style= {{display: 'flex', alignItems: 'center'}}>

        <div className="col-xs-2" style= {{marginRight: 5}}>
          <img className="img-responsive" src={item.product.imageUrl} style={{ maxWidth:180 }} />
        </div>
        <div className="col-xs-4">
          <h5 className="product-name">
            {item.product.name}
          </h5>
        </div>
        <div className="col-xs-6">
          <div className="col-xs-3 text-right">
            <h6>
             
            <span className="text-muted">€</span> {item.product.price} 
             
            </h6>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="col-xs-4">
              <input
                type="number"
                className="form-control input-sm"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
            </div>

           
          </form>
        </div>

        <button className="float-right"
                type="button"
                onClick={this.handleRemove}
                className="btn btn-info"
                
              >
                 Delete
              </button>
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
