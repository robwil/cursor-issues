# Calculator

A simple Node.js calculator CLI application that performs arithmetic operations.

## Installation

```bash
git clone git@github.com:Kartones/cursor-issues.git
cd cursor-issues
npm install
```

## Usage

Run the calculator with two numbers as arguments:

```bash
npm start -- <number1> <number2>
```

or

```bash
node src/calculator.js <number1> <number2>
```

Example:

```bash
npm start -- 5 3
```

Output:
```
Sum: 5 + 3 = 8
Subtract: 5 - 3 = 2
```

## Testing

Run tests with:

```bash
npm test
```

## Available Commands

- `sum`: Adds two numbers together
- `subtract`: Subtracts the second number from the first 