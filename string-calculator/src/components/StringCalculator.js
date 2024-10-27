import React, { useState } from 'react';
import './StringCalculator.css';

function StringCalculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);
    const [error, setError] = useState('');

    function add(numbers) {
        if (numbers === "") return 0;
    
        let delimiters = [',','\\n'];
    
        if (numbers.startsWith("//")) {
            
            const parts = numbers.split(";");
            const customDelimiter = parts[0].slice(2); 
            delimiters.push(customDelimiter); 

            numbers = parts.slice(1).join("\n"); 
        }
    
        
        delimiters.forEach(delimiter => {
            numbers = numbers.split(delimiter).join(','); 
        });

        const numArray = numbers.split(',')
            .map(num => parseInt(num, 10))
            .filter(num => !isNaN(num)); 

        const negatives = numArray.filter(num => num < 0);
        if (negatives.length > 0) {
            throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
        }
    
        return numArray.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
    }
    
    
    
        
    const handleCalculate = () => {
        setError('');
        try {
            const sum = add(input);
            setResult(sum);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='container'>
            <h1 className='heading'>String Calculator</h1>
            <textarea 
                className='textarea'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers here..."
            />
            <button 
                className='button'
                onClick={handleCalculate}
            >
                Calculate
            </button>
            {error && <div className='error'>{error}</div>}
            <div className='result'>Result: {result}</div>
        </div>
    );
}

export default StringCalculator;
