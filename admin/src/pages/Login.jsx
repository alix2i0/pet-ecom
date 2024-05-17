import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/reducer/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.isError);

  if (error) {
    console.log(error);
  }

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    // navigate("/dashboard");
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-gray-100 flex items-center justify-center shadow-md ">
      <div
        className="max-w-screen-lg w-full h-screen my-5 grid md:grid-cols-2 md:gap-6 object-cover"
        style={{
          backgroundImage: "url('bgg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div></div>
        <div className="p-12 text-white ">
          <h2
            className="text-4xl font-bold mb-6 text-center"
            style={{ fontFamily: "Dynapuff" }}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
              <div className="relative z-0 w-full mb-3 ">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent
                   border-0 border-b-[1px] border-gray-400 appearance-none dark:text-white
                    dark:border-gray-400 dark:focus:border-secondary focus:outline-none 
                    focus:ring-0 focus:border-secondary peer"
                  placeholder=" "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label
                  htmlFor="username"
                  className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
              </div>
              <div className="relative z-0 w-full mb-3 ">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent
                   border-0 border-b-[1px] border-gray-400  dark:text-white
                    dark:border-gray-400 dark:focus:border-secondary focus:outline-none 
                    focus:ring-0 focus:border-secondary peer "
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-300 underline flex justify-end hover:text-primary"
              >
                Forgot password?
              </Link>
              <button
                type="submit"
                className="w-full  bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors"
              >
                Login
              </button>{" "}
            </div>
          </form>
          <div className="flex flex-col gap-2 mt-2">
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                OR
              </p>
            </div>

            <a
              className=" flex w-full text-black items-center justify-center gap-2 
              rounded-lg bg-primary px-7 pb-2.5 pt-3 text-center text-md"
              style={{ backgroundColor: "#fff" }}
              href="#!"
              role="button"
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              <span>
                <img src="google.png" alt="google" className="h-[25px]" />
              </span>
              Continue with Google
            </a>

            <div className="mt-3 text-sm text-center text-gray-300">
              No account yet?&nbsp;
              <Link to="/register" className="underline hover:text-primary">
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
