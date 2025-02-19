import axios from "axios";
import React, { useState, useEffect } from "react";

const Todo = () => {
  const [task, setTask] = useState({ id: null, title: "", description: "", dueDate: "", category: "non-urgent" });
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5004/todos");
      console.log(res);
      setTodos(res.data.todos);
    } catch (err) {
      console.log(err);
    }
  };

  const addOrUpdateTask = async (e) => {
    e.preventDefault();
    if (task.title.trim() === "") return;
    
    try {
      if (task.id) {
        await axios.put(`http://localhost:5004/updateTodo/${task.id}`, task);
      } else {
        const res = await axios.post("http://localhost:5004/addTodo", task);
        setTodos([...todos, res.data]);
      }
      fetchTodos();
      setTask({ id: null, title: "", description: "", dueDate: "", category: "non-urgent" });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5004/deleteTodo/${id}`);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = (todo) => {
    setTask(todo);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      <form onSubmit={addOrUpdateTask} className="flex flex-col gap-2">
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
        {todos?.map((todo) => (
          <li key={todo._id} className="p-2 border-b border-gray-200 flex justify-between items-center">
            <div>
              <strong>{todo.title}</strong>
              <p className="text-sm">{todo.description}</p>
              {todo.dueDate && <p className="text-xs text-gray-500">Due: {todo.dueDate}</p>}
              <span className={`text-xs font-bold ${todo.category === "urgent" ? "text-red-500" : "text-green-500"}`}>
                {todo.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editTask(todo)} className="text-yellow-500">Edit</button>
              <button onClick={() => deleteTask(todo._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
