import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './components/Product/ProductList';
import { Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <Dashboard/> */}
      <Routes>
        
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Login/>} />
        <Route path='/products' element={<ProductList/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
