const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define schema for Pet
const petSchema = new mongoose.Schema(
  {
    // image: { type: String },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String },
    availability: { type: Boolean, required: true },
    CategoryName: {
      type: String,
      ref: "PetCategory",
      required: true,
    },
  },
  { timestamps: true }
);

// Create a Pet model
const Pet = mongoose.model("Pet", petSchema);

// Export the Pet model
module.exports = Pet;
