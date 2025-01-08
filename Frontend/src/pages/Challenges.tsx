import React from 'react';
import { Link } from 'react-router-dom';

const challenges = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', timeLimit: '5 minutes' },
  { id: 2, title: 'Reverse Integer', difficulty: 'Medium', timeLimit: '15 minutes' },
  { id: 3, title: 'Palindrome Number', difficulty: 'Hard', timeLimit: '30 minutes' },
];

const Challenges: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-8 text-white">Coding Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-black">{challenge.title}</h2>
            <p className="mb-4 text-black">Difficulty: {challenge.difficulty}</p>
            <p className="mb-4 text-black">Time Limit: {challenge.timeLimit}</p>
            <Link
              to={`/editor/${challenge.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Start Challenge
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;

