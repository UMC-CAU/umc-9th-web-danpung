import "./App.css";
import Darkbutton from "./components/Darkbutton";
import { useDark } from "./context/Darkmode";

function App() {
  const { isdark } = useDark();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isdark ? "bg-white" : "bg-black"
      }`}
    >
      <h1
        className={`text-3xl font-bold ${isdark ? "text-black" : "text-white"}`}
      >
        다크모드 구현
      </h1>
      <Darkbutton />
    </div>
  );
}

export default App;
