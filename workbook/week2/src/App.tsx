import Inputbox from "./components/Inputbox";
import Todobox from "./components/Todobox";
import Donebox from "./components/Donebox"
function App() {
  return (
    <div className="todo-container">
      <div className="todo-container__header"><h1>GUNS TODO</h1></div>
      <Inputbox/>
      <div className="render-container">
        <div className="render-container__section">
          <h3 className="render-container__title">할 일</h3>
          <Todobox/>
        </div>
        <div className="render-container__section">
          <h3 className="render-container__title">완료</h3>
          <Donebox/>
        </div>
      </div>
    </div>
  );
}

export default App;