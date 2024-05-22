import React, { useEffect, useState } from "react";
import axios from "axios";
import PetCards from "./PetCards";
import Navbar from "../../components/Navbar";

import Footer from "../../components/Footer";
import { FaSearch } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@headlessui/react";
const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("-1"); // Default criteria
  const [sortCriteria, setSortCriteria] = useState("name"); // Default sorting criteria

  const fetchPets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3300/api/pets?query=${searchQuery}&page=${currentPage}&sort=${sortCriteria}`
      );
      const { pets, totalPages } = response.data;
      setPets(pets);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handleSearch = async () => {
    try {
      setCurrentPage(1); // Reset to first page when performing a new search
      const response = await axios.post(
        `http://localhost:3300/api/pets/search`,
        {
          query: searchQuery,
          criteria: searchCriteria,
        }
      );

      const { pets } = response.data;
      setPets(pets);
      setLoading(false);
    } catch (error) {
      console.error("Error searching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [currentPage, searchQuery, sortCriteria]);

  useEffect(() => {
    fetchPets();
  }, [searchQuery]);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Navbar />
      <section className="w-full pt-32 md:pt-32 pb-10">
        <div className="">
          <div className="text-center space-y-4">
            <h1 className="text-2xl tracking-wide font-primary font-bold sm:text-3xl">
              Find Your Furry Friend
            </h1>
            <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
              Browse our selection of adorable pets waiting to be adopted into
              their forever homes.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full py-5 md:py-5 lg:py-5 bg-gray-100 dark:bg-gray-800">
        <div className="relative  flex w-full flex-col justify-center rounded-lg p-2 sm:flex-row sm:items-center sm:p-0">
          <div className="flex gap-4 items-center justify-center mb-5">
            <label
              className="focus-within:ring flex items-center justify-center h-10 rounded-md bg-gray-200 ring-primary"
              htmlFor="category"
            >
              <select
                className="bg-transparent px-6  outline-none cursor-pointer"
                name="category"
                id="category"
                value={searchCriteria}
                onChange={(e) => setSearchCriteria(e.target.value)}
              >
                <option value="-1">Choose criteria</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="location">Location</option>
              </select>
            </label>

            <div className="flex">
              <input
                type="name"
                name="search"
                className="px-4 py-2 border border-primary ring-primary rounded-l-md shadow-sm sm:text-sm flex-grow"
                placeholder="Search by name, location, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="bg-amber-500 p-2 rounded-r-md flex items-center justify-center hover:bg-amber-600 cursor-pointer">
                <FaSearch className="text-white" onClick={handleSearch} />
              </div>
            </div>

            {/* Sorting */}
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center bg-gray-200 p-2 rounded-md" variant="outline">
                    <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[200px] z-50 bg-white p-1">
                  <DropdownMenuRadioGroup
                    value={sortCriteria}
                    onValueChange={(value) => {
                      setSortCriteria(value);
                      setCurrentPage(1); // Reset to first page when sorting changes
                    }}
                  >
                    <DropdownMenuRadioItem value="name" className="cursor-pointer hover:bg-gray-100 p-2">
                      Name A-Z
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="nameDesc" className="cursor-pointer hover:bg-gray-100 p-2">
                      Name Z-A
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="updatedAt" className="cursor-pointer hover:bg-gray-100 p-2">
                      Recently Added
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="updatedAtDesc"  className="cursor-pointer hover:bg-gray-100 p-2">
                      Oldest Added
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="age"  className="cursor-pointer hover:bg-gray-100 p-2">
                      Age: Low to High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="ageDesc"  className="cursor-pointer hover:bg-gray-100 p-2">
                      Age: High to Low
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-1 bg-gray-200">
          <div className="w-64 p-4 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Available</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Not Available</span>
              </label>
            </div>

            {/* filter by age */}
            <div className="mb-4">
              <button className="w-full text-left font-semibold">Age</button>
              <div className="mt-2">
                <input type="range" min="0" max="500" className="w-full" />
                <div className="flex justify-between text-sm">
                  <span>0</span>
                  <span>20</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <button className="w-full text-left font-semibold">
                Category
              </button>
              <div className="mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">category data</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <button className="w-full text-left font-semibold">
                Location
              </button>
              <div className="mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">location data</span>
                </label>
              </div>
            </div>

            <button className="w-full py-2 bg-primary hover:bg-secondary text-white font-bold">
              Clear Filters
            </button>
          </div>
        </div>

        <section className="md:col-span-4 my-4">
          <div className="container px-4 md:px-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {pets.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {pets.map((pet, index) => (
                      <PetCards
                        key={index}
                        id={pet._id}
                        image={pet.image}
                        name={pet.name}
                        age={pet.age}
                        location={pet.location}
                        description={pet.description}
                        availability={pet.availability}
                        category={pet.CategoryName}
                        date={pet.updatedAt}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">No pets found.</div>
                )}

                <div className="flex justify-center my-8">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                      currentPage === 1
                        ? "text-gray-900  pointer-events-none"
                        : "text-gray-600 hover:bg-neutral-200"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      ></path>
                    </svg>
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`mx-2 px-4 py-2 rounded ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                      currentPage === totalPages
                        ? "text-gray-900  pointer-events-none"
                        : "text-gray-600 hover:bg-neutral-200"
                    }`}
                  >
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Pets;
