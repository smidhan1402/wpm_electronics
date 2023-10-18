const mongoose = require('mongoose');

// Define the schema
const televisionSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true // Assuming you require an image URL for each drug
      },
      name: {
        type: String,
        required: true,
        trim: true // Removes leading and trailing whitespace
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true,
        min: 0 // Ensures that the price is non-negative
      }
    });
    
    // Create a model based on the schema
    mongoose.model('television', televisionSchema);
        