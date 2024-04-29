import React from "react";
import ProductList from "./Product/ProductList";
import UserList from "./User/UserList";
import Orders from "./Orders/Orders";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 sm:ml-64">
        <div className="bg-white p-4 shadow-md sm:rounded-lg mb-4">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <div className="text-xl font-bold">100</div>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <div className="text-xl font-bold">50</div>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
            <div className="text-xl font-bold">200</div>
          </div>
        </div>          
          <ProductList />
        <div className="bg-white p-4 shadow-md rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-2">User List</h3>
          <UserList />
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg mt-4">
          <h3 className="text-lg font-semibold mb-2">Order List</h3>
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
