import React, { useState, useEffect } from "react";
import Todo from "./Component/Todolist";
import ButtonAdd from "./Component/ButtonAdd";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodosJSON = localStorage.getItem("todos");
    if (storedTodosJSON) {
      const storedTodos = JSON.parse(storedTodosJSON);
      setTodos(storedTodos);
    }
  }, []);

  const handleUpdateTodo = (id, completed) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleRemoveClick = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        text: inputValue,
        updatedAt: new Date().toISOString().slice(0, 10),
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setInputValue("");
    }
  };

  return (
    <div className="App">
      <div className="card flex justify-center mr-5 mt-5 ml-5 pb-5 border-2 border-black">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-6">
            <header className="App-header mt-2 mb-2 font-serif">Todo List</header>
            <div>
              <input
                className="font-serif border-2 border-black mb-2 w-9/12 pl-2"
                type="text"
                placeholder="type something...."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <ButtonAdd onClick={handleAddTodo} />
            </div>
            <div className="todos-container flex justify-center font-sans">
              <div className="grid grid-cols-2 gap-3">
                {todos.map((todo) => (
                  <div key={todo.id} className="card">
                    <Todo
                      todo={todo}
                      onUpdate={handleUpdateTodo}
                      onRemove={handleRemoveClick}
                      todos={todos}
                      setTodos={setTodos}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
