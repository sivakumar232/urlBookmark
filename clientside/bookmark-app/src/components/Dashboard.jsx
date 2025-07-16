
import React, { use, useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from './Sidebar'
import Dashnav from './Dashnav'
import { Star } from 'lucide-react'
import { Trash } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Dashboard = () => { 
  const {darkmode}=useTheme();
  const { user, logout } = useContext(AuthContext);
  const [Bookmark, Setbookmark] = useState([])
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found.");
      return;
    }
    axios.get("http://localhost:3000/api/bookmarks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res.data.bookmarks);
        Setbookmark(res.data.bookmarks);
      })

      .catch((err) => setError(err.response?.data?.error || "Error fetching data"));
  }, []);
//function to delete bookmark
//   const handledelete= async(id)=>{
//     try{
//    const res= await axios.delete(`http://localhost:3000/api/bookmarks/${id}`,{
//       headers:{
//         Authorization:`Bearer ${localStorage.getItem("token")}`
//       }
//     })

//     Setbookmark((prev)=>prev.filter((b)=>b._id!=id));
//   }catch(err){
//     console.log(err);
//   }
// }
  return (
    <div className='min-h-screen overflow-x-hidden'>
      <Sidebar />
      <Dashnav />
      <div className='ml-0 md:ml-64 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex gap-6 p-6 overflow-x-none'>
        {Bookmark.map((mark)=>(
        <div className='p-6 border dark:border-gray-600 rounded dark:bg-slate-900 dark:text-white group shadow-md hover:scale-102 transition duration-300 border-black'>
          <h2 className='text-xl text-bold font-ubuntu'>{mark.title}</h2>
          <div className='relative flex gap-3  opacity-0 group-hover:opacity-100 bottom-8 left-80'>
          {/* <Star className={`h-4 ${mark.favorite ?'text-yellow-400 fill-yellow-400 ':'text-gray-400'} w-4`}/> */}
          <Trash   className=' left-70 cursor-pointer h-4  w-4' />
          </div>
          <a className='text-sm text-blue-900 relative bottom-5' href={mark.url} target='_blank'>Link</a>
        </div>
      ))}
      </div>
{/* onclick={handledelete((mark._id)) } */}
    </div>
  )
}

export default Dashboard;
