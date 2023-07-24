import sum from '../Sum';

// Test case 1
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// Test case 2
test('adds -5 + 5 to equal 0', () => {
  expect(sum(-5, 5)).toBe(0);
});