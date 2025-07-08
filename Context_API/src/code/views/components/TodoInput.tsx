import * as React from 'react';
import { useTodo } from '../context/TodoContext';
import styles from '../styles/TodoInput.module.scss'; 

const TodoInput: React.FC = () => {
  const [msg, setMsg] = React.useState<string>("");

  const { addTodo } = useTodo();

  const add = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(!msg) return;
    addTodo(msg.trim());
    setMsg("");
  };

  return (
    <form onSubmit={add} className={styles.form}>
      <label className={styles.label}>Todo</label>
      <input
        type="text"
        placeholder="Enter a todo message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        className={styles.input}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
};

export default TodoInput;
