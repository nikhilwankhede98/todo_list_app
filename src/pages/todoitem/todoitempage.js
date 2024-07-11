import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const TodoItemPage = () => {

    const [todoItem, setTodoItem] = useState({})

    const [updatedTodoItem, setUpdatedTodoItem] = useState({})

    const updateTodoItem = () => {
        setTodoItem(updatedTodoItem)
    }

    return (
        <div className={styles.todo_item_container}>
            <div className={styles.todo_item_form_container}>
                sdasd
            </div>
        </div>
    )
}

export default TodoItemPage