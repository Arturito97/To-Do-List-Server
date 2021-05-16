const express = require("express");
const router = express.Router();
const Task = require("../models/task-model");
const User = require('../models/user-model');
const fileUpload = require('../configs/cloudinary');

//Get all Tasks
router.get("/tasks", async (req, res) => {
  try {
    
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
    
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

//Create Task
router.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json("missing fields");
    return;
  }

  try {
    const response = await Task.create({
      title
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

//Delete Task
router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.status(200).json(`Task with id ${req.params.id} deleted.`)
  } catch(e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

//get by Id
router.get('/tasks/:id', async (req,res ) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch(e) {
    res.status(500).json(`error occurred ${e}`);
  }
})


//Update Task
router.put('/tasks/:id', async (req, res) => {
  try{
  const {title} = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title})
  res.status(200).json(`Task with id ${req.params.id} was updated.`);
  } catch(e) {
    res.status(500).json(`error occurred ${e}`);
  }
});

router.post('/upload', fileUpload.single('image'), (req, res) => {
  try{
  res.status(200).json({fileUrl: req.file.path});
  } catch(e) {
    res.status(500).json(`error occurred ${e}`);
  }
});


module.exports = router;
