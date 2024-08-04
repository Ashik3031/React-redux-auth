import Header from '../components/header'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default UserLayout