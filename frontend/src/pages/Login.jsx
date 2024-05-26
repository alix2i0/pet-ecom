import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  googleLogin,
} from "../../../admin/src/services/reducer/authSlice"; // Import googleLogin action

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.isError);

  if (error) {
    console.log(error);
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleLogin());
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to landing page
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-col justify-center items-center mb-8">
          <h1 className="text-3xl font-light">LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              required
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 px-4 py-2 w-full border rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-4 py-2 w-full border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-amber-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-amber-600 w-full"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 bg-white text-gray-900 border-gray-900 border px-4 py-2 rounded-md hover:bg-gray-50 w-full"
        >
          <div className="flex items-center justify-center gap-4">
            <img src="../../public/google.svg" className="w-8 h-8" />
            Sign in with Google
          </div>
        </button>
        <div className="mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
