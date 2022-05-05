import React, {KeyboardEvent,ChangeEvent, useState} from 'react';
import styles from './Todolist.module.css'

type TodolistType = {
    TodolistTitle: string
    tasks: Array<TasksType> | TasksType[]
    filterTask:(todolistID:string,filterAmount:'All' | 'Completed' | 'Active')=>void
    removeTask:(todolistID:string,id:string)=>void
    addTask:(todolistID: string,text:string)=>void
    checkBoxChanger:(todolistID: string,id:string,isFalse:boolean)=>void
    filter:string
    todolistID:string
    removeTodolist:(todolistID: string)=>void
}
type TasksType = {
    id: string
    title: string
    isDone: boolean
}
const Todolist = (props: TodolistType) => {
    const [error,setError]=useState(false)
    const [newTask,setNewTask]=useState("")
    const filterHandler = (todolistID:string,filterAmount:'All' | 'Completed' | 'Active') => {
    props.filterTask(todolistID,filterAmount)
    }
    const removeTaskHandler = (todolistId:string,id:string) => {
      props.removeTask(todolistId,id)
    }
    const onChangeHandler = (text:ChangeEvent<HTMLInputElement>) => {
      setNewTask(text.currentTarget.value)
        setError(false)
    }
    const onclickHandler = (todolistID: string) => {
        if (newTask !== "")
        {props.addTask(todolistID,newTask.trim())
        setNewTask("")
    }else{
        setError(true)
    }

    }

    const onChangeCheckBoxHandler = (todolistID:string,id:string,event:boolean) => {
      props.checkBoxChanger(todolistID,id,event)
    }
    const onKeyPressHandler = (todolistID:string, event:KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode===13)
            onclickHandler(todolistID)
    }
    const removeTodolistHandler = (todolistID:string) => {
      props.removeTodolist(todolistID)
    }
    return (
        <div className="App">
            <div>
                <h3>{props.TodolistTitle}
                <button onClick={()=>removeTodolistHandler(props.todolistID)}>x</button>
                </h3>
                <div>
                    <input className={error ? styles.error : ""} value={newTask} onChange={onChangeHandler} onKeyPress={(event)=>onKeyPressHandler(props.todolistID,event)}/>
                    <button onClick={()=>onclickHandler(props.todolistID)}>+</button>
                    {error && <div className={styles.errorMessage}>Title is required!!!</div>}
                </div>
                <ul>
                    {props.tasks.map((El)=>{
                        return (
                        <li key={El.id}>
                            <button onClick={()=>removeTaskHandler(props.todolistID,El.id)}>x</button>
                            <input type="checkbox" checked={El.isDone} onChange={(event)=>onChangeCheckBoxHandler(props.todolistID,El.id,event.currentTarget.checked)}/>
                            <span>{El.title}</span>
                        </li>
                        )
                    })}
{/*                    <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
                </ul>
                <div>
                    <button className={props.filter==="All" ? styles.activeFilter:""} onClick={()=>filterHandler(props.todolistID, "All")}>All</button>
                    <button className={props.filter==="Active" ? styles.activeFilter:""} onClick={()=>filterHandler(props.todolistID,'Active')}>Active</button>
                    <button className={props.filter==="Completed" ? styles.activeFilter:""} onClick={()=>filterHandler(props.todolistID,'Completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;