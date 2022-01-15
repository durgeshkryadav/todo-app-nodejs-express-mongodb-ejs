// this is for creating database
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchema = new schema({
    todoname: String,
    taskstatus: Boolean
});

const ToDo = mongoose.model("ToDo", todoSchema);
module.exports = ToDo;