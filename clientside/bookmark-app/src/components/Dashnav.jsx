import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '@/context/Themecontext';
import { Sun,Moon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from '@/components/ui/switch';

const Dashnav = () => {
    const [Title, Settitle] = useState('');
    const [Url, Seturl] = useState('');
    const {darkMode,toggleTheme}=useTheme();
    const addbookmark = async (e) => {
        if (e) {
            e.preventDefault();

        }
        try {
            const res = await axios.post("http://localhost:3000/api/bookmarks", {
                title: Title, url: Url
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }

            )
            const message = "Bookmark added successfully"
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <nav className='w-full shadow-md  flex dark:bg-black dark:text-white flex-wrap justify-end items-center border-b  dark:border-gray-600 border-gray-300 px-4 sm:px-6 md:px-16 py-4 absolute top-0 z-10 bg-white'>
             <div className="flex items-center gap-2 px-2">
              {darkMode ? <Sun onClick={toggleTheme}/> : <Moon onClick={toggleTheme}/> }
            </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className='bg-black text-white dark:text-black dark:bg-white p-2 px-4 flex items-center gap-2 rounded hover:bg-zinc-900 transition'>
                            <Plus size={18} /> Add Bookmark
                        </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 dark:text-white text-black">
                        <DialogHeader>
                            <DialogTitle>Add a New Bookmark</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to save a new website.
                            </DialogDescription>
                        </DialogHeader>

                        <form className="space-y-4 mt-4" onSubmit={addbookmark}>
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    className="w-full px-3 py-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    value={Title}
                                    onChange={(e) => Settitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">URL</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com"
                                    className="w-full px-3 py-2 mt-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    value={Url}
                                    onChange={(e) => Seturl(e.target.value)}
                                />
                            </div>
                            <div className='flex items-center space-x-2'>
                                <input type="checkbox" id="favorite" />
                                <label htmlFor="favorite" className="text-sm">Mark as Favorite</label>
                            </div>
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
        </div>
    );
};

export default Dashnav;