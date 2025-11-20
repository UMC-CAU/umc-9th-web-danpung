import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isDelete: boolean;
  setIsDelete: (value: boolean) => void;
}

const SideBar = ({
  isOpen,
  setIsOpen,
  isDelete,
  setIsDelete,
}: SideBarProps) => {
  const navigate = useNavigate();
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 768);

  useEffect(() => {
    if (isMdUp) setIsOpen(true);
  }, [isMdUp]);

  const sidebarVisible = isMdUp ? true : isOpen;

  return (
    <div>
      {!isMdUp && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-4 left-4 z-50 p-2 shadow rounded ${
            isOpen ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-white'
          }`}
        >
          <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M4 8h24M4 16h24M4 24h24"
            />
          </svg>
        </button>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-40 transition-transform duration-300 ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-4 p-6 pt-32">
          <li
            className="cursor-pointer hover:text-yellow-500"
            onClick={() => navigate('/search')}
          >
            검색
          </li>
          <li
            className="cursor-pointer hover:text-yellow-500"
            onClick={() => navigate('/v1/users/me')}
          >
            내 정보
          </li>
          <ul className="flex fixed bottom-0 mb-10 ml-3 hover:text-yellow-500 cursor-pointer">
            <li onClick={() => setIsDelete(!isDelete)}>탈퇴하기</li>
          </ul>
        </ul>
      </div>

      {!isMdUp && isOpen && (
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}
    </div>
  );
};

export default SideBar;
