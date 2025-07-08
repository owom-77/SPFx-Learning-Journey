import * as React from 'react'
import { TodoProvider } from '../context/TodoContext';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

interface Todo {
    id: string;
    msg: string;
    status: boolean;
}

const MainTodo: React.FC = () => {

    const [todos, setTodos] = React.useState<Todo[]>([]);

    const addTodo = (msg: string): void => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            msg,
            status: false
        }

        setTodos((prev) => [newTodo, ...prev])
    }

    const updateTodo = (id: string, newMsg: string): void => {
        setTodos((prev) =>
            prev.map((val) => (val.id === id ? { ...val, msg: newMsg } : val))
        );
    };

    const deleteTodo = (id: string): void => {
        setTodos((prev) => (prev.filter((val) => val.id !== id)));
    }

    const toggleStatus = (id: string): void => {
        setTodos((prev) => (prev.map((val) => val.id === id ? { ...val, status: !val.status } : val)))
    }

    React.useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <>
            <TodoProvider value={{ addTodo, updateTodo, deleteTodo, todos, toggleStatus }}>
                <TodoInput />
                <TodoList />
            </TodoProvider>
        </>
    )
}

export default MainTodo;