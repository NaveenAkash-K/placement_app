const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authController = require("./controller/auth/authController");
const courseController = require("./controller/course/courseController");
const questionController = require('./controller/question/questionController');
const adminController = require('./controller/admin/adminController');
const checkAuth = require("./middleware/checkAuth");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const path = require("path");


app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use("/test", (req, res) => {
  res.json({ message: "Hello from server" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

  app.use("/auth",authController);
  app.use("/course",checkAuth,courseController);
  app.use("/quiz",questionController);
  app.use("/admin",adminController);