import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addPet, updatePet } from "../../services/reducer/petSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PetModal = ({ petData, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState(petData);
  const dispatch = useDispatch();

  // Update formData when petData changes
  useEffect(() => {
    setFormData(petData);
  }, [petData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("Form data", formData);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (formData._id) {
      dispatch(updatePet(formData)).then((result) => {
        console.log("result ", result);
        if (updatePet.fulfilled.match(result)) {
          handleClose();
          toast.success("Pet updated successfully");
        }
      });
    } else {
      dispatch(addPet(formData)).then((result) => {
        if (addPet.fulfilled.match(result)) {
          handleClose();
          toast.success("Pet added successfully");
        }
      });
    }
  };
  // Add image upload handling
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setModalData({ ...modalData, profileImage: file });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
      <div className="max-w-sm bg-white shadow-md rounded-lg p-2 h-[90%] overflow-y-auto">
        <div className="px-6 py-5">
          <div className="">
            <h3 className="text-2xl text-center font-bold text-gray-800 mb-4">
              {formData._id ? "Edit Pet" : "Add New Pet"}
            </h3>
            <form onSubmit={handleModalSubmit} className="flex flex-col gap-5 ">
              <div className="">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                />
              </div>
              <div className="">
                <label
                  htmlFor="age"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Age:
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  step="any"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                />
              </div>
              <div className="">
                <label
                  htmlFor="availability"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Availability:
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="block px-0 w-full text-sm bg-transparent border-0 border-b-[1px] border-gray-300 dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>
              <div className="">
                <label
                  htmlFor="location"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                />
              </div>
              <div className="">
                <label
                  htmlFor="location"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                />
              </div>
              <div className="">
                <label
                  htmlFor="CategoryName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Category:
                </label>
                <select
                  id="CategoryName"
                  name="CategoryName"
                  value={formData.CategoryName}
                  onChange={handleChange}
                  className="block px-0 w-full text-sm  bg-transparent border-0 border-b-[1px] border-gray-300 dark:text-gray-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                >
                  <option value=""></option>
                  <option value="Dogs">Dogs</option>
                  <option value="Cats">Cats</option>
                </select>
              </div>
              <div className="">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-none border bg-gray-200 text-gray-700 rounded-lg focus:outline-none hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="block p-1 w-24 text-white bg-primary hover:bg-secondary border border-transparent rounded-lg shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetModal;
