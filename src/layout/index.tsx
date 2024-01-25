import { Outlet } from 'react-router-dom'
import Dashboard from './dashboard'

export default function Layout() {
  return (
    <div className='w-full h-full flex'>
      <Dashboard />
      <div className='w-full h-full pb-2'>
        <Outlet />
      </div>
    </div>
  )
}
