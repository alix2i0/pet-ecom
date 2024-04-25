import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/reducer/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
        navigate("/profile");
    };

    return (
        <div className="max-w-lg mx-auto my-16">
            <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">Login</h1>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring focus:ring-teal-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-teal-500"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring focus:ring-teal-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-teal-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
