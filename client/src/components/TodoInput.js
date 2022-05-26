import React, {useState} from "react"
import {inputArgs} from "../auxiliary_functions/auxiliaryFunctions"
import WithData from "../hoc/WithData"
import '../styles/input.scss'

const TodoInput = ({createTodo}) => {

    const [inputData, setInputData] = useState('')

    return <div className="row">
        <div className="col">
            <div className="input-group mb-3 mt-3">
                <input
                    className="form-control todo-input"
                    type="text"
                    placeholder="Add todo"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                />
                <button
                    className="btn btn-outline-dark"
                    type="button"
                    onClick={() => {
                        createTodo(inputArgs(inputData))
                        setInputData('')
                    }}
                >
                    Add
                </button>
            </div>
            <hr/>
        </div>
    </div>
}

export default WithData(TodoInput)