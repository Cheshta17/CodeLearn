import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  timeLimit: string;
  initialCode: string;
  testCases: TestCase[];
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    difficulty: 'Easy',
    timeLimit: '15 minutes',
    initialCode: `function solution(nums, target) {
  // Your code here
}`,
    testCases: [
      { input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { input: '[3,2,4], 6', expectedOutput: '[1,2]' },
      { input: '[3,3], 6', expectedOutput: '[0,1]' },
    ]
  },
  {
    id: 2,
    title: 'Reverse Integer',
    description: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.\n\nAssume the environment does not allow you to store 64-bit integers (signed or unsigned).',
    difficulty: 'Medium',
    timeLimit: '20 minutes',
    initialCode: `function solution(x) {
  // Your code here
}`,
    testCases: [
      { input: '123', expectedOutput: '321' },
      { input: '-123', expectedOutput: '-321' },
      { input: '120', expectedOutput: '21' },
    ]
  },
  {
    id: 3,
    title: 'Palindrome Number',
    description: 'Given an integer x, return true if x is palindrome integer.\n\nAn integer is a palindrome when it reads the same backward as forward.\n\nFor example, 121 is a palindrome while 123 is not.',
    difficulty: 'Easy',
    timeLimit: '15 minutes',
    initialCode: `function solution(x) {
  // Your code here
}`,
    testCases: [
      { input: '121', expectedOutput: 'true' },
      { input: '-121', expectedOutput: 'false' },
      { input: '10', expectedOutput: 'false' },
    ]
  }
];

export const getChallenges = async (): Promise<Challenge[]> => {
  return challenges;
};

export const getChallengeById = async (id: number): Promise<Challenge | undefined> => {
  return challenges.find(challenge => challenge.id === id);
};

export const submitChallenge = async (challengeId: number, code: string, language: string) => {
  const challenge = await getChallengeById(challengeId);
  if (!challenge) {
    throw new Error('Challenge not found');
  }

  let passed = 0;
  let total = challenge.testCases.length;
  let output = '';

  for (let i = 0; i < total; i++) {
    const testCase = challenge.testCases[i];
    try {
      const userFunc = new Function('input', code + `\nreturn solution(${testCase.input});`);
      const result = userFunc();
      const isPassed = result.toString() === testCase.expectedOutput;
      output += `Test Case ${i + 1}: ${isPassed ? 'Passed' : 'Failed'}\n`;
      if (isPassed) passed++;
    } catch (error) {
      output += `Test Case ${i + 1}: Failed (Runtime Error)\n`;
    }
  }

  output += `\n${passed} out of ${total} test cases passed.`;

  return {
    passed: passed === total,
    output,
  };
};
