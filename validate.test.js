// Unit tests for validateEmail function
// Using native Node.js assert module - no dependencies

const assert = require('assert');
const { validateEmail } = require('./tools.js');

// Test counter for reporting
let testsPassed = 0;
let testsFailed = 0;

function test(description, shouldPass, email) {
  try {
    const result = validateEmail(email);
    const expected = shouldPass;
    
    if (result === expected) {
      console.log(`✅ PASS: ${description}`);
      console.log(`   Email: "${email}" → ${result}`);
      testsPassed++;
    } else {
      console.log(`❌ FAIL: ${description}`);
      console.log(`   Email: "${email}" → got ${result}, expected ${expected}`);
      testsFailed++;
      throw new Error(`Expected ${expected} but got ${result}`);
    }
  } catch (error) {
    console.error(`❌ ERROR: ${description}`, error.message);
    testsFailed++;
  }
}

console.log('\n========== EMAIL VALIDATOR TESTS ==========\n');

console.log('--- VALID EMAILS ---');
test('Valid email: standard format', true, 'test@example.com');
test('Valid email: with dot in domain', true, 'user.name@domain.co.uk');
test('Valid email: with plus sign', true, 'john+filter@company.com');

console.log('\n--- INVALID EMAILS ---');
test('Invalid: missing @ symbol', false, 'test');
test('Invalid: missing domain', false, 'test@');
test('Invalid: missing username', false, '@example.com');
test('Invalid: missing domain name', false, 'test@.com');
test('Invalid: double @ symbol', false, 'test@@example.com');
test('Invalid: space in email', false, 'test @example.com');
test('Invalid: missing TLD', false, 'test@example');

console.log('\n========== TEST RESULTS ==========');
console.log(`✅ Passed: ${testsPassed}`);
console.log(`❌ Failed: ${testsFailed}`);
console.log(`📊 Total:  ${testsPassed + testsFailed}`);
console.log('====================================\n');

// Exit with error code if any test failed
if (testsFailed > 0) {
  process.exit(1);
}
