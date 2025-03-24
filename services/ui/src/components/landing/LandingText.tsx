'use client';

import { type FunctionComponent, useEffect, useState } from 'react';

const TEXT = 'Welcome to Patent Maestro!';
const DELAY_MS = 65;

export const LandingText: FunctionComponent = () => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        if (currentIndex < TEXT.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText + TEXT[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, DELAY_MS);
            
            return () => clearTimeout(timeout);
        }
        
        return;
    }, [currentIndex]);
    
    return (
        <h1 className="text-6xl text-center font-bold">
            {currentText}
        </h1>
    );
}
