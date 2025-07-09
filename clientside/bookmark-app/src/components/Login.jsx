import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const Login = () => {
    const [Loading, setLoading] = useState(true);
      const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    
        const Login= async ()=>{
            try{
                const res= await axios.post("http://localhost:3000/api/auth/login",{
                    username,
                    password
                })
                console.log(res.data)
            }catch(err)
            {
              if(err.response){
                if(err.response.status===400){
                  alert("useralready exists");
                }
                else if(err.response.status===401){
                  alert("Invalid credentials");
                }
                else if(err.response.status===500){
                  alert("Server error");
                }
              }
            
            }
                    const token=localStorage.getItem("token");
        axios.get("http:localhost:3000/protected-route",{
          headers:{Authorization:`Bearer ${token}`}
        })
        }


  const handleSubmit = (e) => {
    e.preventDefault();
            Login();

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
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
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
