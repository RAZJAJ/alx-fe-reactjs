import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import ProfileDetails from './pages/ProfileDetails'
import ProfileSettings from './pages/ProfileSettings'
import BlogPost from './pages/BlogPost'
import ProtectedRoute from './components/ProtectedRoute'
import { useState } from 'react'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600">Home</Link>
          <Link to="/about" className="text-blue-600">About</Link>
          <Link to="/profile" className="text-blue-600">Profile</Link>
          <Link to="/blog/1" className="text-blue-600">Blog #1</Link>
        </nav>

        <button
          onClick={() => setIsAuthenticated(!isAuthenticated)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        
        <Route path="/blog/:id" element={<BlogPost />} />

        
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Routes>
    </div>
  )
}
