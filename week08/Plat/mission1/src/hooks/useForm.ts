import { useMemo, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
    initialValues: T;
    validate?: (values: T) => Record<keyof T, string>;
}

export function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>();
    const errors = useMemo<Record<string, string>>(() => {
        if (!validate) return {};

        return validate(values) as Record<string, string>;
    }, [validate, values]);

    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values,
            [name]: text,
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => 
            handleChange(name, e.target.value);
        const onBlur = () => handleBlur(name);

        return {
            value,
            onChange,
            onBlur,
        };
    }

    return { values, errors, touched, getInputProps };
}
