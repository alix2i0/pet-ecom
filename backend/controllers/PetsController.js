const { validationResult } = require("express-validator");
const Pet = require("../models/Pet.js");
const ProductCategory = require("../models/PetCategory.js");

const getPets = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 12,
      category,
      availability,
      location,
      sort,
    } = req.query;

    // Convert page and limit to numbers, provide default values if not specified
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const filter = {};
    if (category) filter.CategoryName = { $regex: new RegExp(category, "i") }; // Case insensitive;
    if (availability !== undefined)
      filter.availability = availability === "true";
    if (location) filter.location = { $regex: new RegExp(location, "i") };

    // Sort configuration
    let sortOptions = {};
    switch (sort) {
      case "age":
        sortOptions.age = 1;
        break;
      case "ageDesc":
        sortOptions.age = -1;
        break;
      case "updatedAt":
        sortOptions.updatedAt = 1;
        break;
      case "updatedAtDesc":
        sortOptions.updatedAt = -1;
        break;
      case "nameDesc":
        sortOptions.name = -1;
        break;
      default:
        sortOptions.name = 1; // Default sorting by name
        break;
    }

    const pets = await Pet.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    // Optionally, return the total count of pets for pagination purposes
    const totalCount = await Pet.countDocuments(filter);

    res.status(200).json({
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      limit,
      totalCount,
      pets,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the pets.",
      error,
    });
  }
};

// Handle file upload
// const uploadImage = (req, res, next) => {
// if (!req.file) {
//   return res.status(400).json({ message: "Please upload an image" });
// }
// Assuming the file is stored in 'uploads' directory
// req.body.image = req.file.path;
//   next();
// };
const createPet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      image,
      name,
      age,
      gender,
      isVaccinated,
      location,
      description,
      availability,
      CategoryName,
      userId
    } = req.body;

    // Fetch the category by name
    const category = await ProductCategory.findOne({ name: CategoryName });
    console.log("category :", category);
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const newPet = new Pet({
      image,
      name,
      age,
      gender,
      isVaccinated,
      location,
      description,
      availability,
      CategoryName: category.name,
      userId
    });

    console.log(newPet);
    await newPet.save();

    res.status(201).json({ data: newPet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPet = async (req, res) => {
  try {
    const petId = req.params.petId;
    console.log(petId);
    const pet = await Pet.findOne({ _id: petId });
    console.log(pet);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCustomerPets = async (req,res) => {
  const {id} = req.params ;
  try {
    const resault = await Pet.find({userId : id});
    if (!resault) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json(resault);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

const updatePet = async (req, res) => {
  try {
    const petId = req.params.petId;
    console.log("id: ", petId);
    const newData = req.body;
    console.log("id New Data: ", newData);

    const pet = await Pet.findOne({ _id: petId });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    Object.assign(pet, newData);
    await pet.save();
    res.status(200).json({ data: newData });
  } catch (error) {
    console.log("Cons Error : ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePet = async (req, res) => {
  try {
    const petId = req.params.petId;
    const pet = await Pet.findByIdAndDelete({ _id: petId });
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchPets = async (req, res) => {
  const { query, criteria } = req.body;
  try {
    let searchQuery = {};
    if (criteria === "name") {
      searchQuery = { name: { $regex: new RegExp(query, "i") } };
    } else if (criteria === "age") {
      searchQuery = { age: parseInt(query) };
    } else if (criteria === "location") {
      searchQuery = { location: { $regex: new RegExp(query, "i") } };
    }
    const pets = await Pet.find(searchQuery);
    res.status(200).json({ pets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching pets", error: error.message });
  }
};

module.exports = {
  createPet,
  // uploadImage,
  getPet,
  updatePet,
  deletePet,
  getPets,
  searchPets,
  getCustomerPets
};
