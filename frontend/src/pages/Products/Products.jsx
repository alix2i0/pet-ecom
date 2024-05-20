import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProduct,
  fetchProductById,
  setFilter,
  setSearch,
  setSort,
} from "../../../../admin/src/services/reducer/productSlice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { FaSearch } from "react-icons/fa";
import { ShoppingCartIcon } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Filter from "../../components/Filter"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Filters from "../../components/Filter";

const Products = () => {
  const {
    product,
    categories,
    loading,
    error,
    totalPages,
    search,
    filters,
    sort,
  } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(search);
  const [selectedFilters, setSelectedFilters] = useState(filters);
  console.log("selectedFilters", selectedFilters);
  const dispatch = useDispatch();

  const handleFilterChange = (filterKey, filterValue) => {
    const newFilters = { ...selectedFilters, [filterKey]: filterValue };
    console.log("newFilters", newFilters);
    setSelectedFilters(newFilters);
    dispatch(setFilter(newFilters));
    setCurrentPage(1);
  };


  useEffect(() => {
    dispatch(
      fetchProduct({
        page: currentPage,
        search: searchTerm,
        filters: {
          ...selectedFilters,
          category:
            selectedFilters.category &&
            typeof selectedFilters.category === "string"
              ? selectedFilters.category
              : selectedFilters.category
              ? selectedFilters.category[0]
              : "",
        },
        sort,
      })
    );
    dispatch(fetchCategories());
  }, [dispatch, currentPage, searchTerm, selectedFilters, sort]);

  
  const handleSortChange = (sortOption) => {
    dispatch(setSort(sortOption));
    setCurrentPage(1);
  };

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
    dispatch(setSearch(e.target.value));
    dispatch(fetchProduct({ page: 1, search: e.target.value }));
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearch(searchTerm));
    dispatch(fetchProduct({ page: 1, search: searchTerm }));
  };

  const handleProductClick = (productId) => {
    fetchProductById(productId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  console.log("categories : ", categories);
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
            className="flex items-center justify-end mb-6 gap-2"
          >
            <div className="flex">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="px-4 py-2 border hover:border-amber-500 rounded-l-md shadow-sm sm:text-sm flex-grow"
              />
              <div className="bg-amber-500 p-2 rounded-r-md flex items-center justify-center hover:bg-amber-600 cursor-pointer">
                <FaSearch className="text-white" />
              </div>
            </div>
            <div className="mx-2 px-4 md:px-6 py-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="shrink-0" variant="outline">
                    <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSortChange}
                  >
                    <DropdownMenuRadioItem value="featured">
                      Featured
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="newest">
                      Newest
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="priceLowHigh">
                      Price: Low to High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="priceHighLow">
                      Price: High to Low
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Filters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              setCurrentPage={setCurrentPage}
            />
          </form>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {product &&
              product.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleProductClick(item._id)}
                  className="relative  flex flex-col justify-between group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:scale-105 hover:shadow-lg dark:bg-gray-950 animate-fadeInUp"
                >
                  <Link className="absolute inset-0 z-10" to={`/${item._id}`}>
                    <span className="sr-only">View Product</span>
                  </Link>
                  <img
                    alt={item.name}
                    className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
                    src={item.image || "/placeholder.svg"}
                    style={{ aspectRatio: "400/300", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <div className="mt-4 flex flex-col items-center justify-between">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold">
                        ${item.price}
                      </span>
                      <Button size="sm" className="text-white bg-amber-600">
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

const ArrowUpDownIcon = (props) => (
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
    <path d="m21 16-4 4-4-4" />
    <path d="M17 20V4" />
    <path d="m3 8 4-4 4 4" />
    <path d="M7 4v16" />
  </svg>
);

const FilterIcon = (props) => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export default Products;
