import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response ========>", response.data);
      if (response.status === 200) {
        const admin = response.data.admin;
        localStorage.setItem("adminAuthenticated", JSON.stringify(admin));
        navigate("/");
      } else {
        // Handle authentication error
        console.error("Login failed: ", response.data.message);
      }
    } catch (error) {
      console.error("Error while logging in: ", error);
    }
  };
  const handleLogout = () => {
    const navigate = useNavigate();
    // Clear token from local storage
    localStorage.removeItem("adminAuthenticated");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-col justify-center items-center mb-8">
          <img
            src="public/Logo.png"
            alt="Pet Store Logo"
            className="h-12 mr-2 mb-6 "
          />
          <h1 className="text-3xl font-light">LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              required
              id="email"
              onChange={handleEmailChange}
              className="mt-1 px-4 py-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Your Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              required
              className="mt-1 px-4 py-2 w-full border rounded-md"
            />
            <a href="/forgetPassword" className="text-gray-500 text-sm">
              Forget password?
            </a>
          </div>
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="bg-amber-500 text-white font-semibold px-4 py-2 w-full rounded-md hover:bg-amber-600"
            >
              Login
            </button>
            {/* <button
              type="button"
              className="text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-900"
            >
              Sign in with Google
            </button> */}
          </div>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 font-medium">
              Sign up now
            </Link>
          </span>
        </div>
      </div>
      {/* <div className="mt-4 text-gray-600">
        <span>
          Dont have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign up now
          </Link>
        </span>
      </div> */}
    </div>
  );
};

export default Login;
