import React, { useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Todo from './components/Todo.jsx'
import { db } from './firebase'
import { collection, doc, onSnapshot, query, updateDoc, deleteDoc, addDoc } from 'firebase/firestore'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#3498db] to-[#ecf0f1]`,
  container: `bg-slate-100 max-width-[500px] w-full m-auto p-4 rounded-md shadow-xl`,
  title: `text-3xl font-bold text-center text-slate-900`,
  form: `flex items-center justify-center`,
  input: `w-full p-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent`,
  button: `p-2 bg-[#2980b9] text-slate-100 hover:bg-[#3498db] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent`,
}
function App() {

  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState('');

  // create todo
  const createTodo = async(e) => {
    e.preventDefault();
    const text = e.target[0].value
    if (text === '') return
    await addDoc(collection(db, 'todos'), {
      text,
      completed: false
    })
    e.target[0].value = ''
  }

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = []  
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() })
      })
      setTodos(todos)
    })
    return unsubscribe 
  }, [])

  // update todo
  const toggleComplete = async(todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }
  // delete todo
  const deleteTodo = async(todo) => {
    await deleteDoc(doc(db, 'todos', todo.id))
  }
  // edit todo
  const editTodo = async(todo) => {
    const text = prompt('Edit todo', todo.text)
    if (text === null) return
    await updateDoc(doc(db, 'todos', todo.id), {
      text
    })
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h1 className={style.title}>Todo App</h1>
        <form onSubmit={createTodo} className={style.form}>
          <input className={style.input} value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Add a todo" />
          <button className={style.button} type="submit">
            <AiOutlinePlus size={30}/>
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>
          ))}
        </ul>
        <p className={style.count}>you have {todos.length} todos</p>
      </div>
    </div>
  )
}

export default App
