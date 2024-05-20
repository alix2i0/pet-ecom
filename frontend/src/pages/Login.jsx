import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../admin/src/services/reducer/authSlice";
import { useDispatch, useSelector } from "react-redux";

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
    // navigate("/dashboard");
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <div className="flex flex-col justify-center items-center mb-8">
          <a href="/">
            <img
              src="public/Logo.png"
              alt="Pet Store Logo"
              className="h-12 mr-2 mb-6 "
            />
          </a>
          <h1 className="text-3xl font-light">LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              username
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
              password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 px-4 py-2 w-full border rounded-md"
              placeholder="Enter your password"
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
            <Link to="/register" className="text-amber-600 font-medium">
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
