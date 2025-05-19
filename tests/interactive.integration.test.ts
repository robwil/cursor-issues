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
    waitForOutput: async (predicate: (output: string) => boolean, timeout = 1000) => {
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
      process.kill();
    }
  };
}

describe('Interactive Calculator CLI', () => {
  test('should start in interactive mode when no arguments are provided', async () => {
    const cliTest = createCliTest();
    
    // Wait for the welcome message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Welcome to the Interactive Calculator')
    );
    
    // Exit the program
    cliTest.write('9\n');
    
    // Wait a bit more for processing
    await sleep(500);
    
    // Get the collected output
    const stdout = cliTest.getStdout();
    
    // Verify welcome message and menu are displayed
    expect(stdout).toContain('Welcome to the Interactive Calculator');
    expect(stdout).toContain('Choose operation:');
    expect(stdout).toContain('1. Add');
    expect(stdout).toContain('9. Exit');
    
    // Clean up
    cliTest.cleanup();
  }, 5000);
  
  test('should perform addition in interactive mode', async () => {
    const cliTest = createCliTest();
    
    // Wait for the welcome message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Choose operation:')
    );
    
    // Select addition operation
    cliTest.write('1\n');
    
    // Wait for the first number prompt
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Enter two numbers')
    );
    
    // Enter first number
    cliTest.write('4\n');
    
    // Enter second number
    cliTest.write('6\n');
    
    // Wait for the result
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Result: 10')
    );
    
    // Exit the program
    cliTest.write('9\n');
    
    // Wait a bit more for processing
    await sleep(500);
    
    // Verify the addition result
    expect(cliTest.getStdout()).toContain('Result: 10');
    
    // Clean up
    cliTest.cleanup();
  }, 5000);
  
  test('should handle invalid input', async () => {
    const cliTest = createCliTest();
    
    // Wait for the welcome message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Choose operation:')
    );
    
    // Select addition operation
    cliTest.write('1\n');
    
    // Wait for the number prompt
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Enter two numbers')
    );
    
    // Enter invalid input
    cliTest.write('abc\n');
    
    // Wait for the error message
    await cliTest.waitForOutput((stdout) => 
      stdout.includes('Invalid number')
    );
    
    // Exit the program
    cliTest.write('9\n');
    
    // Wait a bit more for processing
    await sleep(500);
    
    // Verify error message for invalid input
    expect(cliTest.getStdout()).toContain('Invalid number');
    
    // Clean up
    cliTest.cleanup();
  }, 5000);
}); 
