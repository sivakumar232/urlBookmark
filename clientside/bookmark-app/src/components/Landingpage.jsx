import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Zap } from 'lucide-react';
import { Star } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { MousePointerClick } from 'lucide-react';




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
        <div className=" mt-45 text-center px-2 space-y-5 sm:px-4">
          <button className='bg-black text-white px-6 py-1 mx-auto rounded-full font-lato flex items-center transition duration-300'><Zap className='h-4 mr-2 w-4' />
            Save Time & Stay Organized</button>
          <h1 className="text-3xl sm:text-5xl  md:text-6xl font-bold leading-tight font-poppins mb-6 text-black dark:text-white">
            Never Lose a Great <br className="hidden sm:block" />
            Link Again
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-raleway mb-8">
            Save links, organize them in collections, and share what you love
            <br className="hidden sm:block" />
            all from one beautiful, distraction-free space.
          </p>
          <div className='space-x-5'>
            <button className='border p-3 bg-black text-white rounded'>Get Started</button>
            <button className='border p-3 bg-neutral-100 text-black rounded'>Watch Demo</button>
          </div>
        </div>
        <div className='relative top-30 w-full border bt-3 '></div>
        <div className='text-center relative top-30 sm:top-55 px-2 space-y-5 mb-10 sm:px-4'>
          <button className='bg-black text-white rounded-full mt-5 p-1 px-4'>Features</button>
          <h1 className='text-3xl sm:text-5xl  md:text-6xl font-bold leading-tight font-poppins mb-6 text-black dark:text-white'>Everything you need to organize the web</h1>
          <p className='text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-raleway mb-8'>Powerful features designed to make bookmark management effortless and efficient.</p>
          <div className='gap-5 space-y-5  px-4 mb-10 rounded grid grid-cols-1 sm:grid-cols-3'>
            <div className='border px-6 py-4 h-50 space-y-3 rounded  cursor-pointer shadow-md  hover:scale-105 transition duration-300'>
              <h1 className='font-bold text-2xl font-montserrat text-left flex gap-4 items-center'><Star className='font-light' />Favorite Links</h1>
              <p className='text-slate-600 text-sm sm:text-base dark:text-slate-300 text-left font-raleway mb-8'>
                Star your most important bookmarks to keep them easily accessible at the top of your list or in a dedicated favorites section. </p>
            </div>
            <div className='border px-6 space-y-3 py-4 h-50 rounded   cursor-pointer shadow-md hover:scale-105 transition duration-300'>
              <h1 className='font-bold text-2xl font-montserrat flex items-center gap-4 text-left'><ExternalLink />Link Preview</h1>
              <p className='text-slate-600 text-sm sm:text-base dark:text-slate-300 text-left font-raleway mb-8'>
                Make your bookmarks more informative and visually engaging. With automatic link previews, each saved URL displays the website title, favicon, and a short description.
              </p>
            </div>
            <div className='border px-6 py-4 h-50 rounded  cursor-pointer shadow-md hover:scale-105 transition duration-300 '>
              <h1 className='font-bold text-2xl font-montserrat text-left flex items-center gap-4'><MousePointerClick />One-Click Save</h1>
              <p className='text-slate-600 text-sm sm:text-base dark:text-slate-300 text-left font-raleway mb-8'>Save any webpage instantly with just one click. Whether you're browsing through articles, tools, or tutorials, our bookmarker lets you capture links without breaking your flow.</p>
            </div>
          </div>


        </div>
        <div className='relative top-20 sm:top-50 w-full border  '></div>
        <div className='text-center relative top-30 sm:top-55 px-2 space-y-8 mb-40 sm:px-4'>
          <h1 className='text-3xl sm:text-5xl  md:text-6xl font-bold leading-tight font-poppins mb-6 text-black dark:text-white'>Get Started with 3 simple steps</h1>
          <div className='grid grid-cols-1 sm:grid-cols-3'>
            <div className='mt-5'>
              <button className='w-20 h-20 bg-black text-white rounded-full mb-4 mt-5'><h1 className='text-2xl '>1</h1></button>
              <h1 className='text-2xl font-roboto font-bold mb-4'>Install Extension</h1>
              <p className='text-slate-600 text-sm sm:text-base dark:text-slate-300 text-center font-raleway'>Add our browser extension to chrome ,Firefox in seconds</p>
            </div>
            <div >
              <button className='w-20 h-20 bg-black text-white rounded-full mb-4 mt-5'><h1 className='text-2xl '>2</h1></button>
              <h1 className='text-2xl font-roboto font-bold mb-4'>Save Bookmarks</h1>
              <p className='text-slate-600 text-sm sm:text-base dark:text-slate-300 text-center font-raleway'>Click the Bookmark button on any page to save it without automatic laggin</p>
            </div>
            <div >
              <button className='w-20 h-20 bg-black text-white rounded-full mb-4 mt-5'><h1 className='text-2xl '>3</h1></button>
              <h1 className='text-2xl font-roboto font-bold mb-4'>Find & Organize</h1>
              <p className='text-slate-600 text-sm sm:text-base dark:text-slate-300 text-center font-raleway'>Search,organize and access your bookmarks from anywhere, anytime</p>
            </div>
          </div>
        </div>
        <div className='relative top-30 sm:top-70 w-full border '></div>


      </div>
    </div>
  );
};

export default Landingpage;
