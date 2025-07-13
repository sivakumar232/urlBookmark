
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Sidebar from './Sidebar'
import Dashnav from './Dashnav'
import { Star } from 'lucide-react'
import { Ellipsis } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
const items = [
  {
    id: 1,
    title: "OpenAI",
    url: "https://openai.com",
    favorite: true,
  },
  {
    id: 2,
    title: "GitHub",
    url: "https://github.com",
    favorite: false,
  },
  {
    id: 3,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    favorite: true,
  },
  {
    id: 4,
    title: "React",
    url: "https://reactjs.org",
    favorite: false,
  },
  {
    id: 5,
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    favorite: true,
  },
  {
    id: 6,
    title: "Stack Overflow",
    url: "https://stackoverflow.com",
    favorite: false,
  },
  {
    id: 7,
    title: "Vite",
    url: "https://vitejs.dev",
    favorite: false,
  },
  {
    id: 8,
    title: "Figma",
    url: "https://figma.com",
    favorite: true,
  },
  {
    id: 9,
    title: "ShadCN UI",
    url: "https://ui.shadcn.dev",
    favorite: true,
  },
];

const Dashboard = () => { 
  const { user, logout } = useContext(AuthContext);
  const [data, setdata] = useState([])
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
      .then((res) => setdata(res.data))
      .catch((err) => setError(err.response?.data?.error || "Error fetching data"));
  }, []);
  return (
    <div className='min-h-screen overflow-x-hidden'>
      <Sidebar />
      <Dashnav />
      <div className='ml-0 md:ml-64 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex gap-6 p-6 overflow-x-none'>
        {items.map((data)=>(
        <div className='p-6 border rounded  group shadow-md hover:scale-102 transition duration-300 border-black'>
          <h2 className='text-xl text-bold font-ubuntu'>{data.title}</h2>
          <div className='relative flex gap-3  opacity-0 group-hover:opacity-100 bottom-8 left-70'>
          <Star className={`h-4 ${items.favorite ?'text-yellow-400 fill-yellow-400 ':'text-gray-400'} w-4`}/>
          <Ellipsis className=' left-70 h-4  w-4'/>
          </div>
          <a className='text-sm text-blue-900 relative bottom-5' href={items.url}>{items.url}</a>

        </div>
      ))}
      </div>

    </div>
  )
}

export default Dashboard;
