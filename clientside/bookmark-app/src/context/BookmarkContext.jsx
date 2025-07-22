// src/context/BookmarkContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBookmarks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/bookmarks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setBookmarks(res.data.bookmarks || []);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [localStorage.getItem("token")]);

  const addBookmark = (bookmark) => {
    setBookmarks(prev => [bookmark, ...prev]);
  };

  const deleteBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b._id !== id));
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      loading,
      fetchBookmarks,
      addBookmark,
      deleteBookmark
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
