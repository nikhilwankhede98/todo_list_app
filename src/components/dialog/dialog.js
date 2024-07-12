import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Typography, DialogTitle, Dialog, DialogContent, DialogContentText } from '@mui/material'
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import styles from "./styles.module.css";

const TodoDialogComponent = ({ todos= [], dialogInfo, setDialogInfo, getStatusColor= () => {}, handleChangeDialogInfo = () => {}, handleTodoUpdate= () => {}, addNewTodo= () => {}, activeStatusBtnStyle= () => {}, getCurrentTodo }) => {

    const { dialogType = "add", isDialogOpen = false, currentTodoName = "", currentTodoDescription= "", currentTodoStatus= "To Do", dialogTodoId = "" } = dialogInfo
    console.log('555', { dialogInfo }, getCurrentTodo(dialogTodoId));

    // const { name= "", description= "", status= "To Do" } = getCurrentTodo(dialogTodoId)

    const [error, setError] = useState("");

    const [currentTodoInfo, setCurrentTodoInfo] = useState({
        todoName: currentTodoName,
        todoDescription: currentTodoDescription,
        todoStatus: currentTodoStatus,

    });

    console.log('555', { currentTodoInfo });
    const { todoName= "", todoDescription= "", todoStatus= "To DO" } = currentTodoInfo

    console.log('666', getCurrentTodo(dialogTodoId));

    const todoInfoItems = [
        { label: "Name", value: currentTodoName },
        { label: "Description", value: currentTodoDescription },
        { label: "Status", value: currentTodoStatus },
    ]

    const renderDialogContent = () => {
        if (dialogType === "add" || dialogType === "edit") {
            return (
                // <h1>{dialogType}</h1>
                <form className={styles.form_container} onSubmit={() => {}}>
                    <h1 style= {{ margin: "0px", paddingBottom: "15px" }}>
                        {`${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}`}
                        {dialogType === "edit" ? (
                            <span style={{ color: "#1976d2" }}>
                                {` - ${getCurrentTodo(dialogTodoId).name}`}
                            </span>
                        ) : (
                            <span style={{ color: "#1976d2" }}>
                                {` Todo`}
                            </span>
                        )}
                        {/* {`${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} - `}<span style={{ color: "#1976d2" }}>{currentTodoName}</span> */}
                    </h1>
                    <input
                        type="name"
                        placeholder="Name"
                        name="name"
                        // onChange={(e) => handleTodoUpdate(dialogTodoId, e.target.value, "name")}
                        // onChange={(e) => setCurrentTodoInfo(...currentTodoInfo, todoName)}
                        onChange={(e) => handleChangeDialogInfo(dialogType, isDialogOpen, e.target.value, currentTodoDescription, currentTodoStatus, dialogTodoId)}
                        value= {currentTodoName || ""}
                        required
                        className={styles.input}
                    />
                    <input
                        type="description"
                        placeholder="Description"
                        name="description"
                        // onChange={(e) => handleTodoUpdate(dialogTodoId, e.target.value, "description")}
                        // onChange={(e) => handleTodoUpdate(dialogTodoId, e.target.value, "description")}
                        onChange={(e) => handleChangeDialogInfo(dialogType, isDialogOpen, currentTodoName, e.target.value, currentTodoStatus, dialogTodoId)}
                        value={currentTodoDescription || ""}
                        required
                        className={styles.input}
                    />
                    {/* {error && <div className={styles.error_msg}>{error}</div>} */}
                    <div className={styles.status_btn_container}>
                        {["To Do", "In Progress", "Done"].map(statusOption => {
                            return (
                                <span
                                    key={statusOption}
                                    className={styles.todo_status}
                                    style= {activeStatusBtnStyle(statusOption, currentTodoStatus)}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        handleChangeDialogInfo(dialogType, isDialogOpen, currentTodoName, currentTodoDescription, statusOption, dialogTodoId)
                                    }}
                                >
                                    {statusOption}
                                </span>
                            )
                        })}
                    </div>
                    <button 
                        type="submit"
                        className={styles.green_btn}
                        onClick={() => {
                            if (dialogType === "add") {
                                addNewTodo({
                                    id: todos.length + 1,
                                    name: currentTodoName,
                                    description: currentTodoDescription,
                                    status: currentTodoStatus    
                                })
                            } else {
                                handleTodoUpdate(
                                    dialogTodoId,
                                    {
                                        name: currentTodoName,
                                        description: currentTodoDescription,
                                        status: currentTodoStatus    
                                    }
                                )
                            }
                            handleChangeDialogInfo()
                    }}>
                        {dialogType.toUpperCase()}
                    </button>
                </form>
            )
        } return (
            <div className={styles.view_todo_container}>
                <h1>
                    {`${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} - `}
                    <span style={{ color: "#1976d2" }}>
                        {`${getCurrentTodo(dialogTodoId).name}`}
                    </span>
                        {/* {`${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} - `}<span style={{ color: "#1976d2" }}>{currentTodoName}</span> */}
                </h1>
                {todoInfoItems.map(todoInfoItem => (
                    <div className={styles.todo_info_wrapper}>
                        <Typography variant="body1" color="text.secondary" sx= {{ marginRight: "5px" }}>
                            {`${todoInfoItem.label}- `}
                        </Typography>
                        {todoInfoItem.label === "Status" ? (
                            <span
                                style= {{ color: "#00000099", backgroundColor: getStatusColor(todoInfoItem.value), padding: "2px 10px", borderRadius: "10px" }}
                                // getStatusColor
                            >
                                {todoInfoItem.value}
                            </span>
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                {todoInfoItem.value}
                            </Typography>
                        )}
                    </div>
                ))}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    {/* <span 
                        className={styles.cancel_btn}
                        onClose={() => handleChangeDialogInfo()}
                    >
                        Cancel
                    </span> */}
                    <button 
                        type="submit"
                        className={styles.green_btn}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        )
    }

    return (
        <Dialog onClose={() => handleChangeDialogInfo()} open={isDialogOpen}>
            {/* <DialogTitle>{currentTodoName}</DialogTitle> */}
            <DialogContent>
                <DialogContentText>
                    {renderDialogContent()} 
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default TodoDialogComponent