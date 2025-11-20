// @ts-ignore
import { useState,useContext,createContext,ReactNode } from "react";
import type { Todo } from "../types/Todo";
interface TodoContextType{
  todo:Todo[];
  doneTodo:Todo[];
  addTodo:(text:string)=>void;
  deleteTodo:(todo:Todo)=>void;
  completeTodo:(todo:Todo)=>void;
}

export const TodoContext = createContext<TodoContextType|undefined>(undefined);

export const TodoProvider=({children}:{children:ReactNode}) =>{
  const[todo,setTodo]=useState<Todo[]>([]);
  const[doneTodo,setDoneTodo]=useState<Todo[]>([]);

  const addTodo=(text:string)=>{
    const newTodo:Todo ={id:Date.now(),text};
    setTodo(text=>[...text,newTodo]);
  }
  const deleteTodo=(todo:Todo)=>{
    setTodo((prevtodo)=>prevtodo.filter(t=>t.id!==todo.id))
    setDoneTodo(prevDoneTodo=>[...prevDoneTodo,todo])
  }
  const completeTodo=(todo:Todo)=>{
    setDoneTodo((prevDoneTodo)=>prevDoneTodo.filter(t=>t.id!==todo.id))
  }
  return (
    <TodoContext.Provider value={{todo,doneTodo,addTodo,deleteTodo,completeTodo}}>
      {children}
    </TodoContext.Provider>
  )
  
}
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      'useTodo는 반드시 CountProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};
