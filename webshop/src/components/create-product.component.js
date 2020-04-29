import React, { Component } from "react";
import axios from "axios";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.state = {
      file: null,
    };
  }

  handleEvent = (event) => {
    console.log(event.target.files[0]);
    this.setState({ file: URL.createObjectURL(event.target.files[0]) });
  };
  handleFileUpload = () => {};

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleEvent} />
        <button onClick={this.handleFileUpload}>Upload</button>
        <img src={this.state.file} alt="koo" />
      </div>
    );
  }
}

export default CreateProduct;
