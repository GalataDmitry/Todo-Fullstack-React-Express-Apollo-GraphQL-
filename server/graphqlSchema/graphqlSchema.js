const graphql = require('graphql')
const Todo = require('../mongooseSchema/mongooseSchema')

const {GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList} = graphql

const todoType = new GraphQLObjectType({
    name: 'todoType',
    fields: {
        id: {type: GraphQLID},
        todo: {type: GraphQLString},
        done: {type: GraphQLBoolean}
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getAllTodos: {
            type: new GraphQLList(todoType),
            resolve: () => {
                try {
                    return Todo.find({}).sort({createdAt: -1})
                } catch (error) {
                    console.log(error)
                }
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createTodo: {
            type: todoType,
            args: {newTodo: {type: GraphQLString}},
            resolve: (_, args) => {
                const {newTodo} = args
                try {
                    return Todo.create({todo: newTodo}).then(todo => todo)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        doneTodo: {
            type: todoType,
            args: {
                todoId: {type: GraphQLID},
                isDone: {type: GraphQLBoolean}
            },
            resolve: (_, args) => {
                const {todoId, isDone} = args
                try {
                    console.log('wwweee')

                    if (!isDone)
                        return Todo.findByIdAndUpdate(todoId, {done: true}).then(id => id)
                    else
                        return Todo.findByIdAndUpdate(todoId, {done: false}).then(id => id)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        deleteTodo: {
            type: todoType,
            args: {todoId: {type: GraphQLID}},
            resolve: (_, args) => {
                const {todoId} = args
                try {
                    return Todo.findByIdAndDelete(todoId).then(todo => todo)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    })
})

module.exports = graphqlSchema = new GraphQLSchema({query: Query, mutation: Mutation})

// const graphqlSchema = buildSchema(`
//
// type Todo {
//   id: ID
//   todo: String
//   done: Boolean
// }
//
// input TodoInput {
//   todo: String
// }
//
// input TodoId {
//   id: ID
// }
//
// type Query {
//   getAllTodos: [Todo]
// }
//
// type Mutation {
//   createTodo(newTodo: TodoInput): Todo
//   doneTodo(todoId: TodoId): Todo
//   deleteTodo(todoId: TodoId): Todo
// }
//
// `)
//
// module.exports = graphqlSchema