import React, { useState } from "react";
import { Typography, Dialog, DialogContent, DialogContentText } from '@mui/material'
import styles from "./styles.module.css";
import { CustomSnackbar } from '../../components'


const TodoDialogComponent = ({ todos= [], dialogInfo, setDialogInfo, updateTodo = () => {}, addTodo = () => {}, getStatusColor= () => {}, handleChangeDialogInfo = () => {}, handleTodoUpdate= () => {}, addNewTodo= () => {}, activeStatusBtnStyle= () => {}, getCurrentTodo }) => {

    const { dialogType = "add", isDialogOpen = false, currentTodoName = "", currentTodoDescription= "", currentTodoStatus= "To Do", dialogTodoId = "" } = dialogInfo

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


    const todoInfoItems = [
        { label: "Title", value: currentTodoName },
        { label: "Description", value: currentTodoDescription },
        { label: "Status", value: currentTodoStatus },
    ]

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentTodoName === "") {
            setIsSnackbarOpen(true)
			setSnackbarMsg("Please add a title for your Todo")
			setSnackbarType("error")
        } else {
            handleSnackbarClose()
            if (dialogType === "add") {
                addTodo({
                    name: currentTodoName,
                    description: currentTodoDescription,
                    status: currentTodoStatus 
                }
                )
            } else {
                updateTodo(dialogTodoId, {
                    name: currentTodoName,
                    description: currentTodoDescription,
                    status: currentTodoStatus    
                })
            }
            handleChangeDialogInfo()
        }
    }

    const renderDialogContent = () => {
        if (dialogType === "add" || dialogType === "edit") {
            return (
                <form className={styles.form_container} onSubmit={handleSubmit}>
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
                    </h1>
                    <input
                        type="name"
                        placeholder="Title"
                        name="name"
                        onChange={(e) => handleChangeDialogInfo(dialogType, isDialogOpen, e.target.value, currentTodoDescription, currentTodoStatus, dialogTodoId)}
                        value= {currentTodoName || ""}
                        className={styles.input}
                    />
                    <input
                        type="description"
                        placeholder="Description"
                        name="description"
                        onChange={(e) => handleChangeDialogInfo(dialogType, isDialogOpen, currentTodoName, e.target.value, currentTodoStatus, dialogTodoId)}
                        value={currentTodoDescription || ""}
                        className={styles.input}
                    />
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
                    >
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
                </h1>
                {todoInfoItems.map(todoInfoItem => (
                    <div className={styles.todo_info_wrapper}>
                        <Typography variant="body1" color="text.secondary" sx= {{ marginRight: "5px" }}>
                            {`${todoInfoItem.label}- `}
                        </Typography>
                        {todoInfoItem.label === "Status" ? (
                            <span
                                style= {{ color: "#00000099", backgroundColor: getStatusColor(todoInfoItem.value), padding: "2px 10px", borderRadius: "10px" }}
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
                    <button 
                        type="submit"
                        className={styles.green_btn}
                        onClick={() => handleChangeDialogInfo()}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <Dialog onClose={() => handleChangeDialogInfo()} open={isDialogOpen}>
                <DialogContent>
                    <DialogContentText>
                        {renderDialogContent()} 
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <CustomSnackbar
				open={isSnackbarOpen}
				handleClose={handleSnackbarClose}
				message={snackbarMsg}
				snackbarType= {snackbarType}
			/>
        </>
    )
}

export default TodoDialogComponent