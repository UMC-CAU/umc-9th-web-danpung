import { useDark } from "../context/Darkmode";

const DarkmodeButton = () => {
  const { isdark, toggleDark } = useDark();


  return <button onClick={toggleDark}>{isdark ? "☀️" : "🌙"}</button>;
};
export default DarkmodeButton;
