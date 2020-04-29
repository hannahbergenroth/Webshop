import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import ShowProduct from "./components/productpage.component";
import Product from "./components/product.component";
import CreateProduct from "./components/create-product.component";

//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
//import loadingGif from './spinner.gif';
const url = "https://api.cloudinary.com/v1_1/du8rximeo/image/upload";
const preset = "ml_default";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <div className="mx-sm-5">
          <br />
          <Route path="/create" component={CreateProduct} />
          <Route path="/products" component={ShowProduct} />
          <Route path="/user" component={CreateUser} />
          <Route path="/product/:id" component={Product} />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
