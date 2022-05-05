import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

type todolistsType = {
    id: string
    title: string
    filter: 'All' | 'Completed' | 'Active'
}


function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    const addTask = (todolistID: string, text: string) => {
        let newTask = {id: v1(), title: text, isDone: false}
/*        setTasks([newTask, ...tasks])*/
        setTasks({...tasks,[todolistID]:[newTask,...tasks[todolistID]]})

    }

    const filterTask = (todolistID: string, filterAmount: 'All' | 'Completed' | 'Active') => {
        setTodolists([...todolists.map(El => todolistID === El.id ? {...El, filter: filterAmount} : El)])
    }
    const removeTask = (todolistID: string, id: string) => {
/*        setTasks(tasks.filter(El => El.id !== id))*/
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(El=>El.id!==id)})
    }
    const checkBoxChanger = (todolistID:string,id: string, isFalse: boolean) => {
/*        setTasks([...tasks.map((El) => {
            return (
                id === El.id ? {...El, isDone: isFalse} : El
            )
        })])*/
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(El=>El.id===id ? {...El,isDone:isFalse}:El)})
    }
    function removeTodolist(todolistID: string){
        setTodolists(todolists.filter(El=>El.id!==todolistID))
    delete tasks[todolistID]
    }
    return (
        <div className="App">
            {todolists.map((todolistsEl) => {
                let filteredTasks = tasks[todolistsEl.id]
                if (todolistsEl.filter === "Active") {
                    filteredTasks = tasks[todolistsEl.id].filter(El => !El.isDone)
                }
                if (todolistsEl.filter === "Completed") {
                    filteredTasks = tasks[todolistsEl.id].filter(El => El.isDone)
                }
                return (
                    <Todolist
                        key={todolistsEl.id}
                        todolistID={todolistsEl.id}
                        TodolistTitle={todolistsEl.title}
                        tasks={filteredTasks}
                        filterTask={filterTask}
                        removeTask={removeTask}
                        addTask={addTask}
                        checkBoxChanger={checkBoxChanger}
                        filter={todolistsEl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>

    );
}

export default App;
