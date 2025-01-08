import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          CodeLearn
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/challenges">Challenges</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            {user.id ? (
              <li><Link to="/profile">{user.name}</Link></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
