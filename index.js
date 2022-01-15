const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const todo = require("./model/ToDo");
mongoose.connect('mongodb://127.0.0.1:27017/todo');
const app = express();

// access any folder help of express
app.use(express.static("public"));
app.use(bodyparser());

// using ejs
app.set('views', './views');
app.set('view engine', 'ejs');



// @api     "/""
// @desc    Display data from database to webpage(Display)
app.get("/", async (req, res) => {
    //code to fetch data
    var data = await todo.find();
    res.render("home", { data });
})


// @api     "/todo/add"
// @desc    add todo into database(Create)
app.post("/todo/add", async (req, res) => {
    console.log("I am in add task");
    console.log(req.body);
    await todo.create({
        todoname: req.body.name,
        taskstatus: false

    });

    res.redirect('/');
})


// @api     "/todo/:id/complete"
// @desc    Display as mark from database(Update)
app.get('/todo/:id/complete', async (req, res) => {
    // console.log(req.params);
    await todo.updateOne({ _id: req.params.id }, { taskstatus: true })
    res.redirect("/");
});



// @api     "/todo/:id/delete"
// @desc    delete item from database(delete)
app.get('/todo/:id/delete', async (req, res) => {
    // console.log(req.params);
    await todo.deleteOne({ _id: req.params.id })
    res.redirect("/");
});




app.listen(5000, () => console.log("Server is listening at 5000"));