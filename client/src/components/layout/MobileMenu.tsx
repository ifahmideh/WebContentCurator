import { Link, useLocation } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const [location] = useLocation();
  
  if (!isOpen) return null;
  
  // Determine active link based on current location
  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <div className="sm:hidden" id="mobile-menu">
      <div className="pt-2 pb-3 space-y-1">
        <Link href="/">
          <a className={`${
            isActive('/') 
              ? 'bg-[#F5F5F5] text-[#2D2D2D] border-l-4 border-[#007AFF]' 
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 border-l-4'
            } block pl-3 pr-4 py-2 text-base font-medium`}
          >
            Home
          </a>
        </Link>
        <Link href="/data">
          <a className={`${
            isActive('/data') 
              ? 'bg-[#F5F5F5] text-[#2D2D2D] border-l-4 border-[#007AFF]' 
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 border-l-4'
            } block pl-3 pr-4 py-2 text-base font-medium`}
          >
            Data
          </a>
        </Link>
        <Link href="/settings">
          <a className={`${
            isActive('/settings') 
              ? 'bg-[#F5F5F5] text-[#2D2D2D] border-l-4 border-[#007AFF]' 
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 border-l-4'
            } block pl-3 pr-4 py-2 text-base font-medium`}
          >
            Settings
          </a>
        </Link>
        <Link href="/about">
          <a className={`${
            isActive('/about') 
              ? 'bg-[#F5F5F5] text-[#2D2D2D] border-l-4 border-[#007AFF]' 
              : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 border-l-4'
            } block pl-3 pr-4 py-2 text-base font-medium`}
          >
            About
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
