const express = require('express');
const auth = require("../middlewares/authMiddlewares");
const {createTask, deleteTask, editTask, allTask} = require("../controllers/taskControllers");
const router = express.Router();

router.route('/').post(auth, createTask);
router.route('/delete').put(auth, deleteTask);
router.route('/allTask').get(auth, allTask);
router.route('/edit').put(auth, editTask);


module.exports = router;