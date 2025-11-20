import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import FloatingButton from '../components/FloatingButton';
import DeleteUser from '../components/DeleteUser';

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMdUp(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex">
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
      />

      {isDelete && <DeleteUser isDelete={isDelete} setIsDelete={setIsDelete} />}

      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen && isMdUp ? 'md:ml-64' : 'md:ml-0'
        }`}
      >
        <Navbar
          sidebarOpen={isOpen && isMdUp}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="p-6 mt-16">
          <Outlet context={{ searchTerm, setSearchTerm }} />
        </div>

        <FloatingButton />
      </div>
    </div>
  );
};

export default RootLayout;
