import React from 'react'
import { Link } from 'react-router-dom';
const Landingpage = () => {
  
return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6"> Welcome to URL Bookmark</h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </Link>
        <Link to="/signup">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Signup</button>
        </Link>
      </div>
    </div>
  );  
}

export default Landingpage