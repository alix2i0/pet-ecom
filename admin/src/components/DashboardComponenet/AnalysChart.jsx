import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TransactionChart = ({ data }) => {
  return (
    <div className="bg-white py-2 rounded-md border border-gray-200 shadow-sm w-full h-[22rem]">
      <strong className="text-gray-700 font-medium px-4">Transaction Charts</strong>
      <div className=" border-gray-200 rounded-sm mt-3">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Orders_In_Month" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  );
};

export default TransactionChart;
