import React from 'react';
import Dashboard from './components/Dashboard';
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Dashboard/> */}
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
