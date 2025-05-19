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
    title: 'Terminal Calculator',
    debug: true
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
  let statusText = 'Ready';
  let keyboardModeActive = false;

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

  // Status line
  const status = blessed.text({
    top: 5,
    right: 1,
    width: 38,
    content: statusText,
    align: 'right',
    style: {
      fg: 'yellow'
    }
  });

  // Keyboard mode indicator
  const keyboardIndicator = blessed.box({
    top: 5,
    left: 1,
    width: 15,
    height: 1,
    content: '⌨️ OFF',
    align: 'left',
    tags: true,
    style: {
      fg: 'gray',
      bold: true
    }
  });

  // Update the display
  const updateDisplay = () => {
    display.setContent(displayValue);
    status.setContent(statusText);
    keyboardIndicator.setContent(keyboardModeActive ? '{bold}{green-fg}⌨️ ON{/}' : '{gray-fg}⌨️ OFF{/}');
    screen.render();
  };

  // Process digit input
  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      displayValue = digit;
      waitingForSecondOperand = false;
      statusText = `${firstOperand} ${getSymbol(operator)} ...`;
    } else {
      displayValue = displayValue === '0' ? digit : displayValue + digit;
      statusText = 'Entering number...';
    }
    updateDisplay();
  };

  // Get symbol for operator
  const getSymbol = (op: string | null): string => {
    if (!op) return '';
    switch (op) {
      case '+': return '+';
      case '-': return '-';
      case '*': return '×';
      case '/': return '÷';
      case '^': return '^';
      default: return op;
    }
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
    statusText = `${firstOperand} ${getSymbol(operator)}`;
    updateDisplay();
  };

  // Perform calculation
  const performCalculation = (op: string): number => {
    if (firstOperand === null) return 0;
    
    const secondOperand = parseFloat(displayValue);
    let result = 0;
    
    try {
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
          result = divide(firstOperand, secondOperand);
          break;
        case '^':
          result = power(firstOperand, secondOperand);
          break;
      }
      
      statusText = `${firstOperand} ${getSymbol(op)} ${secondOperand} = ${result}`;
      return result;
    } catch (e) {
      displayValue = 'Error';
      if (e instanceof Error) {
        statusText = e.message;
      } else {
        statusText = 'Error in calculation';
      }
      firstOperand = null;
      waitingForSecondOperand = false;
      operator = null;
      updateDisplay();
      return 0;
    }
  };

  // Handle equals button
  const handleEquals = () => {
    if (!operator || firstOperand === null) {
      statusText = 'No operation to perform';
      updateDisplay();
      return;
    }
    
    const secondOperand = parseFloat(displayValue);
    const result = performCalculation(operator);
    displayValue = String(result);
    statusText = `${firstOperand} ${getSymbol(operator)} ${secondOperand} = ${result}`;
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
    statusText = 'Cleared';
    updateDisplay();
  };

  // Memory functions
  const memoryStore = () => {
    memory.store(parseFloat(displayValue));
    statusText = `Stored ${displayValue} in memory`;
    updateDisplay();
  };

  const memoryRecall = () => {
    displayValue = String(memory.recall());
    statusText = `Recalled ${displayValue} from memory`;
    updateDisplay();
  };

  const memoryClear = () => {
    memory.clear();
    statusText = `Memory cleared`;
    updateDisplay();
  };

  // Create calculator buttons using regular boxes instead of buttons
  const createButton = (label: string, top: number, left: number, width: number, height: number, callback: () => void, color: string = 'white', bg: string = 'blue', keyChar: string | null = null) => {
    const buttonLabel = keyChar ? `${label} (${keyChar})` : label;
    
    const button = blessed.box({
      top,
      left,
      width,
      height,
      content: buttonLabel,
      align: 'center',
      valign: 'middle',
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        fg: color,
        bg,
        border: {
          fg: color
        },
        hover: {
          bg: 'green'
        }
      },
      clickable: true,
      mouse: true
    });
    
    // Store a reference to the button if it has a key shortcut
    if (keyChar) {
      buttonRefs[keyChar] = { element: button, originalBg: bg };
    }
    
    // Handle mouse events
    button.on('click', () => {
      callback();
      screen.render(); // Force render after click
    });
    
    container.append(button);
    return button;
  };

  // Store references to buttons for keyboard highlighting
  const buttonRefs: Record<string, { element: blessed.Widgets.BoxElement, originalBg: string }> = {};

  // Highlight button when key is pressed
  const highlightButton = (key: string) => {
    if (buttonRefs[key]) {
      const { element, originalBg } = buttonRefs[key];
      // Flash the button
      element.style.bg = 'white';
      element.style.fg = 'black';
      screen.render();
      
      // Reset after a short delay
      setTimeout(() => {
        element.style.bg = originalBg;
        element.style.fg = originalBg === 'yellow' || originalBg === 'green' ? 'black' : 'white';
        screen.render();
      }, 150);
    }
  };

  // Toggle keyboard mode
  const toggleKeyboardMode = () => {
    keyboardModeActive = !keyboardModeActive;
    statusText = keyboardModeActive ? 'Keyboard mode activated' : 'Keyboard mode deactivated';
    updateDisplay();
  };

  // Add keyboard support for number keys, operations, and equals
  screen.key(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], (ch, key) => {
    inputDigit(key.name);
    highlightButton(key.name);
  });

  screen.key('.', () => {
    if (!displayValue.includes('.')) {
      displayValue += '.';
      updateDisplay();
    }
    highlightButton('.');
  });
  
  screen.key('+', () => {
    handleOperator('+');
    highlightButton('+');
  });
  
  screen.key('-', () => {
    handleOperator('-');
    highlightButton('-');
  });
  
  screen.key('*', () => {
    handleOperator('*');
    highlightButton('*');
  });
  
  screen.key('/', () => {
    handleOperator('/');
    highlightButton('/');
  });
  
  screen.key('^', () => {
    handleOperator('^');
    highlightButton('^');
  });
  
  screen.key(['=', 'return', 'enter'], () => {
    handleEquals();
    highlightButton('=');
  });
  
  screen.key('c', () => {
    clearCalculator();
    highlightButton('c');
  });
  
  screen.key('m', () => {
    memoryStore();
    highlightButton('m');
  });
  
  screen.key('r', () => {
    memoryRecall();
    highlightButton('r');
  });
  
  screen.key('x', () => {
    memoryClear();
    highlightButton('x');
  });

  // Toggle keyboard mode with F1 key
  screen.key('f1', toggleKeyboardMode);

  // Number buttons
  const buttonWidth = 8;
  const buttonHeight = 3;
  let row = 7;
  let col = 1;

  // Numbers 1-9
  for (let i = 1; i <= 9; i++) {
    const digit = String(i);
    createButton(digit, row, col, buttonWidth, buttonHeight, () => {
      inputDigit(digit);
    }, 'white', 'blue', digit);
    col += buttonWidth + 1;
    if (i % 3 === 0) {
      row += buttonHeight + 1;
      col = 1;
    }
  }

  // Zero button
  createButton('0', row, col, buttonWidth, buttonHeight, () => {
    inputDigit('0');
  }, 'white', 'blue', '0');

  // Decimal button
  createButton('.', row, col + buttonWidth + 1, buttonWidth, buttonHeight, () => {
    if (!displayValue.includes('.')) {
      displayValue += '.';
      updateDisplay();
    }
  }, 'white', 'blue', '.');

  // Operation buttons
  row = 7;
  col = 28;
  
  createButton('+', row, col, buttonWidth, buttonHeight, () => {
    handleOperator('+');
  }, 'white', 'red', '+');
  
  createButton('-', row + buttonHeight + 1, col, buttonWidth, buttonHeight, () => {
    handleOperator('-');
  }, 'white', 'red', '-');
  
  createButton('×', row + (buttonHeight + 1) * 2, col, buttonWidth, buttonHeight, () => {
    handleOperator('*');
  }, 'white', 'red', '*');
  
  createButton('÷', row + (buttonHeight + 1) * 3, col, buttonWidth, buttonHeight, () => {
    handleOperator('/');
  }, 'white', 'red', '/');
  
  // Power button
  createButton('^', row + (buttonHeight + 1) * 4, 1, buttonWidth, buttonHeight, () => {
    handleOperator('^');
  }, 'white', 'magenta', '^');
  
  // Equals button - highlight this with a different style
  createButton('=', row + (buttonHeight + 1) * 4, col, buttonWidth, buttonHeight, () => {
    handleEquals();
  }, 'black', 'green', '=');
  
  // Clear button
  createButton('C', row + (buttonHeight + 1) * 4, 1 + buttonWidth + 1, buttonWidth, buttonHeight, () => {
    clearCalculator();
  }, 'black', 'yellow', 'c');
  
  // Memory buttons
  createButton('M+', row + (buttonHeight + 1) * 4, 1 + (buttonWidth + 1) * 2, buttonWidth, buttonHeight, () => {
    memoryStore();
  }, 'white', 'cyan', 'm');
  
  createButton('MR', row + (buttonHeight + 1) * 4, 1 + (buttonWidth + 1) * 3, buttonWidth, buttonHeight, () => {
    memoryRecall();
  }, 'white', 'cyan', 'r');
  
  createButton('MC', row + (buttonHeight + 1) * 4 - buttonHeight - 1, 1 + (buttonWidth + 1) * 3, buttonWidth, buttonHeight, () => {
    memoryClear();
  }, 'white', 'cyan', 'x');

  // Keyboard mode toggle
  createButton('F1: ⌨️', 1, 2, 10, 3, () => {
    toggleKeyboardMode();
  }, 'black', 'white');

  // Add components to screen
  container.append(title);
  container.append(display);
  container.append(status);
  container.append(keyboardIndicator);
  screen.append(container);

  // Add instruction text
  const instructions = blessed.text({
    bottom: 0,
    left: 'center',
    content: 'Mouse: Click buttons | Keyboard: Numbers, +, -, *, /, ^, =, Enter, c, m, r, x | F1: Toggle keyboard | ESC/q to exit',
    style: {
      fg: 'white',
    }
  });
  
  container.append(instructions);

  // Enable mouse support
  screen.enableMouse();

  // Focus on container
  container.focus();

  // Render the screen
  screen.render();
  
  // Periodically re-render to ensure display updates are visible
  setInterval(() => {
    screen.render();
  }, 100);
}

// If this file is run directly
if (require.main === module) {
  startCalculatorUI();
} 
