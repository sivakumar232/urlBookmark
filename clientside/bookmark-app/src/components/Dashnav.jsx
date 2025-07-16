import axios from "axios";
import React, { useState } from "react";
import { Plus, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/Themecontext";
import { useBookmarks } from "../context/BookmarkContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Dashnav = () => {
  const [Title, Settitle] = useState("");
  const [Url, Seturl] = useState("");
  const { darkMode, toggleTheme } = useTheme();
  const { addBookmark } = useBookmarks();
  const handleAddBookmark = async (e) => {
    e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/api/bookmarks", {
      title: Title, url: Url
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    
    if (res.data?.bookmark) {
      addBookmark(res.data.bookmark);   // ✅ update context
      Settitle(""); Seturl("");         // ✅ reset form
    } else {
      console.warn("No bookmark returned.");
    }
  } catch (err) {
    console.log(err);
  }
  };

  return (
    <nav className="w-full shadow-md flex dark:bg-black dark:text-white justify-end items-center border-b dark:border-gray-600 px-6 py-4 absolute top-0 z-10 bg-white">
      <div className="flex items-center gap-2 px-2">
        {darkMode ? <Sun onClick={toggleTheme} /> : <Moon onClick={toggleTheme} />}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-black text-white dark:text-black dark:bg-white p-2 px-4 flex items-center gap-2 rounded hover:bg-zinc-900 transition">
            <Plus size={18} /> Add Bookmark
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-gray-800 dark:text-white text-black">
          <DialogHeader>
            <DialogTitle>Add a New Bookmark</DialogTitle>
            <DialogDescription>Save a website link.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBookmark} className="space-y-4 mt-4">
            <input
              type="text"
              placeholder="Title"
              value={Title}
              onChange={(e) => Settitle(e.target.value)}
              required
              className="w-full px-3 py-2 rounded border border-gray-300"
            />
            <input
              type="url"
              placeholder="https://example.com"
              value={Url}
              onChange={(e) => Seturl(e.target.value)}
              required
              className="w-full px-3 py-2 rounded border border-gray-300"
            />
            <button
              type="submit"
              className="w-full bg-black hover:scale-102 transition duration-300 text-white py-2 rounded mt-2"
            >
              Save Bookmark
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Dashnav;
