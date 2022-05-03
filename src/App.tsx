import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type ToDoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1=v1();
    let todolistID2=v1();
    let [ToDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(ToDoListID: string,taskID: string) {
        setTasks({...tasks,[ToDoListID]:tasks[ToDoListID].filter(el=>el.id!==taskID)})
/*        let filteredTasks = tasks.filter(t => t.id != taskID);
        setTasks(filteredTasks);*/
    }

    function addTask(ToDoListID: string,title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        //let newTasks = [task, ...tasks];
        //setTasks(newTasks);*/
        setTasks({...tasks,[ToDoListID]:[...tasks[ToDoListID],newTask]})
    }

    function changeStatus(ToDoListID: string,taskId: string, isDone: boolean) {
        setTasks({...tasks,[ToDoListID]:tasks[ToDoListID].map(El=>El.id===taskId?{...El,isDone:isDone}:El)})
/*        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);*/
    }


    function changeFilter(ToDoListID: string, value: FilterValuesType) {
        /*        setFilter(value);*/
        setToDoLists(ToDoLists.map((El) => {
            return (
                El.id === ToDoListID ? {...El, filter: value} : El
            )
        }))
    }

    return (
        <div className="App">
            {ToDoLists.map((El) => {
                let tasksForTodolist = tasks[El.id];

                if (El.filter === "active") {
                    tasksForTodolist = tasks[El.id].filter(t => t.isDone === false);
                }
                if (El.filter === "completed") {
                    tasksForTodolist = tasks[El.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist key={El.id}
                              ToDoListID={El.id}
                              title={El.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={El.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
