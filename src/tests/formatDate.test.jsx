import '@testing-library/jest-dom';
import formatDate from "../utils/formatDate";

describe('formatDate', () => {
  test('returns empty string when dateString is falsy', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
    expect(formatDate('')).toBe('');
    expect(formatDate(0)).toBe('');
    expect(formatDate(false)).toBe('');
  });

  test('returns dateString when it is already in the correct format', () => {
    const dateString = '01/05/2023';
    expect(formatDate(dateString)).toBe(dateString);
  });

  test('returns formatted date when dateString is in ISO format', () => {
    const dateString = '2023-05-01';
    expect(formatDate(dateString)).toBe('01/05/2023');
  });

  test('returns empty string when dateString is invalid', () => {
    const dateString = 'invalid-date';
    expect(formatDate(dateString)).toBe('');
  });
});
