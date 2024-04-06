const express = require("express");
const classSchema = require("./classSchema.js");

const createClass = async (req, res) => {
  const { name } = req.body;

  let classExists = await classSchema.find({
    userId: req.user._id,
    name: name,
  });
  console.log(classExists.length);
  if (classExists.length != 0) {
    res.status(400).json({
      status: false,
      message: "Class Already Exists",
    });
    return;
  }

  const newClass = new classSchema({
    name: req.body.name,
    userId: req.user._id,
    description: req.body.description,
    classCode: req.body.classCode,
  });

  newClass
    .save()
    .then((classCreated) => {
      res.status(201).json({
        status: true,
        message: "class Added for user: " + req.user.name,
        data: classCreated,
      });
    })
    .catch((e) => {
      res.status(422).json({
        status: false,
        message: "error creating class",
      });
    });
};

const deleteClass = async (req, res) => {
  const id = req.query.classId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      status: false,
      message: "Invalid classId",
    });
  }

  await classSchema
    .deleteOne({ _id: id })
    .then((classs) => {
      res.status(201).json({
        status: true,
        message: "class deleted",
        data: classs,
      });
    })
    .catch((e) => {
      res.status(422).json({
        status: false,
        message: "error deleting class",
      });
    });
};

const toggleClass = async (req, res) => {
  const id = req.query.classId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json({
      status: false,
      message: "Invalid classId",
    });
  }

  await classSchema
    .findOneAndUpdate(
      { _id: id },
      { $set: { isActive: req.query.isActive == "false" ? false : true } },
      { new: true }
    )
    .then((classs) => {
      res.status(200).json({
        status: true,
        message: "Updated Active status",
        data: classs,
      });
    })
    .catch((e) => {
      res.status(422).json({
        status: false,
        message: "error toggling active status",
      });
    });
};

const getClassofTeacher = async (req, res) => {
  const response = await classSchema
    .find({ userId: req.user._id })
    .populate({ path: "userId", select: ["name", "email"] })
    .then((classs) => {
      res.status(201).json({
        status: true,
        message: "success",
        data: classs,
      });
    })
    .catch((e) => {
      res.status(422).json({
        status: false,
        message: "error getting classes for teacher",
      });
    });
};

const getAllClass = async (req, res) => {
  const response = await classSchema
    .find({})
    .populate({ path: "userId", select: ["name", "email"] })
    .then((classs) => {
      res.status(201).json({
        status: true,
        message: "success",
        data: classs,
      });
    })
    .catch((e) => {
      res.status(422).json({
        status: false,
        message: "error getting classes for teacher",
      });
    });
};

module.exports = {
  createClass,
  getClassofTeacher,
  getAllClass,
  deleteClass,
  toggleClass,
};
