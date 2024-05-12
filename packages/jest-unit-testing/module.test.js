import mut from './module.js'; // MUT = Module Under Test
  test('divides two numbers correctly', () => {
    expect(mut.div(10, 2)).toBe(5);
  });

  test('divides a negative number by a positive number correctly', () => {
    expect(mut.div(-10, 2)).toBe(-5);
  });

  test('divides a positive number by zero results in Infinity', () => {
    expect(mut.div(10, 0)).toBe(Infinity);
  });

  test('divides zero by a non-zero number results in zero', () => {
    expect(mut.div(0, 10)).toBe(0);
  });

  test('returns true if text contains numbers', () => {
    expect(mut.containsNumbers('Hello123')).toBe(true);
  });

  test('returns true if text contains only numbers', () => {
    expect(mut.containsNumbers('123456')).toBe(true);
  });

  test('returns false if text does not contain numbers', () => {
    expect(mut.containsNumbers('Hello')).toBe(false);
  });

  test('returns false if text is empty', () => {
    expect(mut.containsNumbers('')).toBe(false);
  });
