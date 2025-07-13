import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Dashboard = () => {
  const {user,logout}=useContext(AuthContext);
  const [data,setdata]=useState([])
  const [error,setError]=useState(null);
  const [Loading,setLoading]=useState(true);
  const navigate=useNavigate();
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
    .then((res) => setBookmarks(res.data))
    .catch((err) => setError(err.response?.data?.error || "Error fetching data"));
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default Dashboard