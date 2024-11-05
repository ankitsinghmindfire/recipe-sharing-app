const express = require("express");
const cors = require("cors");
const config = require("./db/connection");
const dotenv = require("dotenv");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", registerRoute);
app.use("/auth", loginRoute);
dotenv.config();

// start the Express server
if (config) {
  app.listen(PORT, () => {
    console.log(`SERVER STARTED ${process.env.PORT}`);
  });
}
