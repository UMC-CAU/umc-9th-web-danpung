import { NavLink } from "react-router-dom";

const links = [
  { path: "/", label: "홈" },
  { path: "/popular", label: "인기 영화" },
  { path: "/now-streaming", label: "상영 중" },
  { path: "/rating", label: "평점 높은" },
  { path: "/upcoming", label: "개봉 예정" },
];

const Navbar = () => {
  return (
    <nav className="flex gap-6 ml-20 mt-10 font-bold">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            isActive ? "text-yellow-500" : "text-black"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
