import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate()
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => {
          const updatedData = { ...prev, [name]: value };
          return updatedData;
        });
      };
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:5004/Login", formdata);
          console.log("Response:", res);
          if(res.status==200){
            toast.success("Login Successfully");
            console.log('login',res.data.user._id)
            // localStorage.setItem('login',true)
            localStorage.setItem('login',res.data.user._id)

            navigate('/')
          }else if(res.status==201){
            toast.error("Error!")
          }
        } catch (err) {
          console.error("Error:", err);
        }
      };
    
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <form className="flex flex-col gap-4 align-center" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter your password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-between'>
            <button type="submit" className="w-[100px] bg-blue-500 text-white py-2 rounded">
              Submit
            </button>
            <Link to="/register" className="w-[100px] bg-slate-800 text-white py-2 rounded">
              Register
            </Link>
            </div>
            
          </form>
        </div>
      );
}

export default Login
