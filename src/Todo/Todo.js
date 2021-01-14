import React, { useState, useEffect } from "react";

export default function Todo(props) {
  const [todo, setTodo] = useState();
  const [showInput, setShowInput] = useState();

  useEffect(() => {
    setTodo(props.list);
  }, [props.id, props.list]);

  function handleDragStart(event) {
    event.target.classList.add("drag");
  }

  function handleDragOver(event) {
    event.stopPropagation();
  }

  function handleDragEnd(event) {
    event.target.classList.remove("drag");
  }

  function dropHandler(event) {
    // document.querySelectorAll("list").addEventListener("drop")
    event.preventDefault();
    const div = document.querySelector(".drag");
    event.target.appendChild(div);
    console.log(event);
    // console.log(event.target.parent);
  }
  function dragOverHandler(event) {
    event.preventDefault();
    // const div = document.querySelector(".drag");
    // const container = document.querySelectorAll(".list");
    // container.appendChild(div);
  }

  function addTodoClick() {
    setShowInput(true);
  }

  function deleteListHandler() {
    props.deleteList(props.id);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    props.addTodo({
      id: todo.id,
      name: todo.name,
      todo: todo.todo.concat(event.target[`new-todo`].value),
    });
    event.target[`new-todo`].value = "";
    setShowInput(false);
  }

  return (
    <>
      {todo && (
        <div className="list" onDrop={dropHandler} onDragOver={dragOverHandler}>
          <h5 className="list-title">
            {todo.name}
            <span
              className="options"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ...
            </span>
            <ul className="dropdown-menu">
              <p className="dropdown-item">
                <i className="fas fa-edit"></i> Edit Title
              </p>
              <p className="dropdown-item" onClick={deleteListHandler}>
                <i className="fas fa-trash"></i> Delete List
              </p>
            </ul>
          </h5>
          {todo.todo.map((item, index) => (
            <div
              key={index}
              id={todo.id}
              className="list-item"
              draggable="true"
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            >
              {item}
            </div>
          ))}
          {showInput && (
            <div className="list-item">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="input-item"
                  id="new-todo"
                  placeholder="Enter todo here"
                ></input>
                <button className="add-btn" type="submit"></button>
              </form>
            </div>
          )}

          <div className="list-item  list-item-add" onClick={addTodoClick}>
            + Add another card
          </div>
        </div>
      )}
    </>
  );
}
