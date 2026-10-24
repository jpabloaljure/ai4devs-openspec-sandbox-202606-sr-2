// Simple email validator function using regex
// No imports, no dependencies - pure JavaScript

function validateEmail(email) {
  // Regex pattern explanation:
  // ^[^\s@]+ : starts with one or more characters that are not space or @
  // @ : must have exactly one @
  // [^\s@]+ : one or more characters that are not space or @
  // \. : must have a dot
  // [^\s@]+$ : ends with one or more characters that are not space or @
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Export for Node.js
module.exports = { validateEmail };
