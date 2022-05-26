export const inputArgs = (inputData) => {
    return {
        variables: {
            newTodo: inputData
        }
    }
}
export const doneArgs = (todoId, isDone) => {
    return {
        variables: {
            todoId, isDone
        }
    }
}
export const deleteArgs = (todoId) => {
    return {
        variables: {
            todoId
        }
    }
}
export const executeText = (executionState) => {
    if (executionState)
        return 'text-black-50 text-decoration-line-through'
    else
        return 'text-white'
}
export const executeButton = (executionState) => {
    if (executionState)
        return 'btn btn-outline-dark me-2 button todo-execute-button-done'
    else
        return 'btn btn-outline-dark me-2'
}