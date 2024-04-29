import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const UserDetail = () => {
    const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }
  const isAdminToString = (isAdmin) => {
    return isAdmin ? "Yes" : "No";
  };
  return (
    <div>
      <div className="bg-teal-400 h-screen">
      <div className="p-3 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <h2 className="text-xl mb-5">User Details</h2>
          <div className="flex justify-between items-center mb-4">
            <table className="text-center w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3">
                First Name 
                </th>
                <td className="px-6 py-3">{user.firstName}</td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <td className="px-6 py-3">
                {user.lastName}
                </td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th scope="col" className="px-6 py-3 truncate">
                  Email
                </th>
                <td className="px-6 py-3">{user.email}</td>
              </tr>
              <tr className="text-md text-gray-700  bg-gray-100">
                <th>Username</th>
                <td className="px-6 py-3">{user.username}</td>
              </tr>              
              <tr className="text-md text-gray-700  bg-gray-100">
                <th>Is Admin</th>
                <td className="px-6 py-3">
                {isAdminToString(user.isAdmin)}
                </td>
              </tr>
            </table>
          </div>
          <div className="flex justify-end">
            
          <Link
            class="p-2.5 ms-2 text-center w-[70px] text-sm font-medium text-white bg-teal-400 rounded-lg border border-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none"
            to="/users"
          >
            Back
          </Link>
        </div>
          </div>
      </div>
    </div>
    </div>
  )
}

export default UserDetail
