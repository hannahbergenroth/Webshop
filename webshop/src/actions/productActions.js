import axios from "axios";

import { FETCH_PRODUCT } from "./types";

/*export const fetchProduct = () => (dispatch) => {
  axios
    .get("http://localhost:5000/products/")
    .then(({ response }) => {
      // this.setState({ products: response.data });
      dispatch(setProducts(response));
    })
    .catch((error) => {
      console.log(error);
    });
};*/

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

function setProducts(data) {
  return {
    type: FETCH_PRODUCT,
    payload: data,
  };
}
