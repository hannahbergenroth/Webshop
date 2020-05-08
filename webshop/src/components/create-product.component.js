import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/du8rximeo/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "dkxnewrs";

export default function Example() {
  const [test, settest] = useState("Choose image");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  // const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setImage(e.target.files[0]);
    settest(e.target.files[0].name);
    console.log("fffff");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
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
            name: title,
            description: description,
            price: price,
            imageUrl: uploadedFileUrl,
          };
          axios
            .post("http://localhost:5000/products/add", newProduct)
            .then((res) => console.log(res.data));

          window.location.href = "http://localhost:3000/create";
        }
      })
      .catch((err) => console.error(err));
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

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
            className="form-control"
            required
            value={title}
            onChange={handleTitle}
          />
          <label htmlFor="title">Title</label>
          <span className="red-text"></span>
        </div>

        <div className="input-field col s12">
          <input
            type="number"
            className="form-control"
            required
            value={price}
            onChange={handlePrice}
          />
          <label htmlFor="title">Price</label>
          <span className="red-text"></span>
        </div>
      </div>
      <div class="row">
        <div className="input-field col s12">
          <textarea
            className="materialize-textarea"
            data-length="120"
            rows="5"
            id="comment"
            required
            value={description}
            onChange={handleDescription}
          ></textarea>

          <label for="textarea2">Description</label>
        </div>
      </div>
      <form action="#">
        <div class="file-field input-field" style={{}}>
          <div
            class="btn"
            style={{
              //lineHeight: "2",
              // borderRadius: "3px",
              letterSpacing: "1.5px",

              backgroundColor: "#26A69A",
              color: "#ffffff",
            }}
          >
            <span>File</span>
            <input type="file" onChange={onChange} />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
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
        onClick={onSubmit}
      >
        Create
      </button>
    </div>
  );
}
