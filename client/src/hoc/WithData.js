import React from "react"
import {useMutation, useQuery} from "@apollo/client"
import {CREATE_TODO, DELETE_TODO, DONE_TODO} from "../mutations/mutations"
import {GET_ALL_TODOS} from "../query/query"
import Loading from "../components/Loading"
import Error from "../components/Error"

const WithData = (Component) => {

    return () => {
        const {data, loading, error} = useQuery(GET_ALL_TODOS)
        const [createTodo] = useMutation(CREATE_TODO, {
            // variables: {
            //     newTodo: inputData
            // },
            update: (cache, {data: {createTodo}}) => {
                const data = cache.readQuery({query: GET_ALL_TODOS})
                cache.writeQuery({
                    query: GET_ALL_TODOS, data: {
                        getAllTodos: [createTodo, ...data.getAllTodos]
                    }
                })
            }
        })
        const [doneTodo] = useMutation(DONE_TODO, {
            update: (cache, {data: {doneTodo}}) => {

                const updated = {}
                for (let key in doneTodo) {
                    Object.assign(updated, {[key]: doneTodo[key]})
                }
                if (updated.done)
                    updated.done = !updated.done
                else if (!updated.done)
                    updated.done = !updated.done

                // console.log('updated  ------>', Object.getOwnPropertyDescriptor(updated, 'done'))
                // console.log('doneTodo ------>', Object.getOwnPropertyDescriptor(doneTodo, 'done'))
                //kostylization
                // let {id, todo, done, __typename} = doneTodo
                // let updated = {id: id, todo: todo, done: !done, __typename: __typename}
                const data = cache.readQuery({query: GET_ALL_TODOS})
                const updateIdx = data.getAllTodos.findIndex(todo => todo.id === doneTodo.id)
                const beforeUpdated = data.getAllTodos.slice(0, updateIdx)
                const afterUpdated = data.getAllTodos.slice(updateIdx + 1)
                cache.writeQuery({
                    query: GET_ALL_TODOS, data: {
                        getAllTodos: [...beforeUpdated, updated, ...afterUpdated]
                    }
                })
            }
        })
        const [deleteTodo] = useMutation(DELETE_TODO, {
            update: (cache, {data: {deleteTodo}}) => {
                const data = cache.readQuery({query: GET_ALL_TODOS})
                const deleteIdx = data.getAllTodos.findIndex(todo => todo.id === deleteTodo.id)
                const beforeRemoved = data.getAllTodos.slice(0, deleteIdx)
                const afterRemoved = data.getAllTodos.slice(deleteIdx + 1)
                cache.writeQuery({
                    query: GET_ALL_TODOS, data: {
                        getAllTodos: [...beforeRemoved, ...afterRemoved]
                    }
                })
            }
        })

        if (loading) return <Loading/>
        if (error) return <Error/>

        return <Component
            createTodo={createTodo}
            data={data}
            doneTodo={doneTodo}
            deleteTodo={deleteTodo}
        />
    }
}

export default WithData