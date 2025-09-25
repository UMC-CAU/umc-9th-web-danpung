import { useTodo } from "../contexts/TodoContext";

const Todobox = () => {
  const { todo, deleteTodo } = useTodo();

  return (
    <ul className="render-container__list">
      {todo.map((t) => (
        <li key={t.id} className="render-container__item">
          <span className="render-container__item-text">{t.text}</span>
          <button className="render-container__complete-button" onClick={() => deleteTodo(t)}>완료</button>
        </li>
      ))}
    </ul>
  );
};

export default Todobox;
