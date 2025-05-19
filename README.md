# Cursor Issues Calculator

A simple Node.js calculator CLI application that performs arithmetic operations. This repository is used for demonstrating issue management in GitHub.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Command-line interface
- Unit tested

## Installation

```bash
git clone git@github.com:robwil/cursor-issues.git
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
Multiply: 5 * 3 = 15
Divide: 5 / 3 = 1.6666666666666667
```

## Available Operations

- `sum`: Adds two numbers together
- `subtract`: Subtracts the second number from the first 
- `multiply`: Multiplies two numbers together
- `divide`: Divides the first number by the second 

## Testing

Run tests with:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the terms found in the LICENSE file in the root of this repository. 
