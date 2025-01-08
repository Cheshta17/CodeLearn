import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MonacoEditor from '@monaco-editor/react';

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  testCases: TestCase[];
}

const CodeEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/challenges/${id}`);
        setChallenge(response.data);
        setCode(response.data.initialCode);
      } catch (error) {
        console.error('Error fetching challenge:', error);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const runTestCase = (testCase: TestCase, userCode: string): boolean => {
    try {
      const userFunc = new Function('input', `
        ${userCode}
        return JSON.stringify(solution(${testCase.input}));
      `);
      const result = userFunc();
      return result === testCase.expectedOutput;
    } catch (error) {
      console.error('Error running test case:', error);
      return false;
    }
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
        const result = runTestCase(testCase, code);
        output += `Test Case ${i + 1}: ${result ? 'Passed' : 'Failed'}\n`;
        output += `Input: ${testCase.input}\n`;
        output += `Expected Output: ${testCase.expectedOutput}\n`;
        output += `Your Output: ${result ? testCase.expectedOutput : 'Incorrect'}\n\n`;
        if (result) passed++;
      }

      output += `\n${passed} out of ${total} test cases passed.`;
      setOutput(output);
    } catch (error) {
      console.error('Error running code:', error);
      setOutput('An error occurred while running the code.');
    } finally {
      setIsRunning(false);
    }
  };

  if (!challenge) {
    return <div>Loading...</div>;
  }

  return (
    <div className="code-editor">
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <div className="editor-controls">
        <select value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <button onClick={runCode} disabled={isRunning}>
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <MonacoEditor
        height="400px"
        language={language}
        value={code}
        onChange={handleCodeChange}
        options={{
          minimap: { enabled: false },
        }}
      />
      <div className="output">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;

