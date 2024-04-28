import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

// import image from "../../public/";
export default function Register({ onSignUp }) {
    const navigate = useNavigate();

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3300/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    username: `${firstname}${lastname}`,
                    email,
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }
            else {
                navigate("/login", { replace: true });
            }
            // Call onSignUp callback or handle success as needed
            onSignUp();
        } catch (error) {
            setError("Signup failed. try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 xl:pt-[5.5rem]">
            <div className="flex max-w-lg mx-auto my-16 overflow-hidden bg-white rounded-lg lg:space-x-8 dark:bg-slate-700 lg:max-w-5xl">
                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">register</h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        {/* <div className="relative z-0 w-full mb-5 group">
                            <input
                                id="floating-name"
                                className="block py-2.5"
                                type="text"
                                // className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name</label>
                        </div> */}
                        <div class="grid md:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-5 group">
                                <input 
                                type="text" 
                                name="floating_first_name" 
                                id="floating_first_name" 
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer" placeholder=" " required />
                                <label for="floating_first_name" 
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >First name</label>
                            </div>
                            <div class="relative z-0 w-full mb-5 group">
                                <input 
                                type="text" 
                                name="floating_last_name" 
                                id="floating_last_name" 
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer" placeholder=" " required />
                                <label for="floating_last_name" 
                                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >Last name</label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5 group" >
                            
                            <input
                                id="floating_email" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer" placeholder=" " required
                                type="email"
                                name="floating_email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            
                            <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="floating_password" 
                                id="floating_password" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer" placeholder=" " required
                                // className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="password"
                                name="repeat_password" 
                                id="floating_repeat_password" 
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer" 
                                placeholder=" " required 
                                // className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {error && <p className="text-danger">{error}</p>}
                            <label 
                                // className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                                for="floating_repeat_password" 
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >Confirm Password</label>
                        </div>
                        <div className="mt-8">
                            <button type="submit" className="text-white bg-teal-300 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full  px-10 py-2.5 text-center dark:bg-teal-300 dark:hover:bg-teal-700 dark:focus:ring-teal-800" disabled={loading}>
                                {loading ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                    <div class="flex items-center justify-between mt-4"><span
                    class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span> <a href="/login"
                    class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">Do you have an
                    account?</a> <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span></div>
                </div>
                <div className="items-center hidden lg:flex lg:w-1/2">
                    
                    
                </div>

            </div>
        </main>
    );
}