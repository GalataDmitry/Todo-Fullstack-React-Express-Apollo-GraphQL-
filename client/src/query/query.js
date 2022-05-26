import {gql} from "@apollo/client"

export const GET_ALL_TODOS = gql(`
    query getAllTodos {
        getAllTodos {
            id, todo, done
        }
    }
`)