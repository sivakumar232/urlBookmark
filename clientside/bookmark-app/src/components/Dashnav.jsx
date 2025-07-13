import React from 'react'
import { Plus } from 'lucide-react'

const Dashnav = () => {
    return (
        <div>
            <nav className='w-full shadow-md flex flex-wrap justify-end items-center border-b border-gray-300 px-4 sm:px-6 md:px-16 py-4 absolute top-0 z-10'>
                <button className='bg-black text-white p-2 px-4  cursor-pointer flex rounded'> <Plus  />Add Bookmark</button>
            </nav>
        </div>
    )
}

export default Dashnav;
