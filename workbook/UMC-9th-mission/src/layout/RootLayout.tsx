import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import FloatingButton from '../components/FloatingButton';
import DeleteUser from '../components/DeleteUser';
import { Menu } from 'lucide-react';
import { useSidebar } from '../hooks/useSidebar';
const RootLayout = () => {
  const { isOpen, open, close } = useSidebar(false);
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMdUp(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex">
      {!isOpen && (
        <button
          onClick={() => open()}
          className="fixed top-20 left-4 text-black z-100"
        >
          <Menu size={24} />
        </button>
      )}

      <SideBar isOpen={isOpen} closeSidebar={close} />

      {isDelete && <DeleteUser isDelete={isDelete} setIsDelete={setIsDelete} />}

      <div
        className={`flex-1 transition-all duration-500 ${
          isOpen && isMdUp ? 'md:ml-64' : 'md:ml-0'
        }`}
      >
        <Navbar
          sidebarOpen={isOpen}
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
