import { spawn } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import { setTimeout } from 'timers';

const sleep = promisify(setTimeout);

// Helper function to create a controlled CLI test process
function createCliTest() {
  const cliPath = join(__dirname, '..', 'src', 'calculator.ts');
  const process = spawn('ts-node', [cliPath], { 
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  let stdoutData = '';
  let stderrData = '';
  
  process.stdout.on('data', (data) => {
    stdoutData += data.toString();
  });
  
  process.stderr.on('data', (data) => {
    stderrData += data.toString();
  });
  
  return {
    process,
    getStdout: () => stdoutData,
    getStderr: () => stderrData,
    write: (input: string) => {
      process.stdin.write(input);
    },
    // Helper to send keypress for inquirer navigation
    sendKeypress: (key: string) => {
      if (key === 'down') {
        process.stdin.write('\x1B[B');
      } else if (key === 'up') {
        process.stdin.write('\x1B[A');
      } else if (key === 'enter') {
        process.stdin.write('\n');
      } else if (key === 'space') {
        process.stdin.write(' ');
      }
    },
    waitForOutput: async (predicate: (output: string) => boolean, timeout = 2000) => {
      const startTime = Date.now();
      while (Date.now() - startTime < timeout) {
        if (predicate(stdoutData)) {
          return true;
        }
        await sleep(50);
      }
      return false;
    },
    cleanup: () => {
      if (!process.killed) {
        process.stdin.end();
        process.stdout.destroy();
        process.stderr.destroy();
        process.kill('SIGTERM');
      }
    }
  };
}

describe('Interactive Calculator CLI', () => {
  // Increase timeout for all tests in this suite
  jest.setTimeout(15000);
  
  // Store active CLI test objects for cleanup
  let activeTest: ReturnType<typeof createCliTest> | null = null;
  
  // Ensure all processes are cleaned up after each test
  afterEach(() => {
    if (activeTest) {
      activeTest.cleanup();
      activeTest = null;
    }
  });
  
  test('should start in interactive mode when no arguments are provided', async () => {
    const cliTest = createCliTest();
    activeTest = cliTest;
    
    // Wait for the welcome message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Interactive Calculator')
    );
    
    // Wait a bit for inquirer to initialize
    await sleep(500);
    
    // Select the exit option (navigate down to exit)
    for (let i = 0; i < 5; i++) {
      cliTest.sendKeypress('down');
      await sleep(100);
    }
    cliTest.sendKeypress('enter');
    
    // Get the collected output
    await sleep(500);
    const stdout = cliTest.getStdout();
    
    // Verify welcome message and menu are displayed
    expect(stdout).toContain('Interactive Calculator');
    expect(stdout).toContain('What would you like to do?');
    expect(stdout).toContain('Exit');
    expect(stdout).toContain('Goodbye');
  });
  
  test('should perform addition in interactive mode', async () => {
    const cliTest = createCliTest();
    activeTest = cliTest;
    
    // Wait for the welcome message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('What would you like to do?')
    );
    
    // Wait a bit for inquirer to initialize
    await sleep(500);
    
    // Select addition (first option)
    cliTest.sendKeypress('enter');
    
    // Wait for the first number prompt
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('first number')
    );
    
    // Enter first number
    cliTest.write('4\n');
    
    // Wait for the second number prompt
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('second number')
    );
    
    // Enter second number
    cliTest.write('6\n');
    
    // Wait for the result
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Result')
    );
    
    // Verify the result
    const stdout = cliTest.getStdout();
    // Check for individual components rather than exact string match
    expect(stdout).toContain('4');
    expect(stdout).toContain('6');
    expect(stdout).toContain('10');
    expect(stdout).toContain('Result');
    
    // Choose not to perform another calculation
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Would you like to perform another calculation?')
    );
    
    // Navigate to No option with right arrow and select it
    cliTest.sendKeypress('N');  // Toggle from Yes to No
    cliTest.sendKeypress('enter');
    
    // Wait for exit message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Goodbye')
    );
  });
  
  test('should handle invalid input', async () => {
    const cliTest = createCliTest();
    activeTest = cliTest;
    
    // Wait for the welcome message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('What would you like to do?')
    );
    
    // Wait a bit for inquirer to initialize
    await sleep(500);
    
    // Select addition (first option)
    cliTest.sendKeypress('enter');
    
    // Wait for the first number prompt
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('first number')
    );
    
    // Enter invalid input
    cliTest.write('abc\n');
    
    // Wait for validation message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Please enter a valid number')
    );
    
    // Enter valid number after seeing validation error
    cliTest.write('5\n');
    
    // Wait for second number prompt
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('second number')
    );
    
    // Enter second number
    cliTest.write('5\n');
    
    // Wait for result
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Result')
    );
    
    // Choose not to perform another calculation
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Would you like to perform another calculation?')
    );
    
    // Navigate to No option with space and select it
    cliTest.sendKeypress('space');  // Toggle from Yes to No
    cliTest.sendKeypress('enter');
  });
}); 
