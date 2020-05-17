import React from "react";
import "./App.css";
//nnimport "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import Navbar from "./components/navbar.component";

import ShowProduct from "./components/productpage.component";
import Product from "./components/product.component";
import CreateProduct from "./components/create-product.component";
import Home from "./components/homepage";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Cart from "./components/cart/shoppingcart.component";
import Prod from "./components/productlisttest";

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
        <Route exact path="/products" component={ShowProduct} />

        <Route path="/products/:id" component={Product} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/my-cart" component={Cart} />
          <Route path="/producten" component={Prod} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
