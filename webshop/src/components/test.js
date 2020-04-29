import React, { useState, useEffect } from "react";
import axios from "axios";
const url = "	https://api.cloudinary.com/v1_1/du8rximeo/image/upload";
const preset = "default";

export default function Example() {
  // Declare a new state variable, which we'll call "count"
  const [image, setImage] = useState("");
  const onChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    try {
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;
      const image = axios.post("http://localhost:5000/images/upload", {
        imageUrl,
      });

      setImage(image.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onHandle = (e) => {
    console.log(e.target.files[0].name);
  };

  return (
    <div className="container w-50 text-center">
      <h1 className="">Create Product</h1>
      <form>
        <div class="form-group">
          <input
            type="number"
            min="1"
            max="1000"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Price"
          ></input>
          <textarea
            class="form-control"
            rows="5"
            id="comment"
            placeholder="Description"
          ></textarea>
          <div className="custom-file">
            <input
              type="file"
              name="image"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" for="customFile">
              Choose image
            </label>
          </div>
          <button type="submit" class="btn btn-primary" onClick={onSubmit}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
