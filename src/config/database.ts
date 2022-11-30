const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URI;

export function connect () {
  // Connecting to the database
  console.log("Initializing database conncetion...");
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};