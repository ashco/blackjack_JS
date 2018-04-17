const sum = require('./index');

test('adds two numbers together', () => {
  expect(sum(1, 2)).toBe(3);
});