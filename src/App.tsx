import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {
    const [tasks1, setTasks1] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "TypeScript", isDone: true},
    ])

    const addTask=(textFromTD:string)=>{
        console.log(textFromTD)
    }

    function RemoveTask(idFromToDoList: string) {
        setTasks1(tasks1.filter((Tasks1El) => (idFromToDoList !== Tasks1El.id)))
    }

    const [filter, setFilter] = useState('All')

    let filterChange = tasks1
    if (filter === "Active") {
        filterChange = tasks1.filter((Tasks1El) => !Tasks1El.isDone)
    }
    if (filter === "Completed") {
        filterChange = tasks1.filter((Tasks1El) => Tasks1El.isDone)
    }

    function filterName(filterValueFromTodolist: string) {
        setFilter(filterValueFromTodolist)
    }

    return (
        <>
            <Todolist title={"First Todolist"} tasks={filterChange} RemoveTask={RemoveTask} filterName={filterName} addTask={addTask}/>
        </>
    )
}

export default App;
