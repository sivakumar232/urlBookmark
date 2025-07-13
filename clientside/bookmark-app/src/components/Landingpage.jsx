import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';

const Landingpage = () => {
  const [Darkmode, Setdarkmode] = useState(false);

  const handlemode = () => {
    Setdarkmode(prev => !prev);
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Navbar */}
        <nav className="w-full flex flex-wrap justify-between items-center px-4 sm:px-6 md:px-16 py-4 absolute top-0 z-10">
          <h1 className="font-bold font-roboto text-xl text-left text-black dark:text-white">Markio</h1>

          <div className="flex flex-wrap items-center gap-3 mt-3 sm:mt-0">
            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-2 px-2">
              <p className="text-sm sm:text-base text-black dark:text-white">{Darkmode ? 'Light mode' : 'Dark mode'}</p>
              <Switch onClick={handlemode} />
            </div>

            {/* Login & Signup Buttons */}
            <Link to="/login">
              <button className="text-black font-bold px-4 py-2 font-lato rounded hover:scale-105 transition bg-white">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-black text-white px-4 py-2 rounded font-roboto transition duration-300">
                Signup
              </button>
            </Link>
          </div>
        </nav>
        
        {/* Hero Section */}
        <div className="mt-20 text-center px-2  sm:px-4">
          <h1 className="text-3xl sm:text-5xl  md:text-6xl font-bold leading-tight font-poppins mb-6 text-black dark:text-white">
            The Bookmarking Tool for <br className="hidden sm:block" />
            Modern Creators
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-raleway mb-8">
            Save links, organize them in collections, and share what you love
            <br className="hidden sm:block" />
            all from one beautiful, distraction-free space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
