import * as readline from 'readline';
import { sum } from "./commands/sum";
import { subtract } from "./commands/subtract";
import { multiply } from "./commands/multiply";
import { divide } from "./commands/divide";
import { power } from "./commands/power";

/**
 * Creates an interactive CLI interface for the calculator
 */
export function startInteractiveMode(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Welcome to the Interactive Calculator!');
  showMenu(rl);
}

/**
 * Shows the main menu of operations
 */
function showMenu(rl: readline.Interface): void {
  console.log('\nChoose operation:');
  console.log('1. Add');
  console.log('2. Subtract');
  console.log('3. Multiply');
  console.log('4. Divide');
  console.log('5. Power');
  console.log('9. Exit');

  rl.question('> ', (choice) => {
    switch (choice.trim()) {
      case '1':
        handleOperation(rl, 'add', sum);
        break;
      case '2':
        handleOperation(rl, 'subtract', subtract);
        break;
      case '3':
        handleOperation(rl, 'multiply', multiply);
        break;
      case '4':
        handleOperation(rl, 'divide', divide);
        break;
      case '5':
        handleOperation(rl, 'power', power);
        break;
      case '9':
        console.log('Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid option. Please try again.');
        showMenu(rl);
        break;
    }
  });
}

/**
 * Handles the input of two numbers and performs the selected operation
 */
function handleOperation(
  rl: readline.Interface, 
  operationName: string, 
  operation: (a: number, b: number) => number
): void {
  console.log(`Enter two numbers to ${operationName}:`);
  
  rl.question('>> ', (input1) => {
    const num1 = parseFloat(input1);
    
    if (isNaN(num1)) {
      console.log('Invalid number. Please try again.');
      showMenu(rl);
      return;
    }

    rl.question('>> ', (input2) => {
      const num2 = parseFloat(input2);
      
      if (isNaN(num2)) {
        console.log('Invalid number. Please try again.');
        showMenu(rl);
        return;
      }

      try {
        const result = operation(num1, num2);
        console.log(`Result: ${result}`);
        console.log('---');
        showMenu(rl);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error: ${error.message}`);
        } else {
          console.error('An unknown error occurred');
        }
        showMenu(rl);
      }
    });
  });
} 
