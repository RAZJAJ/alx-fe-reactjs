import { Outlet, NavLink } from 'react-router-dom'

export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold"> Profile</h1>
      <nav className="space-x-4 mb-4">
        <NavLink to="details" className="text-blue-600">Details</NavLink>
        <NavLink to="settings" className="text-blue-600">Settings</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
