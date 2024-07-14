import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TodoDialogComponent, CustomSnackbar } from "../../components"
import {InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import styles from "./styles.module.css";
import AddIcon from './assets/add_icon.png'
import EditIcon from './assets/edit_icon.svg'
import DeleteIcon from './assets/delete_icon.svg'
import { firestore } from '../../api/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';

const TodosPage = ({ isLoggedIn, userId = null }) => {

    const navigate = useNavigate();

    const [todos, setTodos] = useState([
        {id: 1, name: "Todo 1", description: "Todo 1 description description description description description", status: "To Do"},
        {id: 2, name: "Todo 2", description: "Todo 2 description", status: "In Progress"},
        {id: 3, name: "Todo 3", description: "Todo 3 description", status: "To Do"},
        {id: 4, name: "Todo 4", description: "Todo 4 description", status: "Done"},
        {id: 5, name: "Todo 5", description: "Todo 5 description", status: "Done"},
        {id: 6, name: "Todo 6", description: "Todo 6 description", status: "To Do"},
        {id: 7, name: "Todo 7", description: "Todo 7 description", status: "To Do"},
        {id: 8, name: "Todo 8", description: "Todo 8 description", status: "In Progress"},
        {id: 9, name: "Todo 9", description: "Todo 9 description", status: "To Do"},
        {id: 10, name: "Todo 10", description: "Todo 10 description", status: "In Progress"},
        {id: 11, name: "Todo 11", description: "Todo 11 description", status: "Done"},
        {id: 12, name: "Todo 12", description: "Todo 12 description", status: "To Do"},
        {id: 13, name: "Todo 13", description: "Todo 13 description", status: "In Progress"},
        {id: 14, name: "Todo 14", description: "Todo 14 description", status: "To Do"},
        {id: 15, name: "Todo 15", description: "Todo 15 description", status: "In Progress"},
        {id: 16, name: "Todo 16", description: "Todo 16 description", status: "Done"},
        {id: 17, name: "Todo 17", description: "Todo 17 description", status: "To Do"},
        {id: 18, name: "Todo 18", description: "Todo 18 description", status: "In Progress"},
    ])

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState("");
	const [snackbarType, setSnackbarType] = useState("");

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
		return;
		}
		setSnackbarMsg("")
		setSnackbarType("")
		setIsSnackbarOpen(false);
	};

    useEffect(() => {
        if ((!isLoggedIn || !userId)) navigate("/login")
    }, [isLoggedIn, userId])

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(firestore, 'todos'), where('userId', '==', userId)), (snapshot) => {
          const todosList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todosList);
        });
    
        return () => unsubscribe();
    }, [userId]);

    // useEffect(() => {
    //     const unsubscribe = firestore.collection('todos').onSnapshot(snapshot => {
    //       const todosList = snapshot.docs.map(doc => ({
    //         id: doc.id,
    //         ...doc.data()
    //       }));
    //       console.log('888', { todosList });
    //       setTodos(todosList);
    //     });
    
    //     return () => unsubscribe();
    // }, []);

    const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")

    const statusFilterOptions = ["All", "To Do", "In Progress", "Done"]

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

    // const addTodo = async (todoData) => {
    //     console.log('888add', { todoData });
    //     const { name, description, status } = todoData
    //     try {
    //       await firestore.collection('todos').add({
    //         name,
    //         description,
    //         status
    //       });
    //     //   setTodo('');
    //     } catch (error) {
    //       console.error('Error adding todo:', error);
    //     }
    // };

    // const addTodo = async (todoData) => {
    //     const { name, description, status } = todoData
    //     try {
    //       const docRef = await addDoc(collection(firestore, 'todos'), {
    //         name,
    //         description,
    //         status,
    //         createdAt: new Date(),
    //       });
    //       console.log('321', { docRef });
    //     } catch (error) {
    //         console.error('Error adding todo:', error);
    //     }
    // };

    const addTodo = async (todoData) => {
        // if (!taskInput.trim() || !taskDescriptionInput.trim()) return;
        const { name, description, status } = todoData
        try {
            const docRef = await addDoc(collection(firestore, 'todos'), {
                userId,
                name,
                description,
                status,
                createdAt: new Date(),
            });
            setIsSnackbarOpen(true)
            setSnackbarMsg("Todo added successfully!")
            setSnackbarType("success")
        } catch (error) {
            console.error('Error adding todo:', error.message);
            setIsSnackbarOpen(true)
            setSnackbarMsg("Error while adding Todo")
            setSnackbarType("error")
        }
      };

    // const deleteTodo = (id) => {
    //     console.log('888', { id });
    //     const filteredTodos = todos.filter(todo => todo.id !== id)
    //     setTodos(filteredTodos)
    // }

    // const deleteTodo = async (id) => {
    //     console.log('888delete', id);
    //     try {
    //       await firestore.collection('todos').doc(id).delete();
    //     } catch (error) {
    //       console.error('Error deleting todo:', error);
    //     }
    // };

    // const deleteTodo = async (todoId) => {
    //     console.log('321', { todoId });
    //     try {
    //       await deleteDoc(collection(firestore, 'todos'), todoId);
    //     } catch (error) {
    //       console.error('Error removing todo: ', error.message);
    //     }
    // };

    const deleteTodo = async (todoId) => {
        try {
            await deleteDoc(doc(firestore, 'todos', todoId));
            setIsSnackbarOpen(true)
            setSnackbarMsg("Todo deleted successfully!")
            setSnackbarType("success")

        } catch (error) {
            setIsSnackbarOpen(true)
            setSnackbarMsg("Error while deleting Todo")
            setSnackbarType("error")
            console.error('Error removing task: ', error.message);
        }
    };

    // const updateTodo = async (id, updatedData) => {
    //     const { name, description, status } = updatedData
    //     console.log('888', { id, updatedData });
    //     try {
    //         await firestore.collection('todos').doc(id).update({
    //             name,
    //             description,
    //             status
    //         });
    //     } catch (error) {
    //         console.error('Error updating todo:', error);
    //     }
    // }

    // const updateTodo = async (todoId, updatedData) => {
    //     // const { name, description, status } = updatedData
    //     console.log('321', { updatedData });

    //     try {
    //         const taskDocRef = doc(firestore, 'todos', todoId);
    //         console.log('321', taskDocRef);
    //         await updateDoc(taskDocRef, { userId, ...updatedData });
    //     } catch (error) {
    //         console.log('321', { error });
    //         console.error('Error updating todo: ', error.message);
    //     }
    // };

    const updateTodo = async (todoId, updatedData) => {
        try {
            const taskDocRef = doc(firestore, 'todos', todoId);
            await updateDoc(taskDocRef, updatedData);
            setIsSnackbarOpen(true)
            setSnackbarMsg("Todo details updated successfully!")
            setSnackbarType("success")
        } catch (error) {
            setIsSnackbarOpen(true)
            setSnackbarMsg("Error while updating Todo")
            setSnackbarType("error")
            console.error('Error updating task status: ', error.message);
        }
    };

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

    const addNewTodo = (todo) => {
        let newTodo = [...todos]
        newTodo.push(todo)
        setTodos(newTodo)
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

    console.log('777', { todos });

    console.log('123', { isLoggedIn });

    return (
        <>
            <div className={styles.todo_list_container}>
                <div className={styles.header_section}>
                    <h1 style= {{ margin: "0px" }}>TODO <span style={{ color: "#1976d2" }}>List</span></h1>
                    <div className= {styles.header_btns_wrapper}>
                        <img
                            src= {AddIcon}
                            onClick={() => {handleDialogInfo("add", true, "", "", "To Do", "")}}
                        />
                        <FormControl sx={{ m: 1, minWidth: 135 }} size="small">
                            <InputLabel id="demo-select-small-label">Status Filter</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={selectedStatusFilter}
                                label="Status Filter"
                                onChange={(event) => setSelectedStatusFilter(event.target.value)}
                            >
                                {statusFilterOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className={styles.todo_list_content_box}>
                    {todos.map(todo => (
                        <div
                            key= {todo.id}
                            className= {styles.todo_list_item}
                            style= {{
                                borderLeft: `5px solid ${getStatusColor(todo.status)}`,
                                display: (selectedStatusFilter === "All" || selectedStatusFilter === todo.status) ? "inline-flex" : "none"
                            }}
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
                                {["To Do", "In Progress", "Done"].map(statusOption => {
                                    return (
                                        <span
                                            key={statusOption}
                                            className={styles.todo_status}
                                            style= {activeStatusBtnStyle(statusOption, todo.status)}
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                // handleTodoUpdate(todo.id, { ...todo, status: statusOption })
                                                updateTodo(todo.id, { ...todo, status: statusOption })
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
                  addNewTodo= {addNewTodo}
                  getCurrentTodo = {getCurrentTodo}
                  todos= {todos}
                  activeStatusBtnStyle= {activeStatusBtnStyle}
                  getStatusColor= {getStatusColor}
                  updateTodo= {updateTodo}
                  addTodo= {addTodo}
                />
            </div>
            <CustomSnackbar
				open={isSnackbarOpen}
				handleClose={handleSnackbarClose}
				message={snackbarMsg}
				snackbarType= {snackbarType}
			/>
        </>
    )
    
}

export default TodosPage