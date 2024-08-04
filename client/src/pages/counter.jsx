import React, { useEffect, useState } from 'react'
import {increment,decrement} from '../redux/user/userSlice'
import {useDispatch,useSelector} from 'react-redux'

function counter() {
    const value = useSelector((state)=> state.user.value)
  const dispatch = useDispatch()
    
    
  return (
    <div>
        <h1 onClick={() => dispatch(increment())}>inc </h1>
        <p>{value}</p>
        <h1 onClick={() => dispatch(decrement())}>dec</h1>
    </div>
  )
}

export default counter