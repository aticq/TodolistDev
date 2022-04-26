import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [todolistID: string]: Array<TaskType>
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const [ToDoList, setToDoList] = useState<Array<TodolistType>>([
            {id: todolistID_1, title: "What to learn", filter: 'all'},
            {id: todolistID_2, title: "What to buy", filter: 'all'},
        ]
    )
    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Sugar", isDone: false},
            {id: v1(), title: "Toilet paper", isDone: false},

        ]
    })




    function removeTask(id: string, todolistID: string) {
        /*        let filteredTasks = tasks.filter(t => t.id != id);
                setTasks(filteredTasks);*/

        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        /*        const taskforCurrentTodolist= tasks[todolistID]
                let upDatedTasks = taskforCurrentTodolist.map(t=>t.id===taskId?{...t,isDone:isDone}:t)*/
        /*        const copyTasks = {...tasks}
                copyTasks[todolistID] = upDatedTasks
                setTasks(copyTasks);*/
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        setToDoList(ToDoList.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    const removeTodolist = (todolistID: string) => {
        setToDoList(ToDoList.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }


    const todlistFoRender = ToDoList.map(tl => {
        let tasksForTodolist = tasks[tl.id];
        debugger
        if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        }
        return (
            <Todolist
                key={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForTodolist}
                todolistID={tl.id}
                removeTodolist={removeTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}

            />
        )
    })

    return (
        <div className="App">
            {todlistFoRender}
        </div>
    );
}

export default App;
