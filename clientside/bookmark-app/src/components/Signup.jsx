import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Error, Seterror] = useState(null);
  const Signup = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        username,
        password
      })
      console.log(res.data)

    } catch (err) {

      const status = err.response?.status;
      let message = "Something went wrong";
      if (status === 400)
        message = "Username and password required";
      else if (status === 201)
        message = "User registered successfully";
      else if (status === 409)
        message = "Username already exists";
      else if (status === 500)
        message = "Server error";

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
      <div className="min-h-screen flex items-center justify-center bg-zinc-800 px-4">
        <div className="max-w-md w-full bg-zinc-900 p-8 rounded-xl shadow-lg">
  <h2 className="text-2xl font-bold font-raleway text-center text-white mb-6">
    Create Your Account
  </h2>
  <form onSubmit={handleSubmit} className="space-y-5" autoComplete='off'>
    <div>
      <label className="block mb-1 font-medium font-raleway text-gray-100">
        Username
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 border focus:ring-gray-100/50 
             transition duration-150 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
        value={username}
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>
    <div>
      <label className="block mb-1 font-medium font-raleway text-gray-100">
        Password
      </label>
      <input
        type="password"
        autoComplete='off'
        autoFocus
        className="w-full px-4 py-2 focus:ring-gray-100/50 
             focus:shadow-[0_0_10px_2px_rgba(59,130,246,0.3)] 
             transition duration-150  border rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
        value={password}
        placeholder='password'

        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-gray-200 text-black py-2 rounded-lg"
    >
      Signup
    </button>
  </form>
            <p className="mt-4 text-center text-sm text-gray-300">
            Alerady have an account? <a href="/login" className="text-white  text-bold hover:underline">Login</a>

          </p>
</div>

      </div>
    </div>
  )
}

export default Signup