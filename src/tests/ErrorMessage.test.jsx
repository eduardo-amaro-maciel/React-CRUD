import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ErrorMessage from '../components/ErrorMessage';
import { describe, test } from 'vitest';

describe('ErrorMessage', () => {
  test('renders the error message', () => {
    const errorMessage = 'There was an error';
    const { getByText } = render(<ErrorMessage>{errorMessage}</ErrorMessage>);
    expect(getByText(errorMessage)).toBeInTheDocument(); 
  });
});
