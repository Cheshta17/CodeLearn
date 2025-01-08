import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{user.name}</h2>
        <p className="mb-2">Email: {user.email}</p>
        <p className="mb-2">Completed Challenges: {user.completedChallenges}</p>
        <p className="mb-2">Current Streak: {user.currentStreak} days</p>
        <h3 className="text-lg font-semibold mt-6 mb-2">Badges</h3>
        <h3 className="text-lg font-semibold mt-6 mb-2">Progress History</h3>
      </div>
    </div>
  );
};

export default Profile;
