
import React, { useEffect } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus2 } from "../../lib/helpers";
import { useDispatch, useSelector } from "react-redux";
import { RecentOrders } from "@/services/reducer/orderSlice";


export default function Table() {
    const dispatch = useDispatch();
    const LastOrders = useSelector(state => state.orders.recentorders);
    useEffect(() => {
        dispatch(RecentOrders());
    }, [dispatch]); 
    console.log("Recent Orders : ",LastOrders);
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 w-full ">
      <strong className="text-gray-700 font-medium">Recent Orders</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead className="bg-neutral-100">
            <tr>
              <th className="font-semibold py-3 px-2.5 text-sm text-left border-y">Customer Name</th>
              <th className="font-semibold py-3 px-2.5 text-sm text-left border-y">Order Date</th>
              <th className="font-semibold py-3 px-2.5 text-sm text-left border-y">Order Total</th>
              <th className="font-semibold py-3 px-2.5 text-sm text-left border-y">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {LastOrders.map((order) => (
              <tr key={order.customer.firstName}>
                <td className="py-3 px-2.5 text-sm text-left border-y border-gray-200">
                    {order.customer.firstName}
                </td>
                <td className="py-3 px-2.5 text-sm text-left border-y border-gray-200">{format(new Date(order.orderDate), "dd MMM yyyy")}</td>
                <td className="py-3 px-2.5 text-sm text-left border-y border-gray-200">{order.totalAmount.toFixed(2)}</td>
                <td className="py-3 px-2.5 text-sm text-left border-y border-gray-200">{getOrderStatus2(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

