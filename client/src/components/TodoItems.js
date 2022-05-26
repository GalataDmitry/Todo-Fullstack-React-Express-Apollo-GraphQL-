import React, {memo} from "react"
import {v4} from 'uuid'
import {doneArgs, deleteArgs, executeText, executeButton} from "../auxiliary_functions/auxiliaryFunctions"
import WithData from "../hoc/WithData"
import '../styles/items.scss'

const TodoItems = ({data, doneTodo, deleteTodo}) => {
console.log('render')
    return data.getAllTodos.map(el => {
        return (
            <div className="row">
                <div className="col-5 mt-2">
                    <p className={executeText(el.done)} >{el.todo}</p>
                </div>
                <div className="col d-flex justify-content-end mb-3 text-decoration-underline">
                    <button
                        className={executeButton(el.done)}
                        type="button"
                        onClick={() => doneTodo(doneArgs(el.id, el.done))}
                    >
                        Done
                    </button>
                    <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={() => deleteTodo(deleteArgs(el.id))}
                    >
                        Delete
                    </button>
                </div>
            </div>
        )
    })
}

export default WithData(TodoItems)