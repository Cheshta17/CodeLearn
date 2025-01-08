import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Github, Mail } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { signUp, signInWithGithub, signInWithGoogle } from '../services/userService';
import { setUser } from '../store/userSlice';

type UserState = {
  id: string;
  name: string;
  email: string; 
  completedChallenges: number;
  currentStreak: number;
  badges: string[];
};

const transformUserToUserState = (user: any): UserState => ({
  id: user.id || '',
  name: user.name || '',
  email: user.email || '',
  completedChallenges: user.completedChallenges || 0,
  currentStreak: user.currentStreak || 0,
  badges: user.badges || [],
});

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const user = await signUp(email, password, name);
      const userState = transformUserToUserState(user);
      dispatch(setUser(userState)); // Use transformed UserState
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create an account');
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const user = await signInWithGithub();
      const userState = transformUserToUserState(user);
      dispatch(setUser(userState)); // Use transformed UserState
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with GitHub');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      const userState = transformUserToUserState(user);
      dispatch(setUser(userState)); 
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-black">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded text-black" 
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded text-black" 
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-black" 
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded text-black" 
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleGithubSignIn}
            className="flex items-center justify-center w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
          >
            <Github className="mr-2" /> Sign in with GitHub
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            <Mail className="mr-2" /> Sign in with Google
          </button>
        </div>
        <p className="text-center text-sm text-black">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
