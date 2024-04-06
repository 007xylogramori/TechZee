const express = require("express");
const {
  createClass,
  getClassofTeacher,
  getAllClass,
  deleteClass,
  toggleClass,
  getOneClass
} = require("./classControllers.js");
const verifyAccessToken = require("../user/userMiddleware");
const router = express.Router();

router.post("/class/create", verifyAccessToken, createClass);
router.get("/class/getClasses/teacher", verifyAccessToken, getClassofTeacher);
router.get("/class/getClasses/all", verifyAccessToken, getAllClass);
router.get("/class/getClass", verifyAccessToken, getOneClass);
router.delete("/class/delete", verifyAccessToken, deleteClass);
router.patch("/class/toggle", verifyAccessToken, toggleClass);

module.exports = router;
