import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useTodosStore } from "@/store";

import styles from "@/styles/TodoItem.module.scss";

const TodoItem = ({ itemProp }) => {
  const handleChange = useTodosStore((state) => state.handleChange);
  const delTodo = useTodosStore((state) => state.delTodo);
  const setUpdate = useTodosStore((state) => state.setUpdate);

  const editInputRef = useRef(null);
  const [editing, setEditing] = useState(false);

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const handleEditing = () => {
    setEditing(true);
  };

  let viewMode = {};
  let editMode = {};
  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setUpdate(editInputRef.current.value, itemProp.id);
      setEditing(false);
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.content} style={viewMode}>
        <input
          type="checkbox"
          checked={itemProp.completed}
          onChange={() => handleChange(itemProp.id)}
        />

        <button onClick={handleEditing}>
          <AiFillEdit style={{ color: "#5e5e5e", fontSize: "16px" }} />
        </button>

        <button onClick={() => delTodo(itemProp.id)}>
          <FaTrash style={{ color: "#5e5e5e", fontSize: "16px" }} />
        </button>

        <span style={itemProp.completed ? completedStyle : null}>
          {itemProp.title}
        </span>
      </div>
      <input
        type="text"
        className={styles.textInput}
        ref={editInputRef}
        defaultValue={itemProp.title}
        style={editMode}
        onKeyDown={handleUpdatedDone}
      />
    </li>
  );
};
export default TodoItem;

// alternatively: without using useRef hook
// const TodoItem = ({ itemProp, setTodos, delTodo, setUpdate }) => {
//   const [updateInput, setUpdateInput] = useState(itemProp.title);
//   const [editing, setEditing] = useState(false);

//   const completedStyle = {
//     fontStyle: "italic",
//     color: "#595959",
//     opacity: 0.4,
//     textDecoration: "line-through",
//   };

//   const handleChange = (id) => {
//     setTodos((prevState) =>
//       prevState.map((todo) => {
//         if (todo.id === id) {
//           return {
//             ...todo,
//             completed: !todo.completed,
//           };
//         }
//         return todo;
//       })
//     );
//   };

//   const handleEditing = () => {
//     setEditing(true);
//   };

//   let viewMode = {};
//   let editMode = {};
//   if (editing) {
//     viewMode.display = "none";
//   } else {
//     editMode.display = "none";
//   }

//   const handleUpdatedDone = (event) => {
//     if (event.key === 'Enter') {
//       setUpdate(updateInput, itemProp.id);
//       setEditing(false);
//     }
//   };

//   return (
//     <li className={styles.item}>
//       <div className={styles.content} style={viewMode}>
//         <input
//           type="checkbox"
//           checked={itemProp.completed}
//           onChange={() => handleChange(itemProp.id)}
//         />
//         <button onClick={handleEditing}>Edit</button>
//         <button onClick={() => delTodo(itemProp.id)}>Delete</button>
//          <span style={itemProp.completed ? completedStyle : null}>
//           {updateInput}
//         </span>
//       </div>
//       <input
//         type="text"
//         value={updateInput}
//         className={styles.textInput}
//         style={editMode}
//         onChange={(e) => setUpdateInput(e.target.value)}
//         onKeyDown={handleUpdatedDone}
//       />
//     </li>
//   );
// };
// export default TodoItem;
