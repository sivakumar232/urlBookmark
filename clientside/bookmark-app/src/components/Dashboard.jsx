import React from 'react';
import Sidebar from './Sidebar';
import Dashnav from './Dashnav';
import { Trash } from 'lucide-react';
import { useTheme } from 'next-themes';
import axios from 'axios';
import { useBookmarks } from '../context/BookmarkContext';
const Dashboard = () => {
  const { darkmode } = useTheme();
  const { bookmarks, deleteBookmark } = useBookmarks();

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/bookmarks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    deleteBookmark(id);  // ✅ update UI via context
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <Sidebar />
      <Dashnav />
      <div className='ml-0 md:ml-64 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6'>
        {bookmarks.map((mark) => (
          <div
            key={mark._id}
            className='p-6 border dark:border-gray-600 rounded dark:bg-slate-900 dark:text-white group shadow-md hover:scale-102 transition duration-300 border-black'
          >
            <h2 className='text-xl font-bold font-ubuntu'>{mark.title}</h2>
            <div className='relative flex gap-3 opacity-0 group-hover:opacity-100 bottom-8 left-80'>
              <Trash
                onClick={() => handleDelete(mark._id)}
                className='cursor-pointer h-4 w-4'
              />
            </div>
            <a  
              className='text-sm text-blue-900 relative bottom-5'
              href={mark.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
