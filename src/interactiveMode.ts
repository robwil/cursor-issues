import inquirer from 'inquirer';
import chalk from 'chalk';
import { sum } from "./commands/sum";
import { subtract } from "./commands/subtract";
import { multiply } from "./commands/multiply";
import { divide } from "./commands/divide";
import { power } from "./commands/power";

// Define operation type for better type safety
type Operation = {
  name: string;
  value: string;
  function: (a: number, b: number) => number;
};

/**
 * Creates an enhanced interactive CLI interface for the calculator
 */
export function startInteractiveMode(): void {
  console.clear();
  printHeader();
  showMainMenu();
}

/**
 * Prints the header with app title and description
 */
function printHeader(): void {
  console.log(chalk.bgBlue.white.bold('\n 📟 Interactive Calculator 📟 \n'));
  console.log(chalk.cyan('Welcome to the interactive calculator! Choose an operation below.'));
  console.log(chalk.dim('Use arrow keys to navigate and Enter to select.\n'));
}

/**
 * Shows the main menu with operation choices
 */
async function showMainMenu(): Promise<void> {
  // Available operations
  const operations: Operation[] = [
    { name: '➕ Addition', value: 'add', function: sum },
    { name: '➖ Subtraction', value: 'subtract', function: subtract },
    { name: '✖️ Multiplication', value: 'multiply', function: multiply },
    { name: '➗ Division', value: 'divide', function: divide },
    { name: '🔢 Power', value: 'power', function: power },
    { name: '🚪 Exit', value: 'exit', function: () => 0 }
  ];
  
  try {
    const { operation } = await inquirer.prompt([
      {
        type: 'list',
        name: 'operation',
        message: chalk.yellow('What would you like to do?'),
        choices: operations.map(op => ({ name: op.name, value: op })),
        pageSize: 10
      }
    ]);
    
    if (operation.value === 'exit') {
      console.log(chalk.green('\nThank you for using the Interactive Calculator! Goodbye! 👋\n'));
      return;
    }
    
    await handleMathOperation(operation);
  } catch (error) {
    console.error(chalk.red('An error occurred with the prompt:'), error);
  }
}

/**
 * Handles the selected math operation
 */
async function handleMathOperation(operation: Operation): Promise<void> {
  console.log(chalk.cyan(`\n🧮 ${operation.name.split(' ')[1]} Operation 🧮`));
  
  try {
    const { firstNumber, secondNumber } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstNumber',
        message: chalk.yellow('Enter the first number:'),
        validate: validateNumber
      },
      {
        type: 'input',
        name: 'secondNumber',
        message: chalk.yellow('Enter the second number:'),
        validate: (input: string) => {
          // Special case for division by zero
          if (operation.value === 'divide' && parseFloat(input) === 0) {
            return 'Division by zero is not allowed!';
          }
          return validateNumber(input);
        }
      }
    ]);
    
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    
    try {
      const result = operation.function(num1, num2);
      
      // Format result with proper decimal places
      const formattedResult = Number.isInteger(result) 
        ? result.toString() 
        : result.toFixed(4).replace(/\.?0+$/, '');
      
      console.log('\n' + chalk.bgGreen.black(' Result ') + ' ' + 
        chalk.yellow(`${num1} ${getOperationSymbol(operation.value)} ${num2} = `) + 
        chalk.green.bold(formattedResult));
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.bgRed.white(' Error ') + ' ' + chalk.red(error.message));
      } else {
        console.error(chalk.red('An unknown error occurred'));
      }
    }
    
    console.log(); // Empty line for better readability
    
    // Ask if user wants to perform another calculation
    const { again } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'again',
        message: chalk.yellow('Would you like to perform another calculation?'),
        default: true
      }
    ]);
    
    if (again) {
      console.clear();
      printHeader();
      showMainMenu();
    } else {
      console.log(chalk.green('\nThank you for using the Interactive Calculator! Goodbye! 👋\n'));
    }
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
  }
}

/**
 * Validates that input is a number
 */
function validateNumber(input: string): boolean | string {
  const num = parseFloat(input);
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }
  return true;
}

/**
 * Returns the symbol for an operation
 */
function getOperationSymbol(operation: string): string {
  switch (operation) {
    case 'add': return '+';
    case 'subtract': return '-';
    case 'multiply': return '×';
    case 'divide': return '÷';
    case 'power': return '^';
    default: return '';
  }
} 
