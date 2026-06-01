import React from 'react';

interface ICountButton {
  onClick: () => void;
}

const CountButton: React.FC<ICountButton> = ({ onClick }) => {
  console.log('CountButton rendered'); 
  return (
    <button
      className="border p-2 rounded-lg bg-blue-500 text-white"
      onClick={onClick}
    >
      Increase Count by 10
    </button>
  );
};

export default React.memo(CountButton); 