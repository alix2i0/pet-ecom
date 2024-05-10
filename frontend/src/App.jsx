import React from 'react';
import Dashboard from './components/Dashboard';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './components/Product/ProductList';
import LandingPage from './components/Landing/LandingPage';


function App() {
  return (
    <div>
      {/* <Dashboard/> */}
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path='/' element={<LandingPage/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
