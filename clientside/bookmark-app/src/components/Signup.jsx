import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Signup = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");  
    const Signup =async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/api/auth/signup",{
                username,
                password
            })
            console.log(res.data)

        }catch(err){
            console.log(err)
            }
        
    }


    function handleSubmit(event) {
        event.preventDefault();
        Signup();
    }
    
  return (
 <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">username</label>
            <input
              type="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSubmit}>
            Signup
          </button>
        </form>

      </div>
    </div>
  )
}

export default Signup