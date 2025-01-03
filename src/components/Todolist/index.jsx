import React, { useState, useEffect } from "react";
import './index.css';
import { MdDelete } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


function Todolist() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [category, setCategory] = useState("");
  const [timePeriod, setTimePeriod] = useState("Daily");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("All");
  const [editingId, setEditingId] = useState(null);

  // Load todos and categories from localStorage on initial render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    const savedCategories = JSON.parse(localStorage.getItem("categories"));
    if (savedTodos) setTodos(savedTodos);
    if (savedCategories) setCategories(savedCategories);
  }, []);

  // Save todos and categories to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [todos, categories]);

  const addOrEditTodo = () => {
    if (todoText.trim() === "" || category.trim() === "") {
      alert("TODO text, category, and time period are required!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: todoText,
      category,
      timePeriod,
      completed: false,
    };

    if (editingId) {
      // Edit existing TODO
      setTodos(
        todos.map((todo) =>
          todo.id === editingId
            ? { ...todo, text: todoText, category, timePeriod }
            : todo
        )
      );
      setEditingId(null);
    } else {
      // Add new TODO
      setTodos([...todos, newTodo]);

      // Update categories if necessary
      if (!categories.includes(category)) {
        setCategories([...categories, category]);
      }
    }

    setTodoText("");
    setCategory("");
    setTimePeriod("Daily");
  };

  const startEditing = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTodoText(todoToEdit.text);
      setCategory(todoToEdit.category);
      setTimePeriod(todoToEdit.timePeriod);
      setEditingId(id);
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Filter todos based on category and time period
  const filteredTodos = todos.filter((todo) => {
    const categoryMatch =
      selectedCategory === "All" || todo.category === selectedCategory;
    const timePeriodMatch =
      selectedTimePeriod === "All" || todo.timePeriod === selectedTimePeriod;
    return categoryMatch && timePeriodMatch;
  });

  // Separate todos into completed and uncompleted
  const uncompletedTodos = filteredTodos.filter((todo) => !todo.completed);
  const completedTodos = filteredTodos.filter((todo) => todo.completed);

  return (
    <div className="Todo">

      {/* Input Section */}
      <div className="todo-main-sidebar">
        <div className="todo-main">
      <div className="todo-cont">
        <label>Title: </label>
        <input
          type="text"
          placeholder="Enter TODO"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        </div> <br/>
        <div className="todo-cont">
          <label>Create Category: </label>
          <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        </div> <br/>
        <div className="todo-cont">
          <label>Time Period: </label>
          <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
           >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        </div>
        <div className="todo-cont">
        <button onClick={addOrEditTodo} className="mybtn">
          {editingId ? "Save Changes" : "Add TODO"}
        </button>
        </div> <br/>

      {/* Filters */}
      <div className="todo-cont">
          <label>Filter by Category:</label>
          <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option value="All">All</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        </div> <br/>
        <div className="todo-cont">
        <label>Filter by Time Period:</label>
        <select
          value={selectedTimePeriod}
          onChange={(e) => setSelectedTimePeriod(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="All">All</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        </div> <br/>
      </div>
      </div>

      {/* Uncompleted TODOs */}
      <div className="todo-main-cont">
      <h3>Uncompleted TODOs</h3> <br/>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {uncompletedTodos.map((todo) => (
          <li
            key={todo.id}
            className="list-cont"
          >
            <div>
              <strong>{todo.text}</strong> <em>({todo.category})</em>{" "}
              <span style={{ color: "#6c757d" }}>[{todo.timePeriod}]</span>
            </div>
            <div>
            <MdCheckBox onClick={() => toggleComplete(todo.id)} className="check-icon mr-3"/>
            <FaEdit   onClick={() => startEditing(todo.id)} className="check-icons"/>
            <MdDelete onClick={() => deleteTodo(todo.id)} className="icon" />
            </div>
          </li>
        ))}
      </ul>

      {/* Completed TODOs */}
      <br/> <h3>Completed TODOs</h3> <br/>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {completedTodos.map((todo) => (
          <li
            key={todo.id}
           className="list-cont"
          >
            <div>
              <strong>{todo.text}</strong> <em>({todo.category})</em>{" "}
              <span style={{ color: "#6c757d" }}>[{todo.timePeriod}]</span>
              <span style={{ marginLeft: "10px", color: "green" }}>
                (Completed)
              </span>
            </div>
            <div>
            <MdCheckBox onClick={() => toggleComplete(todo.id)}className="check-icon mr-3"/>
            <MdDelete onClick={() => deleteTodo(todo.id)} className="icon" />
            </div>
          </li>
        ))}
      </ul>
      </div>
      

    </div>
  );
}

export default Todolist;
