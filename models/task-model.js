const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  order: Number,
  completed: Boolean
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;