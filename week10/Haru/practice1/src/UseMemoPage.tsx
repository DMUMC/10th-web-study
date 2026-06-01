import React, { useState, useMemo } from 'react';
import { type ChangeEvent } from 'react';


export default function UseMemoPage() {

  const [limit, setLimit] = useState(10000);

  const primeNumbers = useMemo(() => {

    const max = limit;

    if (max < 2) return [];

    
    const sieve = Array(max + 1).fill(true);
    sieve[0] = false; 
    sieve[1] = false;
 
    for (let i = 2; i * i <= max; i++) {
   
      if (sieve[i]) {
  
        for (let j = i * i; j <= max; j += i) {
          sieve[j] = false;
        }
      }
    }

   
    return sieve.map((isPrime, number) => isPrime ? number : null).filter(Boolean);

  }, [limit]); 

  const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
  };

  return (
    <div className="h-dvh flex flex-col items-center p-4"> 
      <h1 className="text-2xl font-bold mb-4">같이 배우는 리액트 유메모</h1> 

      <div className="flex items-center mb-4">
        <label htmlFor="limitInput" className="mr-2">숫자 입력:</label>
        <input
          id="limitInput"
          value={limit}
          type="number"
          onChange={handleLimitChange}
          className="border p-2 rounded-lg" // Simplified styling
        />
        <span>소수 찾기</span>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {primeNumbers.map((prime) => (
          <span key={prime} className="bg-blue-100 p-1 rounded">
            {prime}
          </span>
        ))}
      </div>
    </div>
  );
}