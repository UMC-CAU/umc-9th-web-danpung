import { useToken } from "../Context/TokenContext"; //냅바
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { token, logout } = useToken();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const links = token
    ? [
        { path: "/v1/users/me", label: "내 정보" },
        { path: "#", label: "로그아웃", onClick: handleLogout },
      ]
    : [
        { path: "/login", label: "로그인" },
        { path: "/signup", label: "회원가입" },
      ];

  return (
    <nav className="flex justify-between items-center mt-10 px-20 font-bold">
      <NavLink to="/" className="text-black text-lg">
        돌돌돌돌 LP판
      </NavLink>

      <div className="flex items-center gap-6">
        {links.map((link) =>
          link.onClick ? (
            <span
              key={link.label}
              onClick={link.onClick}
              className="cursor-pointer text-black hover:text-yellow-500"
            >
              {link.label}
            </span>
          ) : (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-black hover:text-yellow-500 ${
                  isActive ? "text-yellow-500" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
