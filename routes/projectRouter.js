const express = require("express");
const projectModel = require("../model/projectModel");
const router = express.Router();
const auth = require("../auth.js");

//Creating a new Project (Create)
router.post("/create", auth, async (req, res) => {
  try {
    const newProject = new projectModel(req.body);
    await newProject.save();
    res.send({ message: "Successfully Registered the Project" });
  } catch (err) {
    res.send({ message: err });
  }
});

//Reading all the Projects
router.get("/readAll/", auth, async (req, res) => {
  try {
    const Info = await projectModel.find();
    res.send(Info);
  } catch (err) {
    res.send({ message: err });
  }
});

//Reading the Project by ID

router.get("/read/:id", auth, async (req, res) => {
  try {
    const data = await projectModel.findOne({ id: req.params.id });
    if (!data) {
      res.send({ message: "No Project Found" });
      return;
    }
    res.send(data);
  } catch (err) {
    res.send({ message: err });
  }
});

//Update Information in Project
router.put("/update/:id", auth, async (req, res) => {
  try {
    const newData = await projectModel.findOneAndUpdate(
      { id: req.params.id },
      req.body
    );
    res.send(newData);
  } catch (err) {
    res.send({ message: err });
  }
});

//Deleting a Project by ID
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const deleteData = await projectModel.findOneAndDelete({
      id: req.params.id,
    });
    if (!deleteData) {
      res.send({ message: "Project does not exists" });
      return;
    }
    res.send({ message: "Deleted Successfully" });
  } catch (err) {
    res.send({ message: err });
  }
});
module.exports = router;
