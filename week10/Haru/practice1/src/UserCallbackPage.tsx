import React, { useState, useCallback, useMemo } from 'react';
import CountButton from './CountButton';
import TextInput from './TextInput';

export default function UserCallbackPage() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Function to increment count
  const handleIncreaseCount = useCallback((num: number) => {
    setCount(prevCount => prevCount + num);
  }, []); // Empty dependency array means this function is memoized once

  // Function to handle text input changes
  const handleTextChange = useCallback((str: string) => {
    setText(str);
  }, []); // Empty dependency array means this function is memoized once

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">React Hooks: useCallback & memo</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Count: {count}</h2>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Text: {text}</h2>
      </div>
      <div className="flex gap-4">
        <CountButton onClick={() => handleIncreaseCount(10)} />
        <TextInput onChange={handleTextChange} />
      </div>
    </div>
  );
}