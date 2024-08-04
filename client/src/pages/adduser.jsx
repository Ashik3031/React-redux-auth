import React, { useState } from 'react'
import {Link,useNavigate } from 'react-router-dom'


function Adduser() {

  const [formData, setFormData] = useState({})
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChanges = (e) =>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
       
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setLoading(false)
      setError(false)
      const data = await res.json();
      navigate('/dashboard')
    } catch (error) {
      console.error('Error:', error);
      setLoading(false)
      setError(error)
    }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto '>
    <h1 className='text-3xl text-center font-semibold mb-8'>
     ADD USER
    </h1>
    <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
      <input type='text' placeholder='username' id='username' 
      className='bg-slate-100 p-3 rounded-lg' 
      onChange={handleChanges} />
      <input type='text' placeholder='email' id='email'
       className='bg-slate-100 p-3 rounded-lg'
       onChange={handleChanges} />
      <input type='password' placeholder='password' id='password' 
      className='bg-slate-100 p-3 rounded-lg' 
      onChange={handleChanges}/>
      <button disabled={loading} className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? "Loading...":"Add user"}
        </button>
    </form>
    
    <p className='text-red-700 mt-5 '>{error && "something went wrong!"}</p>
    </div>
  )
}

export default Adduser