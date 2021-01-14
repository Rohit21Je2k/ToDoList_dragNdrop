import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Todo from "./Todo";
import "./TodoList.css";

export default function TodoList() {
  const [lists, setLists] = useState([]);
  const [change, setChange] = useState();

  useEffect(() => {
    async function getList() {
      const allLists = await localStorage.getItem(`ui-ux_problem`);
      setLists(JSON.parse(allLists));
    }
    getList();
  }, [change]);

  function addListHandler() {
    const newTodo = {
      id: uuid(),
      name: "List Name",
      todo: [],
    };
    const newData = lists ? lists.concat(newTodo) : [newTodo];
    localStorage.setItem(`ui-ux_problem`, `${JSON.stringify(newData)}`);
    setLists(newData);
  }

  function deleteListHandler(id) {
    const newData = lists.filter((list) => list.id !== id);
    localStorage.setItem(`ui-ux_problem`, `${JSON.stringify(newData)}`);
    setLists(newData);
  }

  function addTodoHandler(list) {
    const newData = lists.map((item) => {
      if (item.id === list.id) return list;
      else return item;
    });
    localStorage.setItem(`ui-ux_problem`, `${JSON.stringify(newData)}`);
    setLists(newData);
  }


  return (
    <>
      <div className="board">
        <h1 className="header">To Do List</h1>
        <div>
          <div className="lists">
            {lists &&
              lists.map((list) => (
                <Todo
                  key={list.id}
                  id={list.id}
                  list={list}
                  listChanges={setChange}
                  addTodo={addTodoHandler}
                  deleteList={deleteListHandler}
                />
              ))}

            <div className="add-list" onClick={addListHandler}>
              + Add {lists === null ? null : "another"} card
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
