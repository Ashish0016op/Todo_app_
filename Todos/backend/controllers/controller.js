const userModal = require("../Modal/user");
const todosModel = require("../Modal/todo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PostUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("req,.dy", req.body);
    const userExisted = await userModal.findOne({ email: email });
    if (userExisted) {
      return res.status(201).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const resposne = await userModal.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return res.status(200).json({ user: resposne });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("req,", req.body);
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    await user.save();

    return res.status(200).json({ message: "Login successful",user:user });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTodo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const allTodo = await todosModel.find({ userId: userId });
    res.status(200).json({ todos: allTodo });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, description, dueDate, category, userId } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = await todosModel.create({
      title,
      description,
      date: dueDate,
      category,
      userId
    });
    
    res.status(201).json({ message: "To-Do added successfully", todo: newTodo });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, dueDate, category, userId } = req.body;
    
    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const todo = await todosModel.findOne({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const updatedTodo = await todosModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: { title, description, date: dueDate, category } },
      { new: true }
    );

    res.status(200).json({ message: "To-Do updated successfully", todo: updatedTodo });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    const todo = await todosModel.findOneAndDelete({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  PostUser,
  LoginUser,
  addTodo,
  updateTask,
  getAllTodo,
  deleteTask,
};
