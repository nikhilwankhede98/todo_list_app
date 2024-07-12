import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TodoDialogComponent } from "../../components"
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import styles from "./styles.module.css";
import AddIcon from './assets/add_icon.png'
import EditIcon from './assets/edit_icon.svg'
import DeleteIcon from './assets/delete_icon.svg'

const TodosPage = () => {

    const navigate = useNavigate();

    const [todos, setTodos] = useState([
        {id: 1, name: "Todo 1", description: "Todo 1 description description description description description", status: "To Do"},
        {id: 2, name: "Todo 2", description: "Todo 2 description", status: "In Progress"},
        {id: 3, name: "Todo 3", description: "Todo 3 description", status: "Done"},
        {id: 4, name: "Todo 1", description: "Todo 1 description", status: "To Do"},
        {id: 5, name: "Todo 2", description: "Todo 2 description", status: "In Progress"},
        {id: 6, name: "Todo 3", description: "Todo 3 description", status: "Done"},
        {id: 7, name: "Todo 1", description: "Todo 1 description", status: "To Do"},
        {id: 8, name: "Todo 2", description: "Todo 2 description", status: "In Progress"},
        {id: 9, name: "Todo 1", description: "Todo 1 description", status: "To Do"},
        {id: 10, name: "Todo 2", description: "Todo 2 description", status: "In Progress"},
        {id: 11, name: "Todo 3", description: "Todo 3 description", status: "Done"},
        {id: 12, name: "Todo 1", description: "Todo 1 description", status: "To Do"},
        {id: 13, name: "Todo 2", description: "Todo 2 description", status: "In Progress"},
        {id: 14, name: "Todo 1", description: "Todo 1 description", status: "To Do"},
        {id: 15, name: "Todo 2", description: "Todo 2 description", status: "In Progress"},
        {id: 16, name: "Todo 3", description: "Todo 3 description", status: "Done"},
        {id: 17, name: "Todo 1", description: "Todo 1 description", status: "To Do"},
        {id: 18, name: "Todo 2", description: "Todo 2 description", status: "In Progress"},
    ])

    const [dialogInfo, setDialogInfo] = useState({
        dialogType: "",
        isDialogOpen: false,
        currentTodoName: "",
        currentTodoDescription: "",
        currentTodoStatus: "To Do",
        dialogTodoId: ""
    })

    const handleDialogInfo = (dialogType = "", isDialogOpen = false, currentTodoName = "", currentTodoDescription = "", currentTodoStatus = "To Do", dialogTodoId = "") => {
        setDialogInfo({
            ...dialogInfo,
            dialogType, 
            isDialogOpen,
            currentTodoName,
            currentTodoDescription,
            currentTodoStatus,
            dialogTodoId
        })  
    }

    const { dialogType = "add", isDialogOpen = false, currentTodoName = "", currentTodoDescription="", currentTodoStatus= "To Do", dialogTodoId = "" } = dialogInfo
    console.log('333', { dialogInfo });

    const [currentTodoItem, setCurrentTodoItem] = useState({})

    const addTodo = () => setTodos(todos => todos.push(currentTodoItem))

    const deleteTodo = (id) => {
        const filteredTodos = todos.filter(todo => todo.id !== id)
        setTodos(filteredTodos)
    }

    const handleTodoUpdate = (id, newValue, key= "") => {
        console.log('555', { id, newValue, key });
        let todosCopy = [...todos]
        const index = todosCopy.findIndex(todo => todo.id === id);
        if (index !== -1) {
            // const updatedTodo = { ...todosCopy[index], [key]: newValue };
            const updatedTodo = { ...todosCopy[index], ...newValue };
            
            todosCopy[index] = updatedTodo;
            
            setTodos(todosCopy)
        } else {
            console.log(`Todo with id ${id} not found`);
            
        }
    }

    const getStatusColor = (status) => {
        console.log('111', { status });
        if (status === "To Do") return "#f36363"
        if (status === "In Progress") return "orange"
        return "green"
    }

    const getCurrentTodo = () => {
        return todos.find(todo => todo.id === dialogTodoId) || {}
    }

    const todoStatusConfigList = () => {
        return ["To Do", "In Progress", "Done"]
    }

    const activeStatusBtnStyle = (statusOption, currentTodoStatus) => {
        return statusOption === currentTodoStatus ? 
            { backgroundColor: getStatusColor(statusOption), color: "black", padding: "4px 10px" } : 
            { border: `2px solid ${getStatusColor(statusOption)}`, opacity: 0.6 }
    }

    const handleTodoStatusUpdate = (id, ) => {

    }

    console.log('666', { todos });

    return (
        <>
            <div className={styles.todo_list_container}>
                <h1 style= {{ margin: "0px", paddingBottom: "15px" }}>TODO <span style={{ color: "#1976d2" }}>List</span></h1>
                <div className={styles.todo_list_content_box}>
                    {todos.map(todo => (
                        <div
                            key= {todo.id}
                            className= {styles.todo_list_item}
                            style= {{ borderLeft: `5px solid ${getStatusColor(todo.status)}` }}
                            onClick={() => {handleDialogInfo("view", true, todo.name, todo.description, todo.status, todo.id)}}
                        >
                            <div className={styles.todo_action_section}>
                                <p className={styles.todo_name} >{todo.name}</p>
                                <div className={styles.icon_class}>
                                    <img src= {EditIcon} onClick={(event) => {
                                        event.stopPropagation()
                                        handleDialogInfo("edit", true, todo.name, todo.description, todo.status, todo.id)
                                    }} 
                                    />
                                    <img src= {DeleteIcon} onClick={(event) => {
                                        event.stopPropagation()
                                        deleteTodo(todo.id)
                                    }} />
                                </div>
                            </div>
                            <p 
                                // style= {{
                                //     margin: "0px",
                                //     marginBottom: "5px",
                                //     whiteSpace: "nowrap",         /* Prevents the text from wrapping */
                                //     overflow: "hidden",            /* Hides any text that exceeds the width */
                                //     textOverflow: "ellipsis",     /* Displays an ellipsis (...) to indicate overflow */
                                //     display: "block",              /* Ensures the ellipsis works as expected */
                                // }}
                                className={styles.todo_description}
                            >
                                {todo.description}
                            </p>
                            <div className={styles.status_btn_container}>
                                {todoStatusConfigList().map(statusOption => {
                                    return (
                                            <span
                                                key={statusOption}
                                                className={styles.todo_status}
                                                style= {activeStatusBtnStyle(statusOption, todo.status)}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    handleTodoUpdate(todo.id, { ...todo, status: statusOption })
                                                }}
                                            >
                                                {statusOption}
                                            </span>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <TodoDialogComponent 
                  handleChangeDialogInfo= {handleDialogInfo}
                  dialogInfo= {dialogInfo}
                  handleTodoUpdate= {handleTodoUpdate}
                  getCurrentTodo = {getCurrentTodo}
                />
            </div>
        </>
    )
    
}

export default TodosPage