# CLI Testing with CommonJS Compatibility

This document provides reference implementations for testing CLI applications while maintaining CommonJS compatibility.

## Overview

Modern Node.js has two module systems: CommonJS and ES Modules (ESM). Many testing libraries have moved to ESM-only, which can cause compatibility issues. This guide provides CommonJS-compatible solutions for CLI testing.

## Example CLI Test Implementation

The following implementation uses Node.js built-in modules to test CLI applications:

```typescript
import { spawn } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import { setTimeout } from 'timers';

const sleep = promisify(setTimeout);

/**
 * Creates a test harness for CLI testing with full input/output control
 */
function createCliTest() {
  const cliPath = join(__dirname, '..', 'src', 'calculator.ts');
  const process = spawn('ts-node', [cliPath], { 
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  let stdoutData = '';
  let stderrData = '';
  
  process.stdout.on('data', (data) => {
    stdoutData += data.toString();
  });
  
  process.stderr.on('data', (data) => {
    stderrData += data.toString();
  });
  
  return {
    process,
    getStdout: () => stdoutData,
    getStderr: () => stderrData,
    write: (input: string) => {
      process.stdin.write(input);
    },
    // Helper to send keypress for inquirer navigation
    sendKeypress: (key: string) => {
      if (key === 'down') {
        process.stdin.write('\x1B[B');
      } else if (key === 'up') {
        process.stdin.write('\x1B[A');
      } else if (key === 'enter') {
        process.stdin.write('\n');
      } else if (key === 'space') {
        process.stdin.write(' ');
      }
    },
    waitForOutput: async (predicate: (output: string) => boolean, timeout = 2000) => {
      const startTime = Date.now();
      while (Date.now() - startTime < timeout) {
        if (predicate(stdoutData)) {
          return true;
        }
        await sleep(50);
      }
      return false;
    },
    cleanup: () => {
      if (!process.killed) {
        process.stdin.end();
        process.stdout.destroy();
        process.stderr.destroy();
        process.kill('SIGTERM');
      }
    }
  };
}

// Usage in Jest test
describe('CLI Tests', () => {
  let activeTest: ReturnType<typeof createCliTest> | null = null;
  
  // Clean up after each test
  afterEach(() => {
    if (activeTest) {
      activeTest.cleanup();
      activeTest = null;
    }
  });
  
  test('Test CLI interaction', async () => {
    const cliTest = createCliTest();
    activeTest = cliTest;
    
    // Wait for prompt
    await cliTest.waitForOutput(stdout => stdout.includes('What would you like to do?'));
    
    // Send input
    cliTest.sendKeypress('enter');
    
    // Test output
    expect(cliTest.getStdout()).toContain('Expected text');
  });
});
```

## CommonJS-Compatible UI Packages

For CLI interfaces, use these CommonJS-compatible versions:

| Package | CommonJS-compatible version | ESM-only version (avoid) |
|---------|----------------------------|--------------------------|
| chalk   | `chalk@4.x`                | `chalk@5.x`              |
| inquirer| `inquirer@8.x`             | `inquirer@9.x`           |
| execa   | `execa@5.x`                | `execa@6.x`              |

## Troubleshooting CommonJS/ESM Issues

### Symptoms of ESM Compatibility Issues

- `Error [ERR_REQUIRE_ESM]`: The module is ESM-only and can't be used with require()
- `SyntaxError: Cannot use import statement outside a module`
- `ReferenceError: require is not defined`

### Solutions

1. **Use CommonJS-compatible versions** as shown in the table above
2. **Create a dynamic import wrapper:**

```javascript
// dynamicImport.js
async function importModule(moduleName) {
  return await import(moduleName);
}

module.exports = { importModule };
```

3. **Use .cjs file extension** for CommonJS modules when needed

## Testing Tools Compatibility

| Tool | CommonJS Compatible? | Notes |
|------|---------------------|-------|
| Jest | Yes | Set `"type": "commonjs"` in package.json |
| Mocha | Yes | With proper configuration |
| cli-testing-library | No | ESM-only, use implementation above instead |
| AVA | Mixed | Requires configuration | 
