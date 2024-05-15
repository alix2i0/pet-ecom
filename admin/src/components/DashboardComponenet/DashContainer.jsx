import React, { useEffect, useState } from "react";
import { FaHandHoldingDollar, FaProductHunt, FaUser } from "react-icons/fa6";
import DashboardStatsGrid from "./dashboardState";
import TransactionChart from './AnalysChart'
import PopularProducts from "./PopulateProducts";
import Table from "./RecentOrder";
import { useDispatch, useSelector } from "react-redux";
import { orderSlice, GetOrders, ordersAnalys } from "@/services/reducer/orderSlice";
import OrderChart from "./OrderChart";
import { GetAllUsers } from "@/services/reducer/userSlice";
import { CountProducts, selectCountProduct } from "@/services/reducer/productSlice";
import axios from "axios";

const Dashboard = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const users = useSelector((state) => state.user.Users);
    const Analys = useSelector((state) => state.orders.ordersAnalys);
    const [countOrder, setCountOrder] = useState(0)
    const countProduct = useSelector(selectCountProduct);
    useEffect(() => {
        const countOrders = async () => {
            try {
                const response = await axios.get("http://localhost:3300/api/orders/", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
                );
                console.log(response.data.orderCount);
                setCountOrder(response.data.orderCount);
            } catch (error) {
                console.error("Error fetching orders:", error);
                throw error;
            }
        }
        dispatch(GetOrders());
        dispatch(ordersAnalys())
        dispatch(GetAllUsers())
        dispatch(CountProducts())
        countOrders();
    }, [dispatch]);
    // Data processing to categorize orders
    const Customer = users.reduce((acc, user) => user.isAdmin == false ? acc += 1 : acc += 0, 0);
    const sales = orders.reduce((acc, ord) => ord.status == "Completed" ? acc += 1 : acc += 0, 0);
    const { Completed, Pending, Rejected, Stock_Not_Available } = categorizeOrders(orders);
    return (
        <div className="dashboard-container flex flex-col gap-4 ml-64 px-10 py-2 mr-5 h-full bg-gray-100">
            < DashboardStatsGrid customer={Customer} CountProducts={countProduct} orders={countOrder} sales={sales} />

            <div className="grid gap-4 grid-cols-3">
                <div className="col-span-1">
                    <OrderChart
                        Rejected={Rejected}
                        Pending={Pending}
                        Stock_Not_Available={Stock_Not_Available}
                        Completed={Completed}
                    />
                </div>
                <div className="col-span-2">
                    <TransactionChart data={Analys} />
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
    let Completed = 0;
    let Pending = 0;
    let Rejected = 0;
    let Stock_Not_Available = 0;

    orders.forEach(order => {
        switch (order.status) {
            case "Completed":
                Completed++;
                break;
            case "Pending":
                Pending++;
                break;
            case "Rejected":
                Rejected++;
                break;
            case "Stock Not Available":
                Stock_Not_Available++;
                break;
            default:
                break;
        }
    });

    return { Completed, Pending, Rejected, Stock_Not_Available };
};

export default Dashboard;
