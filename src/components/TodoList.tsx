import React from "react"
import { TodoListItem } from "./TodoListItem"
import { Todo, ToggleTodo, DeleteTodo, ChangeStatus } from "../model/Todo"

interface TodoListProps {
    todos: Array<Todo>;
    toggleTodo: ToggleTodo;
    deleteTodo: DeleteTodo;
    changeStatus: ChangeStatus;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, changeStatus }) => {
    return <ul>
        {todos.map(todo => {
            return <TodoListItem
                key={todo._id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                changeStatus={changeStatus}
            />
        })}
    </ul>
}