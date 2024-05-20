import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addPet,
  addPetToList,
  deletePet,
  fetchPets,
  updatePet,
} from "../../services/reducer/petSlice";
import PetModal from "./petModal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "../ui/table";

const PetComponent = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets.value);
  const totalPages = useSelector((state) => state.pets.totalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [totalPages, setTotalPages] = useState();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    age: "",
    availability: false,
    location: "",
    categoryName: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    sortBy: "name", // Default sort by pet name
    sortDir: "asc", // Default sort direction (ascending)
  });

  useEffect(() => {
    dispatch(fetchPets({ currentPage, limit, search }));
  }, [currentPage, limit, search, dispatch]);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(setCurrentPage);
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const getFilteredAndSortedPets = () => {
    return pets
      .filter((pet) => {
        return pet.name.toLowerCase().includes(search.toLowerCase());
      })
      .sort((a, b) => {
        if (filterOptions.sortBy === "name") {
          return filterOptions.sortDir === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (filterOptions.sortBy === "age") {
          return filterOptions.sortDir === "asc"
            ? a.age - b.age
            : b.age - a.age;
        }
        return 0;
      });
  };

  const handleAddPet = () => {
    setModalData({
      name: "",
      age: "",
      availability: false,
      location: "",
      categoryName: "",
    });
    setShowModal(true);
  };

  const handleEditPet = (pet) => {
    setModalData(pet);
    setShowModal(true);
  };

  const handleDeletePet = (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      dispatch(deletePet(petId));
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = (formData) => {
    if (formData.id) {
      dispatch(updatePet(formData));
    } else {
      dispatch(addPet(formData)).then((result) => {
        if (addPet.fulfilled.match(result)) {
          dispatch(addPetToList(result.payload));
        }
      });
    }
    setShowModal(false);
  };

  return (
    <div className="bg-primary">
      <div className="p-3 bg-primary sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <h3 className="text-xl">All Pets</h3>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-8">
              <div className="flex justify-end items-center gap-8">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-secondary dark:text-primary"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search pets..."
                      value={search}
                      onChange={handleSearch}
                      className="text-sm bg-opacity-0 block ps-10 p-2.5 bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddPet}
                  className="btn p-2 hover:bg-secondary rounded-lg bg-primary text-white"
                >
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Pet
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <select
                name="sortBy"
                className="text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                value={filterOptions.sortBy}
                onChange={handleSortChange}
              >
                <option value="name" className="bg-white">
                  Sort by Name
                </option>
                <option value="age" className="bg-white">
                  Sort by Age
                </option>
              </select>
              <select
                name="sortDir"
                className="text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                value={filterOptions.sortDir}
                onChange={handleSortChange}
              >
                <option value="asc" className="bg-white">
                  Ascending
                </option>
                <option value="desc" className="bg-white">
                  Descending
                </option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/5 md:w-auto col">
                      Pet Name
                    </TableHead>
                    <TableHead className="w-1/5 md:w-auto col">Age</TableHead>
                    <TableHead className="w-1/5 md:w-auto col">
                      Availability
                    </TableHead>
                    <TableHead className="w-1/5 md:w-auto">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredAndSortedPets().map((pet) => (
                    <TableRow key={pet._id}>
                      <TableCell className="w-1/5 md:w-auto text-center">
                        {pet.name}
                      </TableCell>
                      <TableCell className="w-1/5 md:w-auto text-center">
                        {pet.age}
                      </TableCell>
                      <TableCell className="w-1/5 md:w-auto text-center">
                        <span
                          className={
                            pet.availability ? "text-green-500" : "text-red-500"
                          }
                        >
                          {pet.availability ? "Available" : "Not Available"}
                        </span>
                      </TableCell>
                      <TableCell className="w-1/5 md:w-auto flex gap-2 justify-center">
                        <button
                          className="text-blue-500 hover:text-blue-700 font-bold"
                          onClick={() => handleEditPet(pet)}
                        >
                          <img src="edit.png" alt="edit" className="h-[20px]" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 font-bold"
                          onClick={() => handleDeletePet(pet._id)}
                        >
                          <img
                            src="delete.png"
                            alt="delete"
                            className="h-[20px]"
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <nav aria-label="Pet pagination">
              <ul className="flex items-center justify-center gap-4">
                <li>
                  <button
                    onClick={() => handlePagination(currentPage - 1)}
                    className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                      currentPage === 1
                        ? "text-gray-900  pointer-events-none"
                        : "text-gray-600 hover:bg-neutral-100"
                    }`}
                    disabled={currentPage === 1}
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
                </li>
                <div className="flex items-center gap-2">
                  {[...Array(totalPages).keys()].map((page) => (
                    <li key={page + 1}>
                      <button
                        onClick={() => handlePagination(page + 1)}
                        className={`relative block px-3 py-1.5 text-sm transition-all duration-300 ${
                          currentPage === page + 1
                            ? "bg-primary hover:bg-secondary text-white"
                            : "text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}
                </div>
                <li>
                  <button
                    onClick={() => handlePagination(currentPage + 1)}
                    className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"

                    disabled={currentPage === totalPages}
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
                </li>
              </ul>
            </nav>
          </div>
          {showModal && (
            <PetModal
              petData={modalData}
              handleClose={handleModalClose}
              handleSubmit={handleModalSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PetComponent;
