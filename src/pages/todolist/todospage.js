import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodoDialogComponent, CustomSnackbar, Loader } from "../../components"
import {InputLabel, MenuItem, FormControl, Select, TextField} from '@mui/material';
import styles from "./styles.module.css";
import AddIcon from './assets/add_icon.png'
import EditIcon from './assets/edit_icon.svg'
import DeleteIcon from './assets/delete_icon.svg'
import { firestore } from '../../api/firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';

const TodosPage = ({ isLoggedIn, userId = null, setIsLoading = () => {}, isLoading= false }) => {

    const navigate = useNavigate();

    const [todos, setTodos] = useState([])

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
	const [snackbarMsg, setSnackbarMsg] = useState("");
	const [snackbarType, setSnackbarType] = useState("");

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("All")

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
        setIsLoading(true)
        const unsubscribe = onSnapshot(query(collection(firestore, 'todos'), where('userId', '==', userId)), (snapshot) => {
            const todosList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodos(todosList);
            setIsLoading(false)

        });
        setIsLoading(false)
        return () => unsubscribe();
    }, [userId]);

    const getTodosByStatusFilter = () => {
        let todoListByStatusFilter = todos.filter(todo => {
            if (selectedStatusFilter === "All") return todos
            return todo.status === selectedStatusFilter
        })
        if (searchTerm !== "") {
            todoListByStatusFilter = todoListByStatusFilter.filter(todo =>
                todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                todo.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        return todoListByStatusFilter
    }

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

    const { dialogTodoId = "" } = dialogInfo

    const addTodo = async (todoData) => {
        const { name, description, status } = todoData
        setIsLoading(true)
        try {
            const docRef = await addDoc(collection(firestore, 'todos'), {
                userId,
                name,
                description,
                status,
                createdAt: new Date(),
            });
            setIsLoading(false)
            setIsSnackbarOpen(true)
            setSnackbarMsg("Todo added successfully!")
            setSnackbarType("success")
        } catch (error) {
            setIsLoading(false)
            console.error('Error adding todo:', error.message);
            setIsSnackbarOpen(true)
            setSnackbarMsg("Error while adding Todo")
            setSnackbarType("error")
        }
      };

    const deleteTodo = async (todoId) => {
        setIsLoading(true)
        try {
            await deleteDoc(doc(firestore, 'todos', todoId));
            setIsLoading(false)
            setIsSnackbarOpen(true)
            setSnackbarMsg("Todo deleted successfully!")
            setSnackbarType("success")

        } catch (error) {
            setIsLoading(false)
            setIsSnackbarOpen(true)
            setSnackbarMsg("Error while deleting Todo")
            setSnackbarType("error")
            console.error('Error removing task: ', error.message);
        }
    };

    const updateTodo = async (todoId, updatedData) => {
        setIsLoading(true)
        try {
            const taskDocRef = doc(firestore, 'todos', todoId);
            await updateDoc(taskDocRef, updatedData);
            setIsLoading(false)
            setIsSnackbarOpen(true)
            setSnackbarMsg("Todo details updated successfully!")
            setSnackbarType("success")
        } catch (error) {
            setIsLoading(false)
            setIsSnackbarOpen(true)
            setSnackbarMsg("Error while updating Todo")
            setSnackbarType("error")
            console.error('Error updating task status: ', error.message);
        }
    };

    const handleTodoUpdate = (id, newValue, key= "") => {
        let todosCopy = [...todos]
        const index = todosCopy.findIndex(todo => todo.id === id);
        if (index !== -1) {
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
        if (status === "To Do") return "#f36363"
        if (status === "In Progress") return "orange"
        return "green"
    }

    const getCurrentTodo = () => {
        return todos.find(todo => todo.id === dialogTodoId) || {}
    }

    const activeStatusBtnStyle = (statusOption, currentTodoStatus) => {
        return statusOption === currentTodoStatus ? 
            { backgroundColor: getStatusColor(statusOption), color: "black", padding: "4px 10px" } : 
            { border: `2px solid ${getStatusColor(statusOption)}`, opacity: 0.6 }
    }

    return (
        <>
            <div className={styles.todo_list_container}>
                <div className={styles.header_section}>
                    <h1 style= {{ margin: "0px" }}>TODO <span style={{ color: "#1976d2" }}>List</span></h1>
                    <div className= {styles.header_btns_wrapper}>
                        <img
                            alt= "add-icon"
                            src= {AddIcon}
                            onClick={() => {handleDialogInfo("add", true, "", "", "To Do", "")}}
                        />
                        <FormControl sx={{ 
                            m: 1,
                            minWidth: 135,
                            '@media (max-width: 768px)': {
                                minWidth: 140
                            },
                            '@media (max-width: 376px)': {
                                minWidth: 100,
                                maxWidth: 145
                            }
                            }} 
                            size="small"
                        >
                            <InputLabel id="demo-select-small-label">Status Filter</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={selectedStatusFilter}
                                label="Status Filter"
                                onChange={(event) => setSelectedStatusFilter(event.target.value)}
                                sx={{
                                    fontSize: "16px",
                                    paddingRight: "25px",
                                    '@media (max-width: 768px)': {
                                        fontSize: "14px",
                                    }
                                }}
                            >
                                {statusFilterOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl 
                            sx={{ 
                                m: 1,
                                minWidth: 135,
                                '@media (max-width: 376px)': {
                                    maxWidth: 140,
                                    minWidth: 100
                                },
                                '@media (max-width: 321px)': {
                                    maxWidth: 90,
                                    minWidth: 90
                                }
                            }}
                            size="small"
                        >
                            <TextField 
                                id="outlined-basic"
                                variant="outlined"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                                placeholder="Search Todo"
                                sx={{
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        fontSize: "10px !important"
                                    },
                                    input : {
                                        padding: "8.5px !important",
                                        fontSize: "14px !important",
                                        '@media (max-width: 768px)': {
                                            fontSize: "12px !important",
                                        },
                                    }
                                }}
                            />
                        </FormControl>
                    </div>
                </div>
                <div 
                    className={styles.todo_list_content_box}
                    style={{ overflowY: todos.length > 0 ? "scroll" : "auto" }}
                >
                    {isLoading ? (
                        <Loader />
                    ) : getTodosByStatusFilter()?.length > 0 ?
                            getTodosByStatusFilter()?.map(todo => (
                                <div
                                    key= {todo.id}
                                    className= {styles.todo_list_item}
                                    style= {{
                                        borderLeft: `5px solid ${getStatusColor(todo.status)}`,
                                    }}
                                    onClick={() => {handleDialogInfo("view", true, todo.name, todo.description, todo.status, todo.id)}}
                                >
                                    <div className={styles.todo_action_section}>
                                        <p className={styles.todo_name} >{todo.name}</p>
                                        <div className={styles.icon_class}>
                                            <img alt= "edit-icon" src= {EditIcon} onClick={(event) => {
                                                event.stopPropagation()
                                                handleDialogInfo("edit", true, todo.name, todo.description, todo.status, todo.id)
                                            }} 
                                            />
                                            <img alt= "delete-icon" src= {DeleteIcon} onClick={(event) => {
                                                event.stopPropagation()
                                                deleteTodo(todo.id)
                                            }} />
                                        </div>
                                    </div>
                                    <p
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
                                                        updateTodo(todo.id, { ...todo, status: statusOption })
                                                    }}
                                                >
                                                    {statusOption}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                    ) : (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", flexDirection: "column" }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>No todos added yet!</p>
                            <p>Start by adding your first todo item.</p>
                        </div>
                    )}
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