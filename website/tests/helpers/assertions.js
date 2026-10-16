/**
 * Lightweight assertion & test collection framework for WoW Forever E2E Testing.
 */

export class TestCollector {
  constructor(suiteName = 'E2E Test Suite') {
    this.suiteName = suiteName;
    this.currentBlock = '';
    this.tests = [];
    this.passes = 0;
    this.failures = 0;
    this.startTime = Date.now();
  }

  describe(blockName, fn) {
    const prevBlock = this.currentBlock;
    this.currentBlock = prevBlock ? `${prevBlock} > ${blockName}` : blockName;
    try {
      fn();
    } finally {
      this.currentBlock = prevBlock;
    }
  }

  test(testName, fn) {
    const fullName = this.currentBlock ? `${this.currentBlock} -> ${testName}` : testName;
    const start = Date.now();
    try {
      fn();
      const duration = Date.now() - start;
      this.tests.push({
        name: fullName,
        status: 'pass',
        duration
      });
      this.passes++;
    } catch (err) {
      const duration = Date.now() - start;
      this.tests.push({
        name: fullName,
        status: 'fail',
        error: err,
        message: err.message,
        duration
      });
      this.failures++;
    }
  }

  getSummary() {
    return {
      suiteName: this.suiteName,
      total: this.tests.length,
      passes: this.passes,
      failures: this.failures,
      duration: Date.now() - this.startTime,
      tests: this.tests
    };
  }
}

export function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${JSON.stringify(expected)}, but received ${JSON.stringify(actual)}`);
      }
    },
    toEqual(expected) {
      const actualJson = JSON.stringify(actual);
      const expectedJson = JSON.stringify(expected);
      if (actualJson !== expectedJson) {
        throw new Error(`Expected deep equality:\n  Expected: ${expectedJson}\n  Received: ${actualJson}`);
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected truthy value, but received ${actual}`);
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(`Expected falsy value, but received ${actual}`);
      }
    },
    toBeNull() {
      if (actual !== null) {
        throw new Error(`Expected null, but received ${actual}`);
      }
    },
    toBeDefined() {
      if (actual === undefined) {
        throw new Error(`Expected defined value, but received undefined`);
      }
    },
    toContain(item) {
      if (typeof actual === 'string') {
        if (!actual.includes(item)) {
          throw new Error(`Expected string to contain "${item}"`);
        }
      } else if (Array.isArray(actual)) {
        if (!actual.includes(item)) {
          throw new Error(`Expected array to contain item ${JSON.stringify(item)}`);
        }
      } else if (actual && typeof actual === 'object') {
        if (!(item in actual)) {
          throw new Error(`Expected object to have key "${item}"`);
        }
      } else {
        throw new Error(`Cannot call toContain on type ${typeof actual}`);
      }
    },
    toMatch(regex) {
      const r = typeof regex === 'string' ? new RegExp(regex) : regex;
      if (!r.test(String(actual))) {
        throw new Error(`Expected "${actual}" to match pattern ${regex}`);
      }
    },
    toBeGreaterThanOrEqual(val) {
      if (actual < val) {
        throw new Error(`Expected ${actual} >= ${val}`);
      }
    },
    toBeLessThanOrEqual(val) {
      if (actual > val) {
        throw new Error(`Expected ${actual} <= ${val}`);
      }
    },
    toThrow(optPattern) {
      if (typeof actual !== 'function') {
        throw new Error(`Expected a function to test for throwing, got ${typeof actual}`);
      }
      let threw = false;
      let caughtErr = null;
      try {
        actual();
      } catch (err) {
        threw = true;
        caughtErr = err;
      }
      if (!threw) {
        throw new Error(`Expected function to throw an error, but it executed without throwing`);
      }
      if (optPattern && caughtErr) {
        const p = typeof optPattern === 'string' ? new RegExp(optPattern) : optPattern;
        if (!p.test(caughtErr.message)) {
          throw new Error(`Expected thrown error message to match ${optPattern}, got "${caughtErr.message}"`);
        }
      }
    },
    get not() {
      return {
        toBe(expected) {
          if (actual === expected) {
            throw new Error(`Expected NOT ${JSON.stringify(expected)}, but matched`);
          }
        },
        toContain(item) {
          if (typeof actual === 'string' && actual.includes(item)) {
            throw new Error(`Expected string NOT to contain "${item}"`);
          }
          if (Array.isArray(actual) && actual.includes(item)) {
            throw new Error(`Expected array NOT to contain ${JSON.stringify(item)}`);
          }
        },
        toMatch(regex) {
          const r = typeof regex === 'string' ? new RegExp(regex) : regex;
          if (r.test(String(actual))) {
            throw new Error(`Expected "${actual}" NOT to match pattern ${regex}`);
          }
        },
        toBeNull() {
          if (actual === null) {
            throw new Error(`Expected NOT null`);
          }
        }
      };
    }
  };
}
