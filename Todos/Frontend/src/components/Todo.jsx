import axios from "axios";
import React, { useState, useEffect } from "react";

const Todo = () => {
  const [task, setTask] = useState({ 
    id: null, 
    title: "", 
    description: "", 
    dueDate: "", 
    category: "non-urgent" 
  });
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:5004";
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/todos`);
      setTodos(res.data.todos);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const addTask = async (taskData) => {
    try {
      const newTask = {
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        category: taskData.category
      };
  
      const response = await axios.post(`${BASE_URL}/addTodo`, newTask);
  
      if (response.data && response.data.todo) { // Ensure correct structure
        setTodos(prevTodos => [...prevTodos, response.data.todo]);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
      
      return true;
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
      return false;
    }
  };
  
  const updateTask = async (taskData) => {
    try {
      const updatedTask = {
        _id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        category: taskData.category,
      };
  
      const response = await axios.put(`${BASE_URL}/updateTodo/${taskData.id}`, updatedTask);
  
      // Update the todos state immediately with the updated task
      if (response.data) {
        setTodos(prevTodos => 
          prevTodos.map(todo => 
            todo._id === taskData.id ? response.data : todo
          )
        );
        await fetchTodos(); // Fetch fresh data to ensure sync
      }
  
      return true;
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
      return false;
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (task.title.trim() === "") return;
    
    setLoading(true);
    const success = task.id !== null 
      ? await updateTask(task)
      : await addTask(task);
      
    if (success) {
      setTask({ id: null, title: "", description: "", dueDate: "", category: "non-urgent" });
    }
    setLoading(false);
  };
  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${BASE_URL}/deleteTodo/${id}`);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const editTask = (todo) => {
    setTask({
      id: todo._id,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate || "",
      category: todo.category
    });
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="p-2 border border-gray-300 rounded"
          placeholder="Enter title..."
          required
          disabled={loading}
        />
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="p-2 border border-gray-300 rounded"
          placeholder="Enter description (optional)..."
          disabled={loading}
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="p-2 border border-gray-300 rounded"
          disabled={loading}
        />
        <select
          value={task.category}
          onChange={(e) => setTask({ ...task, category: e.target.value })}
          className="p-2 border border-gray-300 rounded"
          disabled={loading}
        >
          <option value="non-urgent">Non-Urgent</option>
          <option value="urgent">Urgent</option>
        </select>
        <button 
          type="submit" 
          className={`px-4 py-2 rounded text-white ${
            loading 
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : task.id ? 'Update' : 'Add'}
        </button>
      </form>
      <ul className="mt-4">
        {todos?.map((todo) => (
          <li key={todo._id} className="p-2 border-b border-gray-200 flex justify-between items-center">
            <div>
              <strong>{todo.title}</strong>
              <p className="text-sm">{todo.description}</p>
              {todo.date && <p className="text-xs text-gray-500">Date: {todo.date}</p>}
              <span className={`text-xs font-bold ${todo.category === "urgent" ? "text-red-500" : "text-green-500"}`}>
                {todo.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => editTask(todo)} 
                className="text-yellow-500"
                disabled={loading}
              >
                Edit
              </button>
              <button 
                onClick={() => deleteTask(todo._id)} 
                className="text-red-500"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
