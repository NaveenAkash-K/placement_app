const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
// const checkAuth = require("./middleware/checkAuth");
const path = require("path");
const fs = require("fs");


app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use("/test", (req, res) => {
  res.json({ message: "Hello from server" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });



// app.use("/auth", authController);
