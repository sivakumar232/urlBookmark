  import React, { useState, useContext } from 'react';
  import axios from 'axios';
  import { AuthContext } from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

  const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

useEffect(() => {
  setUsername('');
  setPassword('');
}, []);

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
          username,
          password
        });

        console.log(res.data);
        localStorage.setItem("token", res.data.token);

        login({ username });

        navigate('/dashboard');

      } catch (err) {
        if (err.response) {
          if (err.response.status === 400) {
            alert("User already exists");
          } else if (err.response.status === 401) {
            alert("Invalid credentials");
          } else if (err.response.status === 500) {
            alert("Server error");
          }
        } else {
          console.error("Login failed:", err.message);
        }
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-800 px-4">
  
        <div className="max-w-md w-full bg-zinc-900  border border p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-white mb-6">Login to Your Account</h2>
          <form onSubmit={handleLogin}  autoComplete="off"  className="space-y-5">
            <div>
              <label className="block mb-1 font-medium font-raleway text-gray-100">Username</label>
              <input
                type="text"
                 autoComplete="off" 
                 autoFocus
                placeholder="username"
                className="w-full px-4 py-2 rounded-lg border focus:ring-gray-100/50 
              focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.3)] 
              transition duration-150   placeholder-gray-400 text-lato  text-white border-gray-300 bg-zinc-800 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

            </div>
            <div>
              <label className="block mb-1 font-medium font-raleway text-gray-100">Password</label>
              <input
                type="password"
                 autoComplete="off" 
                className="w-full px-4 py-2 bg-zinc-800 border border-gray-300 text-white text-lato rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100/50 
              focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.3)] 
              transition duration-150 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='password'
              />
            </div>
            <button
              type="submit"
              className="group relative w-full bg-gray-200 hover:bg-gray-300    text-black py-2 rounded-lg transition"
            >
              Login
              {/* <span className='absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent
                h-[2px]  w-[80%] mx-auto'></span>
                <span className='absolute opacity-0 group-hover:opacity-100 inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent
                h-[12px]  w-[80%] mx-auto blur-md '></span> */}
            </button>

          </form>
          <p className="mt-4 text-center text-sm text-gray-300">
            Don't have an account? <a href="/signup" className="text-white  text-bold hover:underline">Sign up</a>

          </p>
        </div>
      </div>
    );
  };

  export default Login;
