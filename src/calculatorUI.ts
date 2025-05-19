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
  let showingHelp = false;

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

  // Help indicator
  const helpIndicator = blessed.text({
    top: 0,
    right: 2,
    content: '? for help',
    align: 'right',
    style: {
      fg: 'gray',
    }
  });

  // Help box with instructions
  const helpBox = blessed.box({
    top: 'center',
    left: 'center',
    width: 60,
    height: 16,
    content: '',
    align: 'center',
    valign: 'middle',
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'blue',
      border: {
        fg: 'white'
      }
    },
    hidden: true
  });

  // Close help button
  const closeHelpButton = blessed.button({
    bottom: 1,
    left: 'center',
    width: 20,
    height: 3,
    content: 'Close Help',
    align: 'center',
    valign: 'middle',
    style: {
      fg: 'black',
      bg: 'white',
      focus: {
        bg: 'green'
      },
      hover: {
        bg: 'green'
      }
    },
    mouse: true
  });

  closeHelpButton.on('press', () => {
    hideHelp();
  });

  // Add help content
  const helpContent = blessed.text({
    top: 0,
    left: 0,
    right: 0,
    bottom: 4,
    padding: 1,
    content: [
      '{center}{bold}Calculator Help{/bold}{/center}',
      '',
      '{bold}Keyboard Controls:{/bold}',
      ' - Numbers: 0-9 keys',
      ' - Decimal: . key',
      ' - Operations: +, -, *, /, ^',
      ' - Equals: = or Enter key',
      ' - Clear: c',
      ' - Memory store: m',
      ' - Memory recall: r',
      ' - Memory clear: x',
      ' - Exit: ESC or q',
      '',
      '{center}Click "Close Help" or press ESC to close{/center}'
    ].join('\n'),
    tags: true
  });

  helpBox.append(helpContent);
  helpBox.append(closeHelpButton);

  // Function to show help
  const showHelp = () => {
    showingHelp = true;
    helpBox.show();
    closeHelpButton.focus();
    screen.render();
  };

  // Function to hide help
  const hideHelp = () => {
    showingHelp = false;
    helpBox.hide();
    container.focus();
    screen.render();
  };

  // Toggle help display
  const toggleHelp = () => {
    if (showingHelp) {
      hideHelp();
    } else {
      showHelp();
    }
  };

  // Update the display
  const updateDisplay = () => {
    display.setContent(displayValue);
    status.setContent(statusText);
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

  // Log function for debugging
  const logToStatus = (msg: string) => {
    statusText = msg;
    updateDisplay();
  };

  // Create calculator buttons using regular boxes instead of buttons
  const createButton = (label: string, top: number, left: number, width: number, height: number, callback: () => void, color: string = 'white', bg: string = 'blue') => {
    const button = blessed.box({
      top,
      left,
      width,
      height,
      content: label,
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
    
    // Handle mouse events
    button.on('click', () => {
      if (showingHelp && callback !== toggleHelp) {
        // Ignore other button clicks when help is showing
        return;
      }
      callback();
      screen.render(); // Force render after click
    });
    
    container.append(button);
    return button;
  };

  // Set up keyboard handlers
  const setupKeyHandlers = () => {
    // Global key handler
    screen.key('escape', () => {
      if (showingHelp) {
        hideHelp();
        return;
      }
      process.exit(0);
    });

    // Help key
    screen.key('?', () => {
      toggleHelp();
    });
    
    // Calculator key handlers (only active when help is not showing)
    screen.key(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], (ch, key) => {
      if (showingHelp) return;
      inputDigit(key.name);
    });

    screen.key('.', () => {
      if (showingHelp) return;
      if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
      }
    });
    
    screen.key('+', () => {
      if (showingHelp) return;
      handleOperator('+');
    });
    
    screen.key('-', () => {
      if (showingHelp) return;
      handleOperator('-');
    });
    
    screen.key('*', () => {
      if (showingHelp) return;
      handleOperator('*');
    });
    
    screen.key('/', () => {
      if (showingHelp) return;
      handleOperator('/');
    });
    
    screen.key('^', () => {
      if (showingHelp) return;
      handleOperator('^');
    });
    
    screen.key(['=', 'return', 'enter'], () => {
      if (showingHelp) {
        hideHelp();
        return;
      }
      handleEquals();
    });
    
    screen.key('c', () => {
      if (showingHelp) return;
      clearCalculator();
    });
    
    screen.key('m', () => {
      if (showingHelp) return;
      memoryStore();
    });
    
    screen.key('r', () => {
      if (showingHelp) return;
      memoryRecall();
    });
    
    screen.key('x', () => {
      if (showingHelp) return;
      memoryClear();
    });
  };

  // Set up all key handlers
  setupKeyHandlers();

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
    });
    col += buttonWidth + 1;
    if (i % 3 === 0) {
      row += buttonHeight + 1;
      col = 1;
    }
  }

  // Zero button
  createButton('0', row, col, buttonWidth, buttonHeight, () => {
    inputDigit('0');
  });

  // Decimal button
  createButton('.', row, col + buttonWidth + 1, buttonWidth, buttonHeight, () => {
    if (!displayValue.includes('.')) {
      displayValue += '.';
      updateDisplay();
    }
  });

  // Operation buttons
  row = 7;
  col = 28;
  
  createButton('+', row, col, buttonWidth, buttonHeight, () => {
    handleOperator('+');
  }, 'white', 'red');
  
  createButton('-', row + buttonHeight + 1, col, buttonWidth, buttonHeight, () => {
    handleOperator('-');
  }, 'white', 'red');
  
  createButton('×', row + (buttonHeight + 1) * 2, col, buttonWidth, buttonHeight, () => {
    handleOperator('*');
  }, 'white', 'red');
  
  createButton('÷', row + (buttonHeight + 1) * 3, col, buttonWidth, buttonHeight, () => {
    handleOperator('/');
  }, 'white', 'red');
  
  // Power button
  createButton('^', row + (buttonHeight + 1) * 4, 1, buttonWidth, buttonHeight, () => {
    handleOperator('^');
  }, 'white', 'magenta');

  // Equals button - highlight this with a different style and make it larger
  createButton('=', row, col + buttonWidth + 1, buttonWidth, buttonHeight, () => {
    handleEquals();
  }, 'black', 'green');
  
  // Clear button
  createButton('C', row + (buttonHeight + 1) * 4, 1 + buttonWidth + 1, buttonWidth, buttonHeight, () => {
    clearCalculator();
  }, 'black', 'yellow');
  
  // Memory buttons
  createButton('M+', row + (buttonHeight + 1) * 4, 1 + (buttonWidth + 1) * 2, buttonWidth, buttonHeight, () => {
    memoryStore();
  }, 'white', 'cyan');
  
  createButton('MR', row + (buttonHeight + 1) * 4, 1 + (buttonWidth + 1) * 3, buttonWidth, buttonHeight, () => {
    memoryRecall();
  }, 'white', 'cyan');
  
  createButton('MC', row + (buttonHeight + 1) * 4 - buttonHeight - 1, 1 + (buttonWidth + 1) * 3, buttonWidth, buttonHeight, () => {
    memoryClear();
  }, 'white', 'cyan');

  // Help button
  createButton('?', 0, 1, 3, 3, () => {
    toggleHelp();
  }, 'white', 'blue');

  // Add components to screen
  container.append(title);
  container.append(display);
  container.append(status);
  container.append(helpIndicator);
  screen.append(container);
  screen.append(helpBox);

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
