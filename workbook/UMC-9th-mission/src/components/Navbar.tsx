import { useToken } from '../Context/TokenContext';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLogout } from '../components/LogoutMutation';

interface NavbarProps {
  sidebarOpen: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({ sidebarOpen, searchTerm, setSearchTerm }: NavbarProps) => {
  const { token, userMe } = useToken();
  const [showSearch, setShowSearch] = useState(false);

  const logoutMutation = useLogout();

  const links = token
    ? [
        {
          path: '/v1/users/me',
          label: userMe ? `${userMe.name}님 환영합니다` : '내 정보',
        },
        {
          path: '#',
          label: '로그아웃',
          onClick: () => logoutMutation.mutate(),
        },
      ]
    : [
        { path: '/login', label: '로그인' },
        { path: '/signup', label: '회원가입' },
      ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex justify-between items-center px-8 font-bold 
              transition-all duration-300 
              z-20
              ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}
    >
      <NavLink to="/" className="text-black text-lg">
        돌돌돌돌 LP판
      </NavLink>

      <div className="flex items-center gap-2">
        {showSearch && (
          <input
            type="text"
            placeholder="검색어 입력..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-1 rounded-lg focus:outline-none focus:border-yellow-500"
          />
        )}
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white shadow-md hover:scale-110"
        >
          <Search size={20} />
        </button>

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
                  isActive ? 'text-yellow-500' : ''
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
