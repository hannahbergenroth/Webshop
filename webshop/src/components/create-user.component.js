import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.state = {
      username: "",
      file: null,
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeImage = (e) => {
    this.setState({ file: URL.createObjectURL(e.target.files[0]) });
  };

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      file: this.state.file,
    };
    console.log(newUser);

    axios
      .post("http://localhost:5000/users/add", newUser)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
      file: null,
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="file" onChange={this.onChangeImage} />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
