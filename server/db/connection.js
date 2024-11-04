const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
