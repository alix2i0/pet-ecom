import "./App.css";
import React from "react";
import Component from "./components/component/component";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProductDetails } from "./components/component/product-details";
import { toast, ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./components/ForgotPassword";
import Contact from "./pages/Contact";
import PetsDetails from "./pages/Pets/PetsDetails";
import Pets from "./pages/Pets/Pets";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetsDetails />} />

      </Routes>
    </div>
  );
}

export default App;
