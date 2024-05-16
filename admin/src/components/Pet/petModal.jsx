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
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
          <div className="px-6 py-8">
            <div className="">
              <h3 className="text-2xl text-center font-bold text-gray-800 mb-4">
                {formData._id ? "Edit Pet" : "Add New Pet"}
              </h3>
              <form onSubmit={handleModalSubmit}>
                <div className="mb-4">
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
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
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
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
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
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                  </select>
                </div>
                <div className="mb-4">
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
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
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
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
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
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-3 text-gray-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value=""></option>
                    <option value="Dogs">Dogs</option>
                    <option value="Cats">Cats</option>
                  </select>
                </div>
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg focus:outline-none hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetModal;
