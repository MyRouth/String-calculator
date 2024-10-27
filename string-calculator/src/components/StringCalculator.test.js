import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StringCalculator from './StringCalculator';

describe('StringCalculator Component', () => {
    test('renders String Calculator heading', () => {
        render(<StringCalculator />);
        const heading = screen.getByText(/String Calculator/i);
        expect(heading).toBeInTheDocument();
    });

    test('returns 0 for empty input', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers here.../i), { target: { value: '' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(screen.getByText(/Result: 0/i)).toBeInTheDocument();
    });

    test('returns the number for single input', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers here.../i), { target: { value: '5' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(screen.getByText(/Result: 5/i)).toBeInTheDocument();
    });

    test('returns the sum of two comma-separated numbers', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers here.../i), { target: { value: '1,5' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
    });

    test('supports custom delimiters', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers here.../i), { target: { value: '//;\n1;2;3' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
    });


    test('ignores numbers greater than 1000', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/Enter numbers here.../i), { target: { value: '1001,2' } });
        fireEvent.click(screen.getByText(/Calculate/i));
        expect(screen.getByText(/Result: 2/i)).toBeInTheDocument();
    });
});
