import React, { useState, useEffect } from "react";
import Todo from "./Component/Todolist";
import ButtonAdd from "./Component/ButtonAdd";
import { CiViewList } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import TodoList from "./Component/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isShowingTodoList, setIsShowingTodoList] = useState(true);
  const [isTodoListSelected, setIsTodoListSelected] = useState(false);
  const [isTodoSelected, setIsTodoSelected] = useState(false);

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
        updatedAt: new Date().toISOString(),
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setInputValue("");
    }
  };

  const handleShowTodoList = () => {
    setIsTodoListSelected(true);
    setIsTodoSelected(false);
    setIsShowingTodoList(true);
  };

  const handleShowTodo = () => {
    setIsTodoListSelected(false);
    setIsTodoSelected(true);
    setIsShowingTodoList(false);
  };

  return (
    <div className="App">
      <div className="card flex justify-center mr-5 mt-5 ml-5 pb-5 border-2 border-black">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-6">
            <div>
              <header className="App-header flex justify-between mt-2 mb-2 font-serif">
                Todo List
                <div className="flex justify-end border-2 border-black ">
                  <CiViewList
                    className={`size-6 ${
                      isTodoListSelected ? "hover:bg-amber-300" : ""
                    }`}
                    onClick={handleShowTodoList}
                  />
                  <IoGrid
                    className={`size-6 ${
                      isTodoSelected ? "hover:bg-amber-300" : ""
                    }`}
                    onClick={handleShowTodo}
                  />
                </div>
              </header>
            </div>

            <div>
              <input
                className="font-serif border-2 border-black mb-2 w-7/12 pl-2"
                type="text"
                placeholder="type something...."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <ButtonAdd onClick={handleAddTodo} />
            </div>
            <div className="todos-container font-sans">
              <div className="grid grid-cols-1 gap-4">
                {isShowingTodoList ? (
                  todos.map((todo) => (
                    <div key={todo.id} className="card">
                      <TodoList
                        todo={todo}
                        onUpdate={handleUpdateTodo}
                        onRemove={handleRemoveClick}
                        todos={todos}
                        setTodos={setTodos}
                      />
                    </div>
                  ))
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
