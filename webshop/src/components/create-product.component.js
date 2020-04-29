import React, { useState, useEffect } from "react";
import axios from "axios";
const url = "	https://api.cloudinary.com/v1_1/du8rximeo/image/upload";
const preset = "default";

export default function Example() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    try {
      setLoading(true);
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;
      const image = await axios.post("http://localhost:5000/images/upload", {
        imageUrl,
      });
      setLoading(false);
      setImage(image.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log(title, price, image);
  };

  return (
    <div className="container w-50 text-center">
      <h1 className="">Create Product</h1>
      <div className="form-row">
        <div className="form-group col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="form-group col-md-6" placeholder="Price">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
            onChange={handlePrice}
          />
        </div>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          rows="5"
          id="comment"
          placeholder="Description"
          value={description}
          onChange={handleDescription}
        ></textarea>
      </div>
      <div className="form-group">
        <div className="custom-file">
          <input
            type="file"
            name="image"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label">Choose image</label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={onSubmit}>
        Create
      </button>
    </div>
  );
}
