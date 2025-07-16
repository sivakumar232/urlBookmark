import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // or any icon library
import { BookmarkIcon } from 'lucide-react';
import Recent from './Recent';
import { useTheme } from '@/context/Themecontext';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const{darkMode}=useTheme();

  const navItems = [
    { name: 'All Bookmarks', path: '/dashboard' },
    { name: 'Recent', path: '/recent' },
    { name: 'Stared', path: '/Stared' },
    { name: 'Logout', path: '/logout' },
  ];

  return (
    <div className="flex  h-30 ">
      <button
        className="md:hidden p-4 text-black z-50"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white z-20 dark:bg-black dark:text-white shadow-lg h-screen text-white w-64 min-h-screen p-6 space-y-4 fixed top-0 left-0 transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}
      >
        <h2 className="text-xl text-black dark:bg-black dark:text-white font-roboto font-semi  bold mb-6 flex space-x-4 font-raleway">< BookmarkIcon className=' relative h-6 w-6'/>Bookmarks</h2>

        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block px-4 text-black py-2 dark:bg-black dark:text-white hover:bg-gray-100  rounded-lg  transition 
              ${location.pathname === item.path ? 'text-gray-900 bg-gray-100 border-l-3 dark:bg-slate-900 border-cyan-500 font-semibold' : ''}`}
            onClick={() => setOpen(false)} // close on mobile click
          >
            {item.name}
          </Link> 
        ))}
      </aside>
    </div>
  );
};

export default Sidebar;