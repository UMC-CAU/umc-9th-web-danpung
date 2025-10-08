import { NavLink } from "react-router-dom";

const links = [
  { path: "/", label: "돌돌돌돌 LP판" },
  { path: "/login", label: "로그인" },
  { path: "/signup", label: "회원가입" },
];

const Navbar = () => {
  return (
    <nav className="flex justify-between items-start mt-10 px-20 font-bold">
      <NavLink to="/" className="text-black text-lg">
        돌돌돌돌 LP판
      </NavLink>

      <div className="flex gap-6">
        {links
          .filter((link) => link.label !== "돌돌돌돌 LP판")
          .map((link) => (
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
      </div>
    </nav>
  );
};

export default Navbar;
