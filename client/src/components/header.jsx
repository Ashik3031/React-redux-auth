import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

function header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to="/"><h1 className='font-bold'>Auth app</h1></Link>
            <ul className='flex gap-4'>
                <Link to='/'> <li>Home</li></Link>
                <Link to='/profile'>
                {currentUser ? (
                  <img src={currentUser.profilePicture} alt="profile" className='h-7 w-7 rounded-full object-cover' />
                ) : (
                <li>sign-in</li>
                )} 
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default header