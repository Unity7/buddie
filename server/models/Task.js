const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const taskSchema = new Schema(
    {
        taskText: {
            type: String,
            required: true,
            maxlength: 280
        },
        podID: {
            type: Schema.Types.ObjectId,
            ref: 'Pod'
        },
        username: {
            type: String
        },
        taskStatus: {
            type: Boolean,
            default: false
        },
        assignedID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    }
)

const Task = model('Task', taskSchema);

module.exports = Task;