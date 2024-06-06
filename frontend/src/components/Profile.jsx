import { BsEmojiFrown } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Z2Mc23hD4Sy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import profileImage from '../assets/Profile.jpg';
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import { format } from "date-fns";
import { fetchUser } from "../../../admin/src/services/reducer/authSlice"
import { useEffect, useState } from "react"
import { GetOrders } from '../../../admin/src/services/reducer/orderSlice';
import Navbar from "./Navbar";
import axios from "axios";

export default function ProfilePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.auth)
    const orders = useSelector((state) => state.orders.orders);
    const [pets, setPets] = useState([])

    const getPets = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:3300/api/pets/customers/${id}`
            );
            const data = response.data;
            console.log("response", data);
            setPets(data);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    }
    useEffect(() => {
        dispatch(fetchUser())
        dispatch(GetOrders())
    }, [])
    useEffect(() => {
        if (user) {
            getPets(user._id)
        }
    }, [user])
    console.log(user);
    const customerOrders = orders.filter(order => order.customer._id == user._id)
    console.log("order filter", customerOrders);
    console.log("pets", pets)
    return (
        <>
            <Navbar user={user} />
            <div className="container py-20 md:px-6">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                            <Avatar className="h-16 w-16">
                                <AvatarImage alt="@shadcn" src={profileImage} />
                                <AvatarFallback>JP</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-amber-400">{user?.username}</h2>
                                <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                                <p className="text-slate-600 dark:text-amber-400">{user?.isAdmin ? "Admin" : "Customer"}</p>
                            </div>
                        </div>
                        <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                            <h3 className="text-lg font-semibold">Sales</h3>
                            <div className="space-y-4">
                                {customerOrders.length > 0
                                    ? customerOrders.map(order => (
                                        <div key={order._id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <FaShoppingCart size={25} className="rounded-md text-amber-400" />
                                                <div>
                                                    <h4 className="font-medium">{order.products[0].product.name}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">${order.totalAmount}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(order.orderDate), "dd MMM yyyy")}</p>
                                        </div>
                                    ))
                                    : <div className="flex items-center justify-center">
                                        <div className="flex items-center gap-2">
                                            <BsEmojiFrown size={30} />
                                            <div>
                                                <h4 className="font-medium">No Salles</h4>
                                            </div>
                                        </div>

                                    </div>
                                }


                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                            <h3 className="text-lg font-semibold">Pets</h3>
                            <div className="grid grid-cols-2 gap-4" >
                            {pets.length > 0
                                ? pets.map(pet => (
                                        <div className="flex flex-col items-center gap-2 key={pet._id}">
                                            <img
                                                alt="Pet Image"
                                                className="rounded-full"
                                                height={100}
                                                src={pet.image}
                                                style={{
                                                    aspectRatio: "100/100",
                                                    objectFit: "cover",
                                                }}
                                                width={100}
                                            />
                                            <div className="text-center">
                                                <h4 className="font-medium">{pet.name}</h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{pet.CategoryName}</p>
                                            </div>
                                    </div>
                                ))
                                : <div>Not found</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


