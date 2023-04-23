import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";

const style = {
    li: `flex justify-between bg-[#718093] p-4 my-2 capitalize`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`,
    buttons: `flex items-center space-between`,
    deleteBtn: `p-2 bg-transparent text-[#c23616] hover:text-[#e84118] text-xl`,
    editBtn: `p-2 bg-transparent text-[#e1b12c] hover:text-[#fbc531] text-xl`,
}
const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
    return (
        <li className={todo.completed ? style.liComplete : style.li}>
          <div className={style.row}>
            <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} />
            <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>
          </div>
          <div className="style.buttons">
          <button className={style.deleteBtn} onClick={() => deleteTodo(todo)}>
            {<FaRegTrashAlt />}
          </button>
          <button className={style.editBtn} onClick={() => editTodo(todo)}>
            { <AiOutlineEdit />}
          </button>
          </div>
        </li>
    );
    }

export default Todo;