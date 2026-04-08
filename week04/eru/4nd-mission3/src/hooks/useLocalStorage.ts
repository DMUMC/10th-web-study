import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    const removeValue = () => {
        try {
            setStoredValue(initialValue);
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    };

    return { value: storedValue, setValue, removeValue };
}

export default useLocalStorage;