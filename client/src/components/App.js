import React from "react"
import TodoInput from "./TodoInput"
import TodoItems from "./TodoItems"
import WithData from "../hoc/WithData"
import '../styles/app.scss'

const App = () => {

    return <div className='container-fluid todo-container'>
        <TodoInput/>
        <TodoItems/>
    </div>
}

export default WithData(App)