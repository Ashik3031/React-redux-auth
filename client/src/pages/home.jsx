import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';

function home() {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate()

      return (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
            <div className="md:flex">
              <div className="md:flex-shrink-0 ">
              {currentUser ? (
                  <img src={currentUser.profilePicture} alt="profile" className=' w-20 rounded-md m-5 object-cover' />
                ) : (
              <p>  </p>
                )} 
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold"> {currentUser? "Welcome back" : "Guest User"} </div>
                <h1 className="block mt-1 text-3xl leading-tight font-bold text-black">
                {currentUser?.username && currentUser.username !== 'admin' ? currentUser.username : "Guest User"}

                </h1>
                <p className="mt-2 text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="mt-4">
                <Link to='/profile'>
                  <button className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none">
                    Edit Profile
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    

export default home