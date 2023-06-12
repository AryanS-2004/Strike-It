const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        trim: true,
        required: true,
    }
}, {
    timestamps: true,
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;