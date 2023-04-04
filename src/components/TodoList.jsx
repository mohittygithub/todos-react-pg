import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Success, Error } from "../utils/toastStyles";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    // setTodos(todos.filter((t) => t.id !== Number(id)));
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      toast.success("Todo Deleted!", Success);
      await getAllTodos();
    } catch (error) {
      toast.error(error.message, Error);
    }
  };

  const addTodoHandler = async (content) => {
    // let num = [];
    // todos.forEach((to) => num.push(to.id));
    // const lastNum = num.slice(-1)[0];
    // setTodos([
    //   ...todos,
    //   { id: Number(lastNum) + 1, content: content, status: "pending" },
    // ]);
    if (content) {
      try {
        await axios.post(`http://localhost:5000/todos`, {
          content,
        });
        toast.success("Todo Added!", Success);
        await getAllTodos();
      } catch (error) {
        toast.error(error.message, Error);
      }
    } else {
      alert("Todo can't be blank");
    }
  };

  const getAllTodos = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/todos`);
      setTodos(data?.todos);
    } catch (error) {
      toast.error(error.message, Error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <>
      <div className="d-flex flex-column text-center">
        <div className="d-flex align-items-center justify-content-around mx-5 my-5">
          <h2>Todos</h2>
          <Modal add={(content) => addTodoHandler(content)} />
        </div>

        {todos.map((todo, index) => (
          <Todo
            key={todo.id}
            id={todo.id}
            index={index + 1}
            content={todo.content}
            deleteTodo={(id) => deleteTodo(id)}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
