import { FETCH_PRODUCT } from "../actions/types";

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}
