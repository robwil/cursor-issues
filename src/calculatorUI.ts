#!/usr/bin/env node

import * as blessed from 'blessed';
import { sum } from "./commands/sum";
import { subtract } from "./commands/subtract";
import { multiply } from "./commands/multiply";
import { divide } from "./commands/divide";
import { power } from "./commands/power";

/**
 * Memory functionality for the calculator
 */
class CalculatorMemory {
  private memoryValue: number = 0;

  store(value: number): void {
    this.memoryValue = value;
  }

  recall(): number {
    return this.memoryValue;
  }

  clear(): void {
    this.memoryValue = 0;
  }
}

/**
 * Terminal-based GUI Calculator
 */
export function startCalculatorUI(): void {
  // Create screen
  const screen = blessed.screen({
    smartCSR: true,
    title: 'Terminal Calculator'
  });

  // Help user exit
  screen.key(['escape', 'q', 'C-c'], () => {
    return process.exit(0);
  });

  // Create calculator memory
  const memory = new CalculatorMemory();

  // Calculator state
  let displayValue = '0';
  let firstOperand: number | null = null;
  let waitingForSecondOperand = false;
  let operator: string | null = null;

  // Main container
  const container = blessed.box({
    top: 'center',
    left: 'center',
    width: 40,
    height: 30,
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'blue'
      }
    }
  });

  // Title
  const title = blessed.text({
    top: 0,
    left: 'center',
    content: '📟 Terminal Calculator 📟',
    style: {
      fg: 'white',
      bold: true
    }
  });

  // Display
  const display = blessed.box({
    top: 2,
    right: 1,
    width: 38,
    height: 3,
    content: displayValue,
    align: 'right',
    valign: 'middle',
    border: {
      type: 'line'
    },
    style: {
      fg: 'green',
      bg: 'black',
      border: {
        fg: 'green'
      }
    }
  });

  // Update the display
  const updateDisplay = () => {
    display.setContent(displayValue);
    screen.render();
  };

  // Process digit input
  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      displayValue = digit;
      waitingForSecondOperand = false;
    } else {
      displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    updateDisplay();
  };

  // Process operation
  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand === null) {
      firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation(operator);
      displayValue = String(result);
      firstOperand = result;
    }
    
    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
  };

  // Perform calculation
  const performCalculation = (op: string): number => {
    if (firstOperand === null) return 0;
    
    const secondOperand = parseFloat(displayValue);
    let result = 0;
    
    switch (op) {
      case '+':
        result = sum(firstOperand, secondOperand);
        break;
      case '-':
        result = subtract(firstOperand, secondOperand);
        break;
      case '*':
        result = multiply(firstOperand, secondOperand);
        break;
      case '/':
        try {
          result = divide(firstOperand, secondOperand);
        } catch (e) {
          displayValue = 'Error';
          firstOperand = null;
          waitingForSecondOperand = false;
          operator = null;
          updateDisplay();
          return 0;
        }
        break;
      case '^':
        result = power(firstOperand, secondOperand);
        break;
    }
    
    return result;
  };

  // Handle equals button
  const handleEquals = () => {
    if (!operator || firstOperand === null) return;
    
    const result = performCalculation(operator);
    displayValue = String(result);
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
  };

  // Clear the calculator
  const clearCalculator = () => {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    updateDisplay();
  };

  // Memory functions
  const memoryStore = () => {
    memory.store(parseFloat(displayValue));
  };

  const memoryRecall = () => {
    displayValue = String(memory.recall());
    updateDisplay();
  };

  const memoryClear = () => {
    memory.clear();
  };

  // Create calculator buttons
  const createButton = (label: string, top: number, left: number, width: number, height: number, callback: () => void, color: string = 'white', bg: string = 'blue') => {
    const button = blessed.button({
      top,
      left,
      width,
      height,
      content: label,
      align: 'center',
      valign: 'middle',
      border: {
        type: 'line'
      },
      style: {
        fg: color,
        bg,
        border: {
          fg: color
        },
        focus: {
          bg: 'green'
        },
        hover: {
          bg: 'green'
        }
      }
    });
    
    button.on('press', callback);
    container.append(button);
    return button;
  };

  // Number buttons
  const buttonWidth = 8;
  const buttonHeight = 3;
  let row = 6;
  let col = 1;

  // Numbers 1-9
  for (let i = 1; i <= 9; i++) {
    createButton(String(i), row, col, buttonWidth, buttonHeight, () => inputDigit(String(i)));
    col += buttonWidth + 1;
    if (i % 3 === 0) {
      row += buttonHeight + 1;
      col = 1;
    }
  }

  // Zero button
  createButton('0', row, col, buttonWidth, buttonHeight, () => inputDigit('0'));

  // Decimal button
  createButton('.', row, col + buttonWidth + 1, buttonWidth, buttonHeight, () => {
    if (!displayValue.includes('.')) {
      displayValue += '.';
      updateDisplay();
    }
  });

  // Operation buttons
  row = 6;
  col = 28;
  
  createButton('+', row, col, buttonWidth, buttonHeight, () => handleOperator('+'), 'white', 'red');
  createButton('-', row + buttonHeight + 1, col, buttonWidth, buttonHeight, () => handleOperator('-'), 'white', 'red');
  createButton('×', row + (buttonHeight + 1) * 2, col, buttonWidth, buttonHeight, () => handleOperator('*'), 'white', 'red');
  createButton('÷', row + (buttonHeight + 1) * 3, col, buttonWidth, buttonHeight, () => handleOperator('/'), 'white', 'red');
  
  // Power button
  createButton('^', row + (buttonHeight + 1) * 4, 1, buttonWidth, buttonHeight, () => handleOperator('^'), 'white', 'magenta');
  
  // Equals button
  createButton('=', row + (buttonHeight + 1) * 4, col, buttonWidth, buttonHeight, handleEquals, 'white', 'green');
  
  // Clear button
  createButton('C', row + (buttonHeight + 1) * 4, 1 + buttonWidth + 1, buttonWidth, buttonHeight, clearCalculator, 'black', 'yellow');
  
  // Memory buttons
  createButton('M+', row + (buttonHeight + 1) * 4, 1 + (buttonWidth + 1) * 2, buttonWidth, buttonHeight, memoryStore, 'white', 'cyan');
  createButton('MR', row + (buttonHeight + 1) * 4, 1 + (buttonWidth + 1) * 3, buttonWidth, buttonHeight, memoryRecall, 'white', 'cyan');
  createButton('MC', row + (buttonHeight + 1) * 4 - buttonHeight - 1, 1 + (buttonWidth + 1) * 3, buttonWidth, buttonHeight, memoryClear, 'white', 'cyan');

  // Add components to screen
  container.append(title);
  container.append(display);
  screen.append(container);

  // Focus on container
  container.focus();

  // Render the screen
  screen.render();
}

// If this file is run directly
if (require.main === module) {
  startCalculatorUI();
} 
