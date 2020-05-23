import axios from "axios";
import { FETCH_PRODUCT, GET_ERRORS } from "./types";

export const fetchProduct = () => (dispatch) => {
  fetch("http://localhost:5000/products/")
    .then((res) => res.json())
    .then((posts) =>
      dispatch({
        type: FETCH_PRODUCT,
        payload: posts,
      })
    );
};

// Register Product
export const createProduct = (newProduct, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/products/add", newProduct)
    .then((res) => history.push("/producten")) // re-direct to products on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
