const asyncHandler = require('express-async-handler');
const Task = require("../models/taskModel");


const createTask = asyncHandler(async(req, res) => {
    const {task} = req.body;
    if(!task){
        res.status(400);
        throw new Error('The task is not defined')
    }
    try{
        const newTask = await Task.create({
            task : task,
            user: req.user._id,
            status: "incomplete"
        })
        const findTask = await Task.findOne({_id: newTask._id}).populate('user', '-password');
        res.status(200).send(findTask);
    }catch(err){
        res.status(500).send(err.message);
    }
});

const deleteTask = asyncHandler(async(req, res) => {
    const {taskId} = req.body;
    try{
        const task = await Task.findByIdAndDelete(taskId);
        res.status(200).send({ message: 'Task deleted successfully' });
    }catch(err){
        res.status(500).send(err.message);
    }
});

const allTask = asyncHandler(async(req, res) => {
    try{
        Task.find({
            user: {$eq: req.user._id}
        }).populate("user", '-password')
            .sort({updatedAt: -1})
            .then((results)=>{
                res.status(200).send(results);
            })
    }catch(err){
        res.status(500).send(err.message);
    }
});

const editTask = asyncHandler(async(req, res) => {
    const {changedTask, taskId, status} = req.body;
    try{
        const task = await Task.findByIdAndUpdate(taskId, {
            task: changedTask,
            status: status
        }, {
            new: true,
        }).populate("user","-password");
        res.status(200).send(task);
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = {createTask, deleteTask, editTask, allTask};
