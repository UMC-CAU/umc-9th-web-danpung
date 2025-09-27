import { Router } from "./components/Router";
import { Link } from "./components/Link";
import { About } from "./components/About";
import { Contact } from "./components/Context";

const App = () => {
  const routes = [
    { path: "/about", component: About },
    { path: "/context", component: Contact },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <nav className="flex gap-4">
        <Link to="/about">소개</Link>
        <Link to="/context">본문</Link>
      </nav>
      <Router routes={routes} />
    </div>
  );
};
export default App;
