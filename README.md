# Calculator

A simple TypeScript calculator CLI application that performs arithmetic operations.

## Installation

```bash
git clone git@github.com:robwil/cursor-issues.git
cd cursor-issues
pnpm install
```

## Usage

### Command-Line Mode

Run the calculator with two numbers as arguments:

```bash
pnpm start <number1> <number2>
```

Example:

```bash
pnpm start 5 3
```

Output:
```
Sum: 5 + 3 = 8
Subtract: 5 - 3 = 2
Multiply: 5 * 3 = 15
Divide: 5 / 3 = 1.6666666666666667
Power: 5 ^ 3 = 125
```

### Interactive Mode

Run the calculator without arguments to start the interactive mode:

```bash
pnpm start
```

This launches a user-friendly interface where you can:
- Choose operations using arrow keys
- Input numbers when prompted
- See formatted results with proper decimal places
- Perform multiple calculations in succession

## Development

If you want to compile the TypeScript files:

```bash
pnpm build
```

This will create JavaScript files in the `dist` directory.

## Testing

Run all tests with:

```bash
pnpm test
```

The project uses Jest projects to organize tests:

```bash
# Run only unit tests
pnpm test:unit

# Run only integration tests
pnpm test:integration

# Run a specific test file
pnpm test tests/sum.test.ts

# Run tests with name pattern
pnpm test -t "adds two numbers"
```

## Available Commands

- `sum`: Adds two numbers together
- `subtract`: Subtracts the second number from the first 
- `multiply`: Multiplies two numbers together
- `divide`: Divides the first number by the second
- `power`: Raises the first number to the power of the second number

## Technology

This project uses:
- TypeScript for type-safe code
- Jest for testing with ts-jest for TypeScript support
- ts-node for direct execution of TypeScript code
- BigNumber.js for handling large number calculations
- pnpm for package management
- inquirer for interactive command-line interfaces
- chalk for colorful terminal output

## Project Structure

The project is set up as a pnpm workspace with the following structure:
- `src/` - Contains the calculator source code
- `src/commands/` - Individual math operations
- `src/interactiveMode.ts` - Interactive CLI interface
- `tests/` - Test files for each operation
- `docs/` - Project documentation
- `dist/` - Compiled JavaScript output
