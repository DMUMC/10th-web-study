import { useReducer, useState, type ChangeEvent } from 'react';

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: 'CHANGE_DEPARTMENT' | 'RESET';
  payload?: string;
}

function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_DEPARTMENT':
      
      const newDepartment = payload; 
      const hasError = newDepartment !== '카드메이커';
      return {
        ...state,
        department: hasError ? state.department : newDepartment,
        error: hasError? '거부권 행사가능, 카드메이커만 입력 가능' :null
      };
    case 'RESET':
      return { department: '소프트웨어 개발자', error: null };
    default:
      return state;
  }
}

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, {
    department: '소프트웨어 개발자',
    error: null,
  });

  const [input, setInput] = useState('');

  return (
 
    <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4'>
      
      <h1 className='text-5xl font-bold'>{state.department}</h1>
      
   
      {state.error && (
        <p className='text-red-500 font-bold'>{state.error}</p>
      )}

      <div className='flex gap-2 w-full max-w-lg'>
        <input 
          className='flex-1 border border-gray-600 bg-gray-800 p-3 rounded text-white'
          value={input} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder='부서를 입력하세요'
        />
        <button 
          className='bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded font-bold'
          onClick={() => dispatch({ type: 'CHANGE_DEPARTMENT', payload: input })}
        >
          직무 변경하기
        </button>
      </div>

      <button 
        className='mt-4 text-gray-400 hover:text-white underline'
        onClick={() => dispatch({ type: 'RESET' })}
      >
        초기화
      </button>
    </div>
  );
}