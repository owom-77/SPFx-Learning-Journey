import { useContext, createContext } from "react";

interface Todo {
    id: string;
    msg: string;
    status: boolean
}

interface TodoContextType {
    todos: Todo[],
    addTodo: (msg:string)=>void;
    updateTodo: (id:string, msg:string)=>void;
    deleteTodo: (id:string)=>void;
    toggleStatus: (id:string)=>void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = TodoContext.Provider;

export const useTodo = ():TodoContextType =>{
    const context = useContext(TodoContext);
    if(!context) throw new Error("Context not initialize");
    return context;
}

