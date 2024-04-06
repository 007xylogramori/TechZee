const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const dotenv = require("dotenv");
const userRoutes = require("./app/user/userRoutes.js");
const classRoutes = require("./app/classes/classRoutes.js");
const mongoose=require('mongoose')
const mongoConnect = require("./db.js");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, async () => {
  console.log("BACKEND RUNNING ON :", process.env.PORT);
  mongoConnect();
});

app.get("/", (req, res) => {
  res.send("Working");
});

app.use(userRoutes);
app.use(classRoutes);


