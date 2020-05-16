import React, { Component } from "react";
//import axios from "axios";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProduct } from "../actions/authActions";
import classnames from "classnames";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/du8rximeo/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "dkxnewrs";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.state = {
      title: "",
      price: "",
      image: "",
      description: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeImage = (e) => {
    this.setState({ image: e.target.files[0] });
    console.log(e.target.files[0]);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(
      this.state.title,
      this.state.price,
      this.state.description,
      this.state.image
    );

    const formData = new FormData();
    formData.append("file", this.state.image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          const uploadedFileUrl = data.secure_url;

          const newProduct = {
            name: this.state.title,
            description: this.state.description,
            price: this.state.price,
            imageUrl: uploadedFileUrl,
          };

          this.props.createProduct(newProduct, this.props.history);
        }
      })
      .catch((err) => console.error(err));
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container w-50">
        <div style={{ marginTop: "4rem" }} className="row"></div>
        <h4>
          <b>Create</b> product
        </h4>
        <div className="form-row">
          <div className="input-field col s12">
            <input
              type="text"
              value={this.state.title}
              error={errors.name}
              id="title"
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.name,
              })}
            />
            <label htmlFor="title">Title</label>
            <span className="red-text">{errors.name}</span>
          </div>

          <div className="input-field col s12">
            <input
              type="number"
              error={errors.price}
              id="price"
              value={this.state.price}
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.price,
              })}
            />
            <label htmlFor="title">Price</label>
            <span className="red-text">{errors.price}</span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              error={errors.description}
              id="description"
              value={this.state.description}
              onChange={this.onChange}
              className={classnames("", {
                invalid: errors.description,
              })}
            />
            <label htmlFor="title">Description</label>
            <span className="red-text">{errors.description}</span>
          </div>
        </div>
        <form action="#">
          <div className="file-field input-field">
            <div
              className="btn"
              style={{
                letterSpacing: "1.5px",
                backgroundColor: "#26A69A",
                color: "#ffffff",
              }}
            >
              <span>File</span>
              <input type="file" onChange={this.onChangeImage} />
            </div>
            <div className="file-path-wrapper">
              <input
                className={classnames("file-path validate", {
                  invalid: errors.description,
                })}
                error={errors.imageUrl}
                type="text"
              />

              <span className="red-text">{errors.imageUrl}</span>
            </div>
          </div>
        </form>

        <button
          type="submit"
          className="btn btn-large waves-effect waves-light w-100"
          style={{
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
            backgroundColor: "#26A69A",
            color: "#ffffff",
          }}
          onClick={this.onSubmit}
        >
          Create
        </button>
      </div>
    );
  }
}

CreateProduct.propTypes = {
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { createProduct })(
  withRouter(CreateProduct)
);
