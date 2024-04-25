import React from 'react';
import DashboardProducts from './components/DashboardProducts';
import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div>
      {/* <Dashboard/> */}
      <Routes>
        <Route path='/dashboard/products' element={<DashboardProducts/>}/>
        <Route path='/dashboard/products/addproduct' element={<AddProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
