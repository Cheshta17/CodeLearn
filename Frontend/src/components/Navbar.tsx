import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Code2, Layout, Trophy, LogIn, UserPlus } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-opacity-90 bg-gray-900 backdrop-filter backdrop-blur-lg sticky top-0 z-50 w-full border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl text-white">CodeLearn</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Layout className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/challenges"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Code2 className="h-4 w-4" />
              <span>Challenges</span>
            </Link>
            <Link 
              to="/leaderboard"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </Link>
            <Link 
              to="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
            <Link 
              to="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Layout className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/challenges"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Code2 className="h-5 w-5" />
              <span>Challenges</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              <Trophy className="h-5 w-5" />
              <span>Leaderboard</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center space-x-2 w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus className="h-5 w-5" />
              <span>Register</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar


