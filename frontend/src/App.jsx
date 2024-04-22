import React, { useState } from "react";
// import Header from "./components/Headers.jsx";
import "./index.css";
// import LoginForm from "./components/LoginForm.jsx";
import SignUpForm from "./components/pages/api/auth/SignUpForm.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {
  // const navLinks = [
  //   { url: "/", label: "Home" },
  //   { url: "#", label: "About" },
  //   { url: "#", label: "Services" },
  //   { url: "#", label: "Pricing" },
  //   { url: "#", label: "Contact" },
  // ];
 
  return (
    <>
      {/* <Header title="logo" links={navLinks} /> */}
     
      <BrowserRouter>
      
        <Routes>
          {/* <Route path="/" element={<MainContent posts={posts} />} /> */}
          {/* <Route path="/login" element={<LoginForm />} /> */}
          <Route path="/signup" element= {<SignUpForm />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
