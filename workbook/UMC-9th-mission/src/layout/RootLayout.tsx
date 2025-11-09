// RootLayout.tsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import FloatingButton from "../components/FloatingButton";

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 768);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  useEffect(() => {
    const handleResize = () => {
      const mdUp = window.innerWidth >= 768;
      setIsMdUp(mdUp);
      if (mdUp) setIsOpen(true);
      else setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen && isMdUp ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {/* Navbar에 검색 상태 전달 */}
        <Navbar
          sidebarOpen={isOpen && isMdUp}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="p-6 mt-16">
          {/* Outlet에서 필요한 페이지(Finding)에서도 검색 상태를 사용 */}
          <Outlet context={{ searchTerm, setSearchTerm }} />
        </div>

        <FloatingButton />
      </div>
    </div>
  );
};

export default RootLayout;
