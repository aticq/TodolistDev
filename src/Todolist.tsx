import React from "react";

type TodolistPropsType = {
    title: string
    tasks: TasksType[]
    RemoveTask:(id:string)=>void
    filterName:(filterValue:string)=>void
    addTask:(text:string)=>void
}

type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}


export function Todolist(props: TodolistPropsType) {

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button onClick={()=>props.addTask("Lox")}>+</button>
                </div>
                <ul>
                    {props.tasks.map((TasksEl, id) => {
                        return (
                            <li key={id}>
                                <button onClick={()=>props.RemoveTask(TasksEl.id)}>x</button>
                                <input type="checkbox" checked={TasksEl.isDone}/>
                                <span> {TasksEl.title}</span>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={()=>props.filterName("All")}>All</button>
                    <button onClick={()=>props.filterName("Active")}>Active</button>
                    <button onClick={()=>props.filterName("Completed")}>Completed</button>
                </div>
            </div>
        </div>
    )
        ;
}