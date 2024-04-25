import React from 'react';
import Dashboard from './components/Dashboard';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';

function App() {
  return (
    <div>
      {/* <Dashboard/> */}
      <Routes>
        
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
