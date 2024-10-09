// src/database/config.js

import mongoose from 'mongoose';

const MONGODBATLAS = 'mongodb+srv://Phani2612:2612@cluster0.nxfzz84.mongodb.net/Nextjsdatabase?retryWrites=true&w=majority&appName=Cluster0';  // Load MongoDB URI from environment variables

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(MONGODBATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Any other mongoose options you want to pass
    });

    console.log("Connected to MongoDB Atlas");

    const db = mongoose.connection;

    // Handle errors after initial connection
    db.on("error", (error) => {
      console.error("Database connection error:", error);
    });

    db.once("open", () => {
      console.log("Connected to database successfully");
    });

  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

// Export the connectDB function for use in the app
export default connectDB;
