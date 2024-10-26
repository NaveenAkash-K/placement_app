const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authController = require("./controller/auth/authController");
const courseController = require("./controller/course/courseController");
const questionController = require('./controller/question/questionController');
const adminController = require('./controller/admin/adminController');
const Session = require("./model/sessionModel");
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
    res.json({message: "Hello from server"});
});

async function checkSessionExpiry() {
  const now = new Date();
  console.log("Expired session cleanup function called");
  try {
    const expiredSessions = await Session.updateMany(
      { expiryTime: { $lt: now }, isExpired: false },
      { $set: { isExpired: true } }
    );

    console.log(`Updated expired sessions: ${expiredSessions.modifiedCount}`);
  } catch (error) {
    console.error("Error updating expired sessions:", error);
  }
}
// TODO: move the time to env
setInterval(checkSessionExpiry,  0.5 * 60 * 1000);

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

app.use("/auth", authController);
app.use("/course", courseController);
app.use("/quiz", questionController);
app.use("/admin", adminController);
app.post("/checkAuth", checkAuth, (req, res) => {
    res.json({Authentication: "Success"});
});