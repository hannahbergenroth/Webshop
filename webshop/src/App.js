import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import Navbar from "./components/navbar.component";

import Product from "./components/productpage";
import CreateProduct from "./components/create-product.component";
import Home from "./components/homepage";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Cart from "./components/cart/shoppingcart.component";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <Route exact path="/" component={Home} />
        <PrivateRoute path="/create" component={CreateProduct} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        
        <PrivateRoute path="/my-cart" component={Cart} />
        
        <Route path="/products" component={Product} />
      </Router>
    </Provider>
  );
}

export default App;