import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Github, Mail } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {
  signIn,
  signInWithGithub,
  signInWithGoogle,
} from '../services/authService';
import { setUser } from '../store/userSlice';
import { getUserData } from '../services/userService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      if (user) {
        const extendedUser = await getUserData(user.uid);
        dispatch(setUser(mapUserToUserState(extendedUser)));
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const user = await signInWithGithub();
      if (user) {
        const extendedUser = await getUserData(user.uid);
        dispatch(setUser(mapUserToUserState(extendedUser)));
        navigate('/');
      } else {
        setError('Failed to sign in with GitHub');
      }
    } catch (err) {
      setError('Failed to sign in with GitHub');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        const extendedUser = await getUserData(user.uid);
        dispatch(setUser(mapUserToUserState(extendedUser)));
        navigate('/');
      } else {
        setError('Failed to sign in with Google');
      }
    } catch (err) {
      setError('Failed to sign in with Google');
    }
  };

  const mapUserToUserState = (user: any) => ({
    id: user.uid,
    name: user.displayName || 'Anonymous',
    email: user.email || '',
    completedChallenges: user.completedChallenges || [],
    currentStreak: user.currentStreak || 0,
    badges: user.badges || [],
  });

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/code-background.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            Sign in
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={handleGithubSignIn}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <Github className="h-5 w-5" />
              <span className="ml-2">GitHub</span>
            </button>
            <button
              onClick={handleGoogleSignIn}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <Mail className="h-5 w-5" />
              <span className="ml-2">Google</span>
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
