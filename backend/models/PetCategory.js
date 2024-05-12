const mongoose = require("mongoose");

const petCategorySchema = new mongoose.Schema({
    
    name: { type: String, required: true ,  unique: true},
    description: {type: String}

    
}, { timestamps: true });

const PetCategory = mongoose.model('PetCategory', petCategorySchema);

module.exports = PetCategory;
