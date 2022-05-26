import {gql} from "@apollo/client"

export const CREATE_TODO = gql(`
    mutation createTodo($newTodo: String) {
        createTodo(newTodo: $newTodo) {
            id, todo, done
        }
    }
`)

export const DONE_TODO = gql(`
    mutation doneTodo($todoId: ID, $isDone: Boolean) {
        doneTodo(todoId: $todoId, isDone: $isDone) {
            id, todo, done
        }
    }
`)

export const DELETE_TODO = gql(`
    mutation deleteTodo($todoId: ID) {
        deleteTodo(todoId: $todoId) {
            id
        }
    }
`)
