import React, { useState, useEffect } from "react";
import { VscTrash } from "react-icons/vsc";

const TodoList = ({ todo, onUpdate, todos, setTodos }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(todo.completed);
  }, [todo.completed]);

  const handleCheckboxChange = () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    onUpdate(todo.id, updatedChecked);
  };

  const handleRemoveClick = () => {
    const updatedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const formateDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div className="todo-item">
      <div
        className={`border-2 border-black ${isChecked ? "bg-green-100" : ""}`}
      >
        <div className="ml-2 w-full pb-4 ">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span> {todo.text}</span>
          <span> {formateDate(todo.updatedAt)}</span>

          <VscTrash
            className="remove bg-red-300 border-2 border-black size-6 "
            onClick={handleRemoveClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
