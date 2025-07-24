import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Dashnav from './Dashnav';
import { Trash } from 'lucide-react';
import { useTheme } from 'next-themes';
import axios from 'axios';
import { useBookmarks } from '../context/BookmarkContext';
import { ExternalLink } from 'lucide-react';
const Dashboard = () => {
  const { darkmode } = useTheme();
  const { bookmarks, deleteBookmark } = useBookmarks();
  const [linkPreviews, setLinkPreviews] = useState({});

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bookmarks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      deleteBookmark(id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPreviews = async () => {
      const previews = {};
      for (const mark of bookmarks) {
        try {
          const res = await axios.get(`http://localhost:3000/api/preview`, {
            params: { url: mark.url }
          });
          previews[mark._id] = res.data;
        } catch (err) {
          console.log("Error fetching preview for", mark.url, err);
        }
      }
      setLinkPreviews(previews);
    };

    if (bookmarks.length > 0) {
      fetchPreviews();
    }
  }, [bookmarks]);

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <Dashnav />
      <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 p-4 mt-20'>
        {bookmarks.map((mark) => (
          <div
            key={mark._id}
            className='p-6 border dark:border-gray-600 rounded dark:bg-slate-900 dark:text-white group shadow-md hover:scale-102 transition duration-300 border-black'
          >
             <img src={linkPreviews[mark._id]?.image} alt="Source image" />
            <h2 className='text-l font-bold mb-5 font-ubuntu'>{linkPreviews[mark._id]?.title || mark.title}</h2>
            <div className='relative flex gap-3 opacity-0 group-hover:opacity-100 bottom-8 left-80'>
              <Trash
                onClick={() => handleDelete(mark._id)}
                className='cursor-pointer h-4 w-4 absolute md:left-20 md:bottom-1 hover:scale-110 transition duration-300'
              />
            </div>
            <a
              className='text-sm flex gap-2  dark:text-blue-900 relative bottom-5'
              href={mark.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              Link <ExternalLink className='h-4 w-4' />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
