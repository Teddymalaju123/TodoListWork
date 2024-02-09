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
    const isConfirmed = window.confirm("ต้องการจะลบรายการนี้ใช่หรือไม่");
    if (isConfirmed) {
      const updatedTodos = todos.filter((item) => item.id !== todo.id);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      alert("ลบรายการเสร็จสิ้น");
    } else {
      alert("ยกเลิกการลบรายการ");
    }
  };

  const formateDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();

    return `${year}/${month}/${day} ${hours}:${minutes}`
  }

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
            <div>{formateDate(todo.updatedAt)}</div>
            <div></div>
            <VscTrash
              className="remove mr-4 mb-6 bg-red-300 border-2 border-black size-6 "
              onClick={handleRemoveClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
