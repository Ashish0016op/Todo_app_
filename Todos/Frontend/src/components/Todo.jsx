import axios from "axios";
import React, { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", category: "non-urgent" });
  const [todos, setTodos] = useState([]);

  const addTask = async(e) => {
    e.preventDefault();
    if (task.title.trim() === "") return;
    setTodos([...todos, { ...task, id: Date.now() }]);
    setTask({ title: "", description: "", dueDate: "", category: "non-urgent" });

    try{
      const res=await axios.post('http://localhost:5004/addTodo',task);
      console.log(res,'res');

    }catch(err){
      console.log(err);
    }
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTask = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTask(todoToEdit);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      <form onSubmit={addTask} className="flex flex-col gap-2">
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="p-2 border border-gray-300 rounded"
          placeholder="Enter title..."
          required
        />
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="p-2 border border-gray-300 rounded"
          placeholder="Enter description (optional)..."
        ></textarea>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={task.category}
          onChange={(e) => setTask({ ...task, category: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="non-urgent">Non-Urgent</option>
          <option value="urgent">Urgent</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {task.id ? "Update" : "Add"}
        </button>
      </form>
      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="p-2 border-b border-gray-200 flex justify-between items-center">
            <div>
              <strong>{todo.title}</strong>
              <p className="text-sm">{todo.description}</p>
              {todo.dueDate && <p className="text-xs text-gray-500">Due: {todo.dueDate}</p>}
              <span className={`text-xs font-bold ${todo.category === "urgent" ? "text-red-500" : "text-green-500"}`}>
                {todo.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editTask(todo.id)} className="text-yellow-500">Edit</button>
              <button onClick={() => deleteTask(todo.id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;