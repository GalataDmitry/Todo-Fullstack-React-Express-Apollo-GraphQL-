const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
        todo: {type: String},
        done: {type: Boolean, default: false}
    }, {timestamps: true}
)

module.exports = mongoose.model('Todo', todoSchema)