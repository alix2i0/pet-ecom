import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./components/Product/ProductList";

import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import UserList from "./components/User/UserList";

function App() {
  const [count, setCount] = useState(0);

  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/";
  return (
    <div>
      {!isLoginPage && <Sidebar />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
