import React from 'react';

const leaderboardData = [
  { id: 1, name: 'John Doe', score: 1000, rank: 1 },
  { id: 2, name: 'Jane Smith', score: 950, rank: 2 },
  { id: 3, name: 'Bob Johnson', score: 900, rank: 3 },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left text-black">Rank</th>
            <th className="p-4 text-left text-black">Name</th>
            <th className="p-4 text-left text-black">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-4 text-black">{user.rank}</td>
              <td className="p-4 text-black">{user.name}</td>
              <td className="p-4 text-black">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
