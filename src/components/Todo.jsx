import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Success } from "../utils/toastStyles";

const Todo = ({ id, index, content, deleteTodo }) => {
  const [strike, setStrike] = useState(false);

  const setStrikeThrough = (e) => {
    setStrike(!strike);
    toast.success(!strike ? "Marked done" : "Marked undone", Success);
  };

  const deleteHandler = (e) => {
    deleteTodo(e.target.id);
  };

  return (
    <div className="container w-50 mt-1">
      <div className={`card  ${strike ? "done" : "undone"}`}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div className="card-body col-sm-8 d-flex gap-3">
            <h5>{index}.</h5>
            <h5 className="card-title">
              {strike ? <s>{content}</s> : content}
            </h5>
          </div>
          <div className="card-body d-flex flex-row justify-content-around">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic checkbox toggle button group"
            >
              <input
                type="checkbox"
                className="btn-check"
                id={`buttoncheck` + id}
                autoComplete="off"
                onClick={(e) => setStrikeThrough(e)}
              />
              <label
                className="btn btn-outline-primary"
                htmlFor={`buttoncheck` + id}
              >
                {strike ? "Undone" : "Done"}
              </label>
            </div>

            <button
              type="button"
              id={id}
              className="btn btn-danger"
              onClick={(e) => {
                deleteHandler(e);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
