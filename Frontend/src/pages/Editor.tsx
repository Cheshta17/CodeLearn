import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import { getChallengeById, submitChallenge } from '../services/challengeService';
import { toast } from 'react-hot-toast';
import { Select } from '../components/ui/select';

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  timeLimit: string;
  initialCode: string;
  testCases: TestCase[];
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
];

const getLanguageTemplate = (language: string) => {
  switch (language) {
    case 'javascript':
      return `function solution(x) {\n  // Your code here\n}`;
    case 'python':
      return `def solution(x):\n  # Your code here\n  pass`;
    case 'java':
      return `public class Solution {\n  public static int solution(int x) {\n    // Your code here\n    return 0;\n  }\n}`;
    case 'cpp':
      return `int solution(int x) {\n  // Your code here\n  return 0;\n}`;
    default:
      return `function solution(x) {\n  // Your code here\n}`;
  }
};

const CodeEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChallenge = async () => {
      if (!id) {
        toast.error('No challenge ID provided');
        navigate('/challenges');
        return;
      }

      try {
        setIsLoading(true);
        const challengeData = await getChallengeById(parseInt(id, 10));
        if (challengeData) {
          setChallenge(challengeData);
          setCode(challengeData.initialCode);
        } else {
          throw new Error('Challenge not found');
        }
      } catch (error) {
        console.error('Error loading challenge:', error);
        toast.error('Failed to load challenge. Please try again.');
        navigate('/challenges');
      } finally {
        setIsLoading(false);
      }
    };

    loadChallenge();
  }, [id, navigate]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(getLanguageTemplate(newLanguage));
  };

  const runCode = async () => {
    if (!challenge) return;

    setIsRunning(true);
    setOutput('');
    try {
      let passed = 0;
      let total = challenge.testCases.length;
      let output = '';

      for (let i = 0; i < total; i++) {
        const testCase = challenge.testCases[i];
        try {
          const userFunc = new Function('input', `${code}\nreturn solution(${testCase.input});`);
          const result = userFunc();
          const isPassed = JSON.stringify(result) === testCase.expectedOutput;
          output += `Test Case ${i + 1}: ${isPassed ? 'Passed' : 'Failed'}\n`;
          output += `Input: ${testCase.input}\n`;
          output += `Expected Output: ${testCase.expectedOutput}\n`;
          output += `Your Output: ${JSON.stringify(result)}\n\n`;
          if (isPassed) passed++;
        } catch (error) {
          output += `Test Case ${i + 1}: Failed (Runtime Error)\n\n`;
        }
      }

      output += `\n${passed} out of ${total} test cases passed.`;
      setOutput(output);
      toast.success('Code executed successfully!');
    } catch (error) {
      console.error('Error running code:', error);
      toast.error('Failed to execute code');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!challenge) return;

    setIsSubmitting(true);
    setOutput('');

    try {
      const result = await submitChallenge(challenge.id, code, language);
      setOutput(result.output);
      if (result.passed) {
        toast.success('Challenge completed successfully!');
      } else {
        toast.error('Some test cases failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting challenge:', error);
      toast.error('Failed to submit challenge');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Challenge not found</h2>
          <button
            onClick={() => navigate('/challenges')}
            className="text-blue-500 hover:text-blue-600"
          >
            Return to Challenges
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-2/5 bg-white p-6 overflow-y-auto border-r border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-black">{challenge.title}</h1>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Difficulty: {challenge.difficulty}</p>
          <p className="text-sm text-gray-600">Time Limit: {challenge.timeLimit}</p>
        </div>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-black">{challenge.description}</p>
        </div>

        {/* Test Cases Section */}
        <h2 className="text-lg font-bold mt-4 mb-2 text-black">Test Cases</h2>
        <div className="bg-gray-100 p-2 rounded-md overflow-y-auto max-h-48 border">
          {challenge.testCases.map((testCase, index) => (
            <div key={index} className="mb-2">
              <p className="text-sm text-black">
                <strong>Test Case {index + 1}:</strong>
              </p>
              <p className="text-sm text-black">
                <strong>Input:</strong> {testCase.input}
              </p>
              <p className="text-sm text-black">
                <strong>Expected Output:</strong> {testCase.expectedOutput}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-gray-200 p-2 flex justify-between items-center">
          <Select
            value={language}
            onValueChange={handleLanguageChange}
            options={languages}
          />
          <div>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mr-2"
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
        <div className="h-3/5 border-b border-gray-200">
          <MonacoEditor
            height="100%"
            language={language}
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        <div className="h-2/5 bg-gray-900 text-white p-4 font-mono">
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <div className="h-[calc(100%-2rem)] overflow-y-auto">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

