import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../../../admin/src/services/reducer/productSlice"; // Adjust the import path as necessary

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {product.slice(10, 13).map((product) => (
          <div
            key={product._id}
            className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-transform duration-500 ease-in-out hover:scale-110"
          >
            <div className="group">
              <a className="relative block overflow-hidden rounded-xl" href="#">
                <img
                  className="object-cover w-full h-60 transition-opacity duration-500 ease-in-out group-hover:opacity-75"
                  src={`http://localhost:3000/uploads/${product.image}`}
                  alt="product image"
                />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  39% OFF {/* Consider making this dynamic if discounts vary */}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-in-out">
                  <div className="flex flex-col justify-end h-full p-4">
                    <p className="text-white text-sm">
                      {product.description}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {product.name}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    {product.price}
                  </span>
                  <span className="text-sm text-slate-900 line-through">
                    {product.price}
                  </span>
                </p>
                <div className="flex items-center">
                  {[...Array(product.rating)].map((_, index) => (
                    <svg
                      key={index}
                      aria-hidden="true"
                      className="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                    {product.rating}
                  </span>
                </div>
              </div>
              <a
                href="#"
                className="flex items-center justify-center rounded-md bg-amber-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-950 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to cart
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
