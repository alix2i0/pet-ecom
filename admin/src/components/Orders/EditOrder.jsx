import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EditOrder = ({ orderId }) => {
  const { id } = useParams();

  const [editCustomer, setEditCustomer] = useState("");
  const [editProducts, setEditProducts] = useState("");
  const [editTotalAmount, setEditTotalAmount] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editDate, setEditDate] = useState("");

  const statuses = ["Pending", "Completed", "Rejected"];
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/orders/${id}`
        );
        const orderData = response.data;
        // Set state with blog order data
        setEditCustomer(orderData.customer);
        setEditProducts(orderData.products);
        setEditTotalAmount(orderData.totalAmount);
        setEditStatus(orderData.status);
        setEditDate(orderData.orderDate);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [orderId]);

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.put(
      `http://localhost:3300/orders/${id}`,
      {
        customer: editCustomer,
        products: editProducts,
        totalAmount: editTotalAmount,
        status: editStatus,
        orderDate: editDate
      }
    );

    console.log("Order updated successfully:", response.data);
            alert("Order edited successfully!")

    // Reset form fields after successful submission
    setEditCustomer("");
    setEditProducts("");
    setEditTotalAmount("");
    setEditStatus("");
    setEditDate("");
  } catch (error) {
    console.error("Error updating order:", error);
  }
};
  return (
    <div className="bg-teal-400 h-screen">
      <div className="p-3 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <h2 className="text-xl mb-5">Edit Order</h2>
          <div className="flex mb-4">
            <main className="flex-1">
              <div className="flex w-[50%] mx-auto bg-white shadow-md rounded-lg ">
                <div className="w-full px-6 py-8 md:px-8">
                  <br />
                  <form onSubmit={handleSubmit}>
                    <div class=" md:gap-6">
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="floating_first_name"
                          id="floating_first_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                          value={editCustomer}
                          onChange={(e) => setEditCustomer(e.target.value)}
                          required
                          placeholder=" "
                        />
                        <label
                          for="floating_first_name"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Customer
                        </label>
                      </div>
                      <div class="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="floating_last_name"
                          id="floating_last_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                          value={editProducts}
                          onChange={(e) => setEditProducts(e.target.value)}
                          required
                          placeholder=" "

                        />
                        <label
                          for="floating_last_name"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Products
                        </label>
                      </div>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                        value={editTotalAmount}
                        onChange={(e) => setEditTotalAmount(e.target.value)}
                        type="email"
                        name="floating_email"
                        disabled
                        placeholder=" "

                      />

                      <label
                        for="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Total
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                        name="status"
                        value={editStatus}
                        placeholder=" "

                                                onChange={(e) => setEditTotalAmount(e.target.value)}

                      />
                      <label
                        for="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Status
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="floating_password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-500 dark:border-gray-200 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        placeholder=" "

                        />
                      <label
                        // className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                        for="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Order Date
                      </label>
                    </div>
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="text-white bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full  px-10 py-2.5 text-center dark:bg-teal-400 dark:hover:bg-teal-500 dark:focus:ring-teal-500"
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
          </div>
          <div className="flex justify-end">
            <Link
              class="p-2.5 ms-2 text-center w-[70px] text-sm font-medium text-white bg-teal-400 rounded-lg border border-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none"
              to="/orders"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
