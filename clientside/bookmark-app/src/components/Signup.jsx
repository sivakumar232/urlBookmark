import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Signup = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");  
    const[Error,Seterror]=useState(null);
    const Signup =async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/api/auth/signup",{
                username,
                password
            })
            console.log(res.data)

        }catch(err){
          
          const status =err.response?.status;
          let message="Something went wrong";
          if(status===400)
            message="Username and password required";
          else if(status===201)
            message="User registered successfully";
          else if(status===409)
            message="Username already exists";
          else if(status===500)
            message="Server error";
          
          Seterror(message)
            }   
    }
 

    function handleSubmit(event) {
        event.preventDefault();
        Signup();
    }
    
  return (
    <div>

  
 {Error && (
  <div className='absolute bottom-5 right-5 rounded text-bold border  p-4  bg-black text-white'>
    <p>{Error}</p>
  </div>
)}  
 <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  

      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold font-raleway text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium font-raleway text-gray-700">Username</label>
            <input
              type="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium font-raleway text-gray-700">Password</label>
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
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black hover:border hover:border-black transition"
          onClick={handleSubmit}>
            Signup
          </button>
        </form>

      </div>
    </div>
    </div>
  )
}

export default Signup