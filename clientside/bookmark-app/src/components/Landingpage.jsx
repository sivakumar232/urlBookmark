import React from 'react'
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';
const Landingpage = () => {
  
return (
  <div className='relative min-h-screen'>

    <div className="flex flex-col items-center justify-center min-h-screen">
      <nav>
        <div className='space-x-4 absolute top-5 left-25'>
          <h1 className='font-bold font-roboto text-xl'>Markio</h1>
        </div>
        <div className="space-x-4 absolute top-5 flex right-12">
        <Link to="/login">
          <button className="  text-black text-bold px-4 py-2 font-lato rounded hover:scale-105  transition duration-300">
            Login

          </button>
        </Link>
        <Link to="/signup">
          <button className="group relative bg-black text-white px-4 py-2 rounded font-roboto   transition duration-300">
            Signup
           
          </button>
        </Link>
      </div>
      </nav>
      <div className='relative  flex flex-col items-center justify-center bottom-20'>
      <h1 className="text-6xl  font-bold space-y-5 text-center leading-tight  font-poppins  font mb-6">
        The Bookmarking Tool for <br/>Modern Creators</h1>
      <p className="text-xl text-slate-600 font-raleway text-center mb-8">Save links, organize them in collections, and share what you love <br/>all from one beautiful, distraction-free space.
</p>
      </div>
      
    </div>
    </div>
  );  
}

export default Landingpage