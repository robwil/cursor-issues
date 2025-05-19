import { spawn } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import { setTimeout } from 'timers';

const sleep = promisify(setTimeout);

describe('Interactive Calculator CLI', () => {
  const scriptPath = join(__dirname, '..', 'src', 'calculator.ts');
  
  test('should start in interactive mode when no arguments are provided', async () => {
    // Start the calculator process
    const process = spawn('ts-node', [scriptPath]);
    
    let output = '';
    
    // Collect stdout
    process.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    // Wait for the welcome message and menu to appear (increased wait time)
    await sleep(1000);
    
    // Verify welcome message and menu are displayed
    expect(output).toContain('Welcome to the Interactive Calculator');
    expect(output).toContain('Choose operation:');
    expect(output).toContain('1. Add');
    expect(output).toContain('9. Exit');
    
    // Clean up
    process.kill();
  }, 5000);
  
  test('should perform addition in interactive mode', async () => {
    // Start the calculator process
    const process = spawn('ts-node', [scriptPath]);
    
    let output = '';
    
    // Collect stdout
    process.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    // Wait for the welcome message and menu to appear
    await sleep(500);
    
    // Select addition (1)
    process.stdin.write('1\n');
    
    // Wait for number prompt
    await sleep(200);
    
    // Input first number (4)
    process.stdin.write('4\n');
    
    // Wait for second number prompt
    await sleep(200);
    
    // Input second number (6)
    process.stdin.write('6\n');
    
    // Wait for result
    await sleep(200);
    
    // Verify the addition result
    expect(output).toContain('Result: 10');
    
    // Close the program by selecting exit (9)
    process.stdin.write('9\n');
    
    // Clean up
    process.kill();
  }, 10000);
  
  test('should handle invalid input', async () => {
    // Start the calculator process
    const process = spawn('ts-node', [scriptPath]);
    
    let output = '';
    
    // Collect stdout
    process.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    // Wait for the welcome message and menu to appear
    await sleep(500);
    
    // Select addition (1)
    process.stdin.write('1\n');
    
    // Wait for number prompt
    await sleep(200);
    
    // Input invalid first number
    process.stdin.write('abc\n');
    
    // Wait for result
    await sleep(200);
    
    // Verify error message for invalid input
    expect(output).toContain('Invalid number');
    
    // Close the program by selecting exit (9)
    process.stdin.write('9\n');
    
    // Clean up
    process.kill();
  }, 10000);
}); 
