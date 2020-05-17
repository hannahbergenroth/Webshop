import { FETCH_PRODUCT } from "../actions/types";

const initialState = {
  products: [
    {
      id: 1,
      title: "Apple iPhone 8 Plus Gold 256GB 4G",
      description:
        "Meld style and practicality with the Apple iPhone 8 Plus smartphone",
      price: "649.54",
      image: "https://i.ebayimg.com/images/g/2tQAAOSwnhldR6hD/s-l640.jpg",
      amount: 5,
    },
    {
      id: 2,
      title: 'Apple MacBook Pro Core i5 2.5GHz 13"',
      description:
        "This MacBook Pro has been professionally restored to working order by an approved vendor",
      price: "339.97",
      image: "https://i.ebayimg.com/images/g/AbEAAOSw2FJc3cCF/s-l1600.jpg",
      amount: 3,
    },
    {
      id: 3,
      title: "Canon EOS M50 Mirrorless Camera Body",
      description:
        "2160p UHD Video Recording, Built-in Flash, Body only, Auto Focus, AE/FE Lock, Tripod Thread",
      price: "450.00",
      image: "https://i.ebayimg.com/images/g/PV8AAOSwX4FdRIac/s-l1600.jpg",
      amount: 4,
    },
    {
      id: 4,
      title: 'VIZIO D-Series D24F-F1 24" Full HD Smart TV ',
      description:
        'VIZIO D-Series D24F-F1 24" Full HD LED Smart TV. Condition is Manufacturer refurbished',
      price: "104.99",
      image: "https://i.ebayimg.com/images/g/Pr0AAOSwd9ZdMgTG/s-l1600.jpg",
      amount: 2,
    },
  ],
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
