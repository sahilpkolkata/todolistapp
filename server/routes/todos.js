const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

function getTodos(res) {
    Todo.find(function (err, todos) {

        if (err) {
            res.send(err);
        }

        res.json(todos); 
    });
}

//Get Todos
router.get("/todos",function(req,res){
    getTodos(res);
});

//Create Todo
router.post("/todos",function(req,res){
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);
        res.json(todo);
    });
});

//Delete Todo
router.delete('/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);

        getTodos(res);
    });
});

//Edit Todo
router.put('/todos/:todo_id',function(req,res){
    const todo = req.body;
    let upTask = {};
    if(todo.text){
        upTask.text = todo.text;
    }

    if(!upTask){
        res.status(400);
        res.json({
            error: "Noting was Edited"
        });
    }
    else{
        Todo.update(
            {_id: req.params.todo_id},upTask,{},function(err,todo){
                if(err){
                    res.send(err);
                }
                res.json(todo);
            }
        );
    }
});

module.exports= router;