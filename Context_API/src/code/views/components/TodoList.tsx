import * as React from "react";
import { useTodo } from "../context/TodoContext";
import styles from "../styles/TodoList.module.scss"; 

const TodoList: React.FC = () => {
  const { todos, updateTodo, deleteTodo } = useTodo();

  const [editId, setEditId] = React.useState<string | null>(null);
  const [editMsg, setEditMsg] = React.useState<string>("");

  const startEdit = (id: string, currentMsg: string): void => {
    setEditId(id);
    setEditMsg(currentMsg);
  };

  const cancelEdit = (): void => {
    setEditId(null);
    setEditMsg("");
  };

  const saveEdit = (id: string): void => {
    if (editMsg.trim() !== "") {
      updateTodo(id, editMsg.trim());
    }
    cancelEdit();
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {todos && todos.length > 0 ? (
          todos.map(({ msg, id }) => (
            <li key={id} className={styles.listItem}>
              {editId === id ? (
                <>
                  <input
                    type="text"
                    value={editMsg}
                    onChange={(e) => setEditMsg(e.target.value)}
                    className={styles.input}
                  />
                  <div className={styles.buttons}>
                    <button onClick={() => saveEdit(id)} className={`${styles.button} ${styles.save}`}>
                      Save
                    </button>
                    <button onClick={cancelEdit} className={`${styles.button} ${styles.cancel}`}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className={styles.text}>{msg}</span>
                  <div className={styles.buttons}>
                    <button onClick={() => startEdit(id, msg)} className={`${styles.button} ${styles.edit}`}>
                      Edit
                    </button>
                    <button onClick={() => deleteTodo(id)} className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li className={styles.empty}>No todos found.</li>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
