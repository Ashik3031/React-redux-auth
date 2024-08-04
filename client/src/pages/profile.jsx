import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {useDispatch} from 'react-redux'
import { updateUserStart,updateUserSuccess,updateUserFailure, signOut } from '../redux/user/userSlice'

function profile() {
  const fileRef = useRef(null)
  const [image,setImage] = useState(undefined) 
  const [imagePercent,setImagePercent] = useState(0)
  const [imageError,setImageError] = useState(false)
  const [formdata,setFormdata] = useState({})

  const dispatch = useDispatch()
  
  const {currentUser} = useSelector((state)=> state.user)
  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image])
  const handleFileUpload = async(image) =>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,image)

    uploadTask.on(
      'state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
      },
      (error)=>{
        setImageError(true)
        console.error("Upload error:", error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormdata((prevFormdata) => ({
            ...prevFormdata,
            profilePicture: downloadURL
          }));
        })
      }
    )
  }

  const handlechange = (e) =>{
    setFormdata({...formdata,[e.target.id]:e.target.value})
  }
 
  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log("Submitting form data:", formdata);
    try{
      dispatch(updateUserStart())
      const res = await fetch(`/updated/${currentUser._id}`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formdata),
      })
      const data = await res.json()
      console.log("Server response:", data);
      if(data.success === false){
        dispatch(updateUserFailure(data))
      }
      dispatch(updateUserSuccess(data))
    } catch (error){
      console.error('Update error:', error)
      dispatch(updateUserFailure(error))
    }
  }

  const handleSignout = async() =>{
    try{
      await fetch('/signout')
      dispatch(signOut());
    }catch(error){
      console.log(error);
    } 
  }
 
  return (
    <>
    <div className='flex justify-end mt-5 p-4'>
        <span onClick={handleSignout} className='text-red-700'>Sign out</span>
      </div>
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl font-semibold text-center my-7'>profile</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type='file' ref={fileRef} hidden accept='image/*'
          onChange={(e)=> setImage(e.target.files[0])}
          />
        <img src={formdata.profilePicture || currentUser.profilePicture} alt="upload profile image" 
        className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        onClick={()=> fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? ( <span className='text-red-700 '> Error uploading image</span> ) : 
          imagePercent > 0 && imagePercent <100 ?( 
            <span className='text-slate-700'>{`Uploading:'${imagePercent} %`}</span>) :
            imagePercent === 100 ? (<span className='text-green-700'>Image uploaded succesfully</span>) : ''
           }
        </p>
        
        <input defaultValue={currentUser.username}
         type='text' id='username' placeholder='Username'
         className='bg-slate-100 '
         onChange={handlechange}
         />
         <input  defaultValue={currentUser.email}
         type='email' id='email' placeholder='email'
         className='bg-slate-100 '
         onChange={handlechange}
         />
         <input  
         type='password' id='password' placeholder='password'
         className='bg-slate-100 '
         onChange={handlechange}
         />
         <button type='submit' className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      
      
    </div>
    </>
  )
}

export default profile