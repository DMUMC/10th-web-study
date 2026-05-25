import { useReducer, useState } from 'react';

interface IState {
    counter: number;
}

interface IAction {
    type: 'INCREMENT' | 'DECREMENT' | 'RESET';
}

function reducer(state: IState, action: IAction) {
    const { type } = action;

    switch (type) {
        case 'INCREMENT':
            return { 
                ...state,
                counter: state.counter + 1 
            };
        case 'DECREMENT':
            return { 
                ...state, 
                counter: state.counter - 1 
            };
        case 'RESET':
            return { 
                ...state, 
                counter: 0 
            };
        default:
            throw new Error('Unhandled action type');
    }
}

export default function UseReducerPage() {
    const [count, setCount] = useState(0);

    const [state, dispatch] = useReducer(reducer, {
        counter: 0
    })

    const handleIncrement = () => {
        setCount(count + 1);
    };

    return (
        <div className='flex flex-col gap-10 items-center justify-center h-screen'>
            <div className='flex flex-col gap-5'>
                <h1 className="text-3xl">useState</h1>
                <h1 className="text-2xl">useState Count: {count}</h1>
                <button onClick={handleIncrement} className='border-2 border-black'>
                    Increment
                </button>
            </div>
            <div className='flex flex-col gap-5'>
                <h1 className="text-3xl">useReducer</h1>
                <h1 className="text-2xl">useReducer Count: {state.counter}</h1>
                <button onClick={() => dispatch({ type: 'INCREMENT' })} className='border-2 border-black'>
                    Increment
                </button>
                <button onClick={() => dispatch({ type: 'DECREMENT' })} className='border-2 border-black'>
                    Decrement
                </button>
                <button onClick={() => dispatch({ type: 'RESET' })} className='border-2 border-black'>
                    Reset
                </button>
            </div>
        </div>
    )
}