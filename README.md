# Calculator

A simple Node.js calculator CLI application that performs arithmetic operations.

## Installation

```bash
git clone git@github.com:robwil/cursor-issues.git
cd cursor-issues
pnpm install
```

## Usage

Run the calculator with two numbers as arguments:

```bash
pnpm start <number1> <number2>
```

or

```bash
node src/calculator.mjs <number1> <number2>
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
```

## Testing

Run all tests with:

```bash
pnpm test
```

Run specific tests:

```bash
pnpm test:sum
pnpm test:subtract
pnpm test:multiply
pnpm test:divide
```

## Available Commands

- `sum`: Adds two numbers together
- `subtract`: Subtracts the second number from the first 
- `multiply`: Multiplies two numbers together
- `divide`: Divides the first number by the second 
