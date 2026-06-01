import React from 'react';

interface ITextInput {
  onChange: (str: string) => void;
}

const TextInput: React.FC<ITextInput> = ({ onChange }) => {
  console.log('TextInput rendered'); // To check re-renders
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className="border p-2 rounded-lg"
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
};

export default React.memo(TextInput);