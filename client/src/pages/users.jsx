import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserStart, getuser, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

function Users() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/users');
            const data = await response.json();
            if (Array.isArray(data)) {
                dispatch(getuser(data));
            } else {
                console.error('API did not return an array:', data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDeleteAccount = async (userId) => {
      try {
        dispatch(deleteUserStart());
        console.log("oooopopop",userId)
        const res = await fetch(`/delete/${userId}`, {
          method: 'DELETE',
        });
        console.log("Response status:", res);
        const data = await res.json();
        console.log("Response data:", data);
        if (!res.ok) {
          throw new Error(data.message || 'Failed to delete user');
        }
        fetchData();
      //  dispatch(deleteUserSuccess(userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        dispatch(deleteUserFailure(error.message));
      }
    };

    const userslist = Object.values(users).filter(user => user.name !== 'admin');

    const handleChange = (event) => {
      setSearchTerm(event.target.value); 
      console.log(searchTerm)
  };

    const handleSearch = async () => {
        try {
            const response = await fetch(`/search?query=${searchTerm}`);
            const data = await response.json();
            console.log("response",data)
            dispatch(getuser(data));
        } catch (error) {
            console.error('Error searching users:', error);
            setError('Error serching users. Please try again.');
        }
    };

    

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">User Management</h1>
                <div className="flex">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search by name or email"
                        className="mr-2 px-2 py-1 border border-gray-300 rounded focus:outline-none"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                        Search
                    </button>
                    <Link to='/adduser'>
                        <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded shadow hover:bg-blue-700 transition">
                            Add User
                        </button>
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {userslist.map(user => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span>{user.email}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <Link to={`/edituser/${user.id}`}>
                                            <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition mr-3">
                                                Edit
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDeleteAccount(user.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
