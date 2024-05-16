import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetCards from "./PetCards";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("-1"); // Default criteria

  const fetchPets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3300/api/pets?query=${searchQuery}&page=${currentPage}`
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
  }, [currentPage, searchQuery]);

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
        <div className="container px-4 md:px-6">
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

      <section className="w-full py-5 md:py-5 lg:py-5 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          {/* <div className="flex items-center justify-start mb-4">
            <input
              type="text"
              placeholder="Search by name, location, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            />
            <select
              value={searchCriteria}
              onChange={(e) => setSearchCriteria(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            >
              <option value="-1">Choose criteria</option>
              <option value="name">Name</option>
              <option value="age">Age</option>
              <option value="location">Location</option>
            </select>
            <button
              type="button"
              onClick={handleSearch}
              className="py-2 px-3 ml-2 inline-flex items-center gap-x-2 text-sm rounded-md border border-transparent bg-amber-600 text-white font-semibold hover:bg-amber-700 transition disabled:opacity-50 disabled:pointer-events-none"
            >
              Search
            </button>
          </div> */}

          <div class="mx-auto my-5">
            <div class="relative  flex w-full flex-col justify-center rounded-lg p-2 sm:flex-row sm:items-center sm:p-0">
              <div class="flex gap-4 items-center justify-center mb-5">
                <label
                  class="focus-within:ring flex items-center justify-center h-12 rounded-md bg-gray-200 px-2 ring-primary"
                  for="category"
                >
                  <select
                    class="bg-transparent px-6  outline-none cursor-pointer"
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

                <div>
                  <input
                    type="name"
                    name="search"
                    class="ml-1 h-12 w-full cursor-text rounded-md border py-4 pl-6 outline-none ring-primary sm:border-0 sm:pr-40 sm:pl-12 focus:ring"
                    placeholder="Search by name, location, etc."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div>
                  <button
                    type="button"
                    class="h-12 px-4 inline-flex w-full items-center justify-center rounded-md bg-primary text-center align-middle text-base font-medium normal-case text-white outline-none ring-primary ring-offset-1 focus:ring"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {pets.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {pets.map((pet, index) => (
                    <PetCards
                      key={index}
                      id={pet._id}
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

              <div className="flex justify-center mt-8">
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
      <Footer />
    </div>
  );
};

export default Pets;
