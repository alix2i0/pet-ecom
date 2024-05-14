import React, { useEffect } from "react";
import { FaHandHoldingDollar, FaProductHunt, FaUser } from "react-icons/fa6";
import DashboardStatsGrid from "./dashboardState";
import TransactionChart from './AnalysChart'
import PopularProducts from "./PopulateProducts";
import Table from "./RecentOrder";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "@/services/reducer/orderSlice";
import OrderChart from "./OrderChart";

const Dashboard = () => {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);

    useEffect(() => {
        dispatch(GetOrders());
    }, [dispatch]);
    // Data processing to categorize orders
    const { delivered, pending, confirmed, shipped } = categorizeOrders(orders);

    return (
        <div className="dashboard-container flex flex-col gap-4 ml-64 px-10 py-2 mr-5 h-full bg-gray-100">
            < DashboardStatsGrid />

            <div className="grid gap-4 grid-cols-3">
                <div className="col-span-1">
                    <OrderChart
                        delivered={delivered}
                        pending={pending}
                        shipped={shipped}
                        confirmed={confirmed}
                    />
                </div>
                <div className="col-span-2">
                    <TransactionChart />
                </div>
            </div>

            <div className="grid gap-4 grid-cols-3">
                <div className="col-span-2">
                    <Table />
                </div>
                <div className="col-span-1">
                    <PopularProducts />
                </div>
            </div>
        </div>
    );
};

// Function to categorize orders based on their status
const categorizeOrders = (orders) => {
    let delivered = 0;
    let pending = 0;
    let confirmed = 0;
    let shipped = 0;

    orders.forEach(order => {
        switch (order.status) {
            case "delivered":
                delivered++;
                break;
            case "pending":
                pending++;
                break;
            case "confirmed":
                confirmed++;
                break;
            case "shipped":
                shipped++;
                break;
            default:
                break;
        }
    });

    return { delivered, pending, confirmed, shipped };
};

export default Dashboard;
