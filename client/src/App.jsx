import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home'
import Signup from './pages/signup'
import Signin from './pages/signin'
import Profile from './pages/profile'
import PrivateRoute from './components/PrivateRoute'
import UserLayout from './components/userlayout'
import Users from './pages/users'
import Adduser from './pages/adduser'
import Edituser from './pages/edituser'
import Counter from './pages/counter'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<UserLayout/>}>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/sign-in' element={<Signin/>} />
      <Route element={<PrivateRoute/>} >
      <Route path='/profile' element={<Profile/>} />
      </Route>
      </Route>
      
      <Route path='/dashboard' element={<Users/>}/>
      <Route path='/adduser' element={<Adduser/>}/>
      <Route path='/edituser/:id' element={<Edituser/>}/>
      
      <Route path='/counter' element={<Counter/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App