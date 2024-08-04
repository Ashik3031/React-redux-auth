import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {signInStart,signInsuccess,signInFailure} from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'


function signin() {

  const [formData, setFormData] = useState({})
  const {loading,error} = useSelector((state)=> state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChanges = (e) =>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }
  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
       
      const data = await res.json();
      dispatch(signInsuccess(data));
      if (data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto '>
    <h1 className='text-3xl text-center font-semibold mb-8'>
      sign-in
    </h1>
    <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
      <input type='text' placeholder='email' id='email'
       className='bg-slate-100 p-3 rounded-lg'
       onChange={handleChanges} />
      <input type='password' placeholder='password' id='password' 
      className='bg-slate-100 p-3 rounded-lg' 
      onChange={handleChanges}/>
      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? "Loading...":"sign in"}
        </button>
    </form>
    <div className='flex gap-2 mt-5 '>
      <p>Dont have an account</p>
      <Link to='/sign-up'>
      <span className='text-blue-500'>sign up</span>
      </Link>
    </div>
    <p className='text-red-700 mt-5 text-center font-medium'>{error ? "user not found ! retry" : ''}</p>
    </div>
  )
}

export default signin 