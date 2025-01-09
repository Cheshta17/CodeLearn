import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface TestResult {
  passed: boolean;
  output: string;
  expectedOutput: string;
}

export const executeCode = async (code: string, language: string, testCases: TestCase[]): Promise<TestResult[]> => {
  const tempDir = path.join(__dirname, '..', 'temp');
  await fs.mkdir(tempDir, { recursive: true });

  const fileName = `temp_${Date.now()}`;
  const filePath = path.join(tempDir, fileName);

  try {
    switch (language) {
      case 'javascript':
        await fs.writeFile(`${filePath}.js`, code);
        return await runJavaScript(filePath, testCases);
      case 'python':
        await fs.writeFile(`${filePath}.py`, code);
        return await runPython(filePath, testCases);
      case 'java':
        await fs.writeFile(`${filePath}.java`, code);
        return await runJava(filePath, testCases);
      default:
        throw new Error('Unsupported language');
    }
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
};

const runJavaScript = async (filePath: string, testCases: TestCase[]): Promise<TestResult[]> => {
  return Promise.all(
    testCases.map(async (testCase) => {
      const { stdout } = await execPromise(`node ${filePath}.js "${testCase.input}"`);
      return {
        passed: stdout.trim() === testCase.expectedOutput.trim(),
        output: stdout.trim(),
        expectedOutput: testCase.expectedOutput.trim(),
      };
    })
  );
};

const runPython = async (filePath: string, testCases: TestCase[]): Promise<TestResult[]> => {
  return Promise.all(
    testCases.map(async (testCase) => {
      const { stdout } = await execPromise(`python ${filePath}.py "${testCase.input}"`);
      return {
        passed: stdout.trim() === testCase.expectedOutput.trim(),
        output: stdout.trim(),
        expectedOutput: testCase.expectedOutput.trim(),
      };
    })
  );
};

const runJava = async (filePath: string, testCases: TestCase[]): Promise<TestResult[]> => {
  await execPromise(`javac ${filePath}.java`);
  const className = path.basename(filePath);

  return Promise.all(
    testCases.map(async (testCase) => {
      const { stdout } = await execPromise(`java -cp ${path.dirname(filePath)} ${className} "${testCase.input}"`);
      return {
        passed: stdout.trim() === testCase.expectedOutput.trim(),
        output: stdout.trim(),
        expectedOutput: testCase.expectedOutput.trim(),
      };
    })
  );
};

const execPromise = (command: string): Promise<{ stdout: string; stderr: string }> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
};

