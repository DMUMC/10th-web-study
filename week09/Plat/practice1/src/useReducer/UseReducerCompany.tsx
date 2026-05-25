import { useState, useReducer } from 'react';

interface IState {
    department: string;
    error: string | null;
}

interface IAction {
    type: 'CHANGE_DEPARTMENT' | 'RESET';
    payload?: string;
}

function reducer(state: IState, action: IAction) {
    const { type, payload } = action;

    switch (type) {
        case 'CHANGE_DEPARTMENT':
            const newDepartment = payload;
            const hasError = newDepartment !== 'card marker'    

            return {
                ...state,
                department: hasError ? state.department : newDepartment,
                error: hasError ?
                'Invalid department' 
                : null,
            };
        default:
            return state;
    }
}

export default function UseReducerCompany() {
    const [state, dispatch] = useReducer(reducer, {
        department: 'Software Developer',
        error: null
    })

    const [departmentInput, setDepartmentInput] = useState('');

    const handleChangeDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDepartmentInput(e.target.value);
    };

    return (
        <div>
            <h1>{state.department}</h1>
            {state.error && <p className="text-red-500 font-2xl">{state.error}</p>}

            <input
                className='border-2 border-black'
                placeholder='Change Department'
                value={departmentInput} onChange={handleChangeDepartment} />

            <button onClick={() => dispatch({ 
                type: 'CHANGE_DEPARTMENT', 
                payload: departmentInput })} 
                className='border-2 border-black'>
                    change department
            </button>
        </div>
    )
}