import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {
    // const today = new Date();

    const authContext = useAuth();

    const username = authContext.username;


    // const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([])

    const [deleteMessage, setDeleteMessage] = useState(null)

    const navigate = useNavigate();

    // const todos = [
    // { id: 1, description: "Learn React", done: false, targetDate: targetDate },
    // { id: 2, description: "Learn Docker", done: false, targetDate: targetDate },
    // { id: 3, description: "Learn Spring", done: false, targetDate: targetDate },
    // ]

    useEffect(
        () => refreshTodos(), []
    )

    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
            .then((response) => { setTodos(response.data) })
            .catch((error) => console.log(error));
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id)
            .then(
                //1. delete message
                () => {
                    setDeleteMessage(`Todo id ${id} deleted successfully`)
                    //2. refresh todos
                    refreshTodos()
                }
            )
            .catch((error) => console.log(error));
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }


    function addNewTodo() {
        navigate('/todo/-1')
    }



    return (
        <div className="container mt-5">
            <h1 className="text-center">Things you want to do!!</h1>
            {deleteMessage && <div className="alert alert-danger text-center">{deleteMessage}</div>}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done ? 'Yes' : 'No'}</td>
                                <td>{new Date(todo.targetDate).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => updateTodo(todo.id)}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <button className="btn btn-success mt-4" onClick={addNewTodo}>
                    Add New Todo
                </button>
            </div>
        </div>
    );
}
