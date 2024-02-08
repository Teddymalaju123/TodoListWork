import React, { useState, useEffect } from "react";
import { VscTrash } from "react-icons/vsc";

const Todo = ({ todo, onUpdate, todos, setTodos }) => {
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

  return (
    <div className="todo-item">
      <div
        className={`border-2 border-black size-52 ${
          isChecked ? "bg-green-100" : ""
        }`}
      >
        <div className="ml-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div>{todo.text}</div>
          <div className="flex justify-between mt-32">
            <div>{todo.updatedAt}</div>
            <div></div>
            <VscTrash
              className="remove mt-1 mr-4 w-1/12 bg-red-300 border-2 border-black "
              onClick={handleRemoveClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
