# Calculator

A simple TypeScript calculator CLI application that performs arithmetic operations.

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

## Technology

This project uses:
- TypeScript for type-safe code
- Jest for testing with ts-jest for TypeScript support
- ts-node for direct execution of TypeScript code
