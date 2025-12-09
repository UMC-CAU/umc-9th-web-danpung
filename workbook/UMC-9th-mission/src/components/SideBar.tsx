interface SideBarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const SideBar = ({ isOpen, closeSidebar }: SideBarProps) => {
  return (
    <div>
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-0 left-0 h-full w-64 bg-yellow-500 text-white p-4
                       transition-transform transform z-40"
          >
            <ul className="flex flex-col gap-y-10">
              <li>검색</li>
              <li>내정보</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
