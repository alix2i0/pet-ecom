import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, setSearch } from "../../../admin/src/services/reducer/productSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Products = () => {
  const dispatch = useDispatch();
  const { product, loading, error, totalPages, search } = useSelector(
    (state) => state.product
  );
  const [currentPage, setCurrentPage] = useState(1);
   const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    dispatch(fetchProduct({ page: currentPage, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchTerm));
    dispatch(fetchProduct({ page: 1, search: searchTerm }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-50">
      <Navbar />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Pet Store Products
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Discover our wide range of high-quality pet products tailored to
              meet your furry friends&apos; needs.
            </p>
          </div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center justify-center mb-6 gap-2"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="px-4 py-2 border rounded-l-md shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            />
            <Button
              type="submit"
              className="rounded-r-md rounded-l-none bg-gray-800 hover:bg-amber-600"
            >
              Search
            </Button>
          </form>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {product &&
              product.map((item) => (
                <div
                  key={item._id}
                  className="relative group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:scale-105 hover:shadow-lg dark:bg-gray-950 animate-fadeInUp"
                >
                  <Link className="absolute inset-0 z-10" to="#">
                    <span className="sr-only">View Product</span>
                  </Link>
                  <img
                    alt={item.name}
                    className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
                    src={item.image || "/placeholder.svg"}
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold">
                        ${item.price}
                      </span>
                      <Button size="sm">
                        <ShoppingCartIcon className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex items-center justify-center mt-6">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

export default Products;
