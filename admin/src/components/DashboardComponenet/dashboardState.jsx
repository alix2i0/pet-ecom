import React, { useEffect } from 'react'
import { IoBagHandle, IoPeople, IoCart } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { GetOrders } from '@/services/reducer/orderSlice';

export default function DashboardStatsGrid() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const isLoading = useSelector(state => state.orders.isLoading);

    useEffect(() => {
        dispatch(GetOrders());
    }, [dispatch]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const totalSales = orders.reduce((acc, order) => order.status === "delivered" ? acc + 1 : acc, 0);
    const Orders = orders.length;
	



	return (
		<div className="flex gap-4 mt-3 w-full">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Sales</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalSales}</strong>
						<span className="text-sm text-green-500 pl-2">+1</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					{/* <HiCube className="text-2xl text-white" /> */}
					T
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Products</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">12</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Customers</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">13</strong>
						
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Orders</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">14</strong>
						
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}