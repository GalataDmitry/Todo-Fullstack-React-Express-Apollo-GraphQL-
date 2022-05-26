const Todo = require('../mongooseSchema/mongooseSchema')

//resolver
const root = {
    getAllTodos: () => {
        try {
            return Todo.find({}).sort({createdAt: -1})
        } catch (error) {
            console.log(error)
        }
    },
    createTodo: ({newTodo}) => {
        const {todo} = newTodo
        try {
            return Todo.create({todo})
        } catch (error) {
            console.log(error)
        }
    },
    doneTodo: ({todoId}) => {
        const {id} = todoId
        try {
            return Todo.findByIdAndUpdate(id, {done: true})
        } catch (error) {
            console.log(error)
        }
    },
    deleteTodo: ({todoId}) => {
        const {id} = todoId
        try {
            return Todo.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = root