import { useState} from "react"
import { useTodo } from "../contexts/TodoContext"

const Inputbox = () => {
  const {todo,addTodo} = useTodo();
  const[input,setInput]=useState('');

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!input.trim()) return;
    if(todo.some(t=>t.text===input)) return;
    addTodo(input);
    setInput('');
  }
  return (
    <form onSubmit={handleSubmit} className='todo-container__form'>
      <input value={input} onChange={(e)=>setInput(e.target.value)} required className='todo-container__input' placeholder="할 일을 입력하세요."/>
      <button type='submit' className="todo-container__button">할 일 입력</button>
    </form>
  )
}

export default Inputbox
