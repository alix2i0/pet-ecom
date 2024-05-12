import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("username,email,password : ", username, email, password);
      const res = await fetch("http://localhost:3000/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      console.log("Response : ", res);

      if (res.ok) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        const errorData = await res.json();
        toast.error("Registration failed: " + errorData.message);
      }
    } catch (error) {
      console.error("Error : ", error);
      toast.error(
        "An error occurred while registering. Please try again later."
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch h-screen bg-gray-100">
      <div className="lg:flex-1 hidden lg:block">
        <img
          src="public/RegisterImg.jpg"
          alt="Registration Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="lg:flex-1 flex items-center justify-center">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
          <div className="flex flex-col justify-center items-center mb-8">
            <img
              src="public/Logo.png"
              alt="Pet Store Logo"
              className="h-12 mr-2 mb-6 "
            />
            <h1 className="text-3xl font-light">REGISTER</h1>
          </div>
          <form action="POST" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="petStoreName"
                className="block text-sm text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="petStoreName"
                onChange={handleUsernameChange}
                className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                onChange={handleEmailChange}
                className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="your_email@example.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-gray-700">
                Your Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handlePasswordChange}
                className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-gray-600">
            <span>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </span>
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            By registering, you agree to our{" "}
            <Link to="/terms" className="text-blue-500">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-500">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
