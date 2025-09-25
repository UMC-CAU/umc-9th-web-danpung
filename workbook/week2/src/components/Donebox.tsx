import { useTodo } from "../contexts/TodoContext";

const Donebox = () => {
  const { doneTodo, completeTodo } = useTodo();

  return (
    <ul className="render-container__list">
      {doneTodo.map((t) => (
        <li key={t.id} className="render-container__item">
          <span className="render-container__item-text">{t.text}</span>
          <button className="render-container__item-button" onClick={() => completeTodo(t)}>삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default Donebox;
