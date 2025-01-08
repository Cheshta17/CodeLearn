import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Challenge, getChallenges } from '../services/challengeService';

const ChallengesList: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const fetchedChallenges = await getChallenges();
        setChallenges(fetchedChallenges);
      } catch (error) {
        console.error('Error loading challenges:', error);
      }
    };

    loadChallenges();
  }, []);

  return (
    <div className="challenges-list">
      <h2>Coding Challenges</h2>
      <ul>
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <li key={challenge.id}>
              <Link to={`/challenge/${challenge.id}`}>{challenge.title}</Link>
            </li>
          ))
        ) : (
          <li>No challenges available</li>
        )}
      </ul>
    </div>
  );
};

export default ChallengesList;
