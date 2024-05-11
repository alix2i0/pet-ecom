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
  Table
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
    <div className="bg-teal-400 px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="p-3 bg-teal-400 sm:ml-64 overflow-hidden">
        <div className="bg-white p-3 shadow-md sm:rounded-lg">
          <div className="flex justify-between items-center p-2">
            <strong className="text-gray-700 font-medium text-center text-4xl flex items-center">
              PETS
            </strong>
            <input
              type="text"
              placeholder="Search pets..."
              value={search}
              onChange={handleSearch}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleAddPet} className="btn">
              <FontAwesomeIcon icon={faPlusSquare} /> Add Pet
            </button>
          </div>
          <div className="flex justify-between items-center p-1">
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

          <div className="overflow-x-auto mt-3">
            <Table className="w-full text-gray-700">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/5 md:w-auto">Pet Name</TableHead>
                  <TableHead className="w-1/5 md:w-auto">Age</TableHead>
                  <TableHead className="w-1/5 md:w-auto">
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
                    <TableCell className="w-1/5 md:w-auto flex gap-1 justify-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 font-bold"
                        onClick={() => handleEditPet(pet)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 font-bold"
                        onClick={() => handleDeletePet(pet._id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <nav aria-label="Pet pagination">
            <ul className="list-style-none flex justify-center p-4">
              <li>
                <button
                  onClick={() => handlePagination(currentPage - 1)}
                  className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 ${
                    currentPage === 1
                      ? "text-neutral-400 pointer-events-none"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages).keys()].map((page) => (
                <li key={page + 1}>
                  <button
                    onClick={() => handlePagination(page + 1)}
                    className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 ${
                      currentPage === page + 1
                        ? "bg-primary-100 text-primary-700"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePagination(currentPage + 1)}
                  className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 ${
                    currentPage === totalPages
                      ? "text-neutral-400 pointer-events-none"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
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
