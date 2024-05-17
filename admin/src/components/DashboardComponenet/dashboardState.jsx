import React, { useEffect } from 'react'
import { IoBagHandle, IoPeople, IoCart } from 'react-icons/io5'
import { FaProductHunt } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { GetOrders } from '@/services/reducer/orderSlice';

export default function DashboardStatsGrid({customer , CountProducts, orders, sales }) {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.orders.isLoading);

    useEffect(() => {
        dispatch(GetOrders());
    }, [dispatch]);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

	return (
		<div className="flex gap-4 mt-3 w-full">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Sales</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{sales}</strong>
						
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<FaProductHunt className="text-2xl text-white" />
					
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Products</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{CountProducts}</strong>
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
						<strong className="text-xl text-gray-700 font-semibold">{customer}</strong>
						
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
						<strong className="text-xl text-gray-700 font-semibold">{orders}</strong>
						
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}