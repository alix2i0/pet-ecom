import React from 'react';
import Dashboard from './components/Dashboard';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';
import ProductList from './components/Product/ProductList';

function App() {
  return (
    <div>
      {/* <Dashboard/> */}
      <Routes>
        
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Login/>} />
        <Route path='/products' element={<ProductList/>} />
      </Routes>
    </div>
  );
}

export default App;
