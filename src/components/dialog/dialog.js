import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import styles from "./styles.module.css";

const TodoDialogComponent = ({ dialogInfo, setDialogInfo, handleChangeDialogInfo = () => {}, handleTodoUpdate, getCurrentTodo }) => {

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

    const renderDialogContent = () => {
        if (dialogType === "add" || dialogType === "edit") {
            return (
                // <h1>{dialogType}</h1>
                <form className={styles.form_container} onSubmit={() => {}}>
                    <h1 style= {{ margin: "0px", paddingBottom: "15px" }}>
                        {`${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} - `}<span style={{ color: "#1976d2" }}>
                            {getCurrentTodo(dialogTodoId).name}
                        </span>
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
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type="submit" className={styles.green_btn} onClick={() => {
                        handleTodoUpdate(
                            dialogTodoId,
                            {
                                name: currentTodoName,
                                description: currentTodoDescription,
                                status: currentTodoStatus    
                            }
                        )
                        handleChangeDialogInfo()
                    }}>
                        {dialogType.toUpperCase()}
                    </button>
                </form>
            )
        } return (
            <h1>{dialogType}</h1>
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