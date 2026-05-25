import { ChangeEvent, useEffect, useState } from "react";

//함수의 규격을 줌
interface UseFormProps<T> {
    initialValue: T; //{email:'', password:''} 이런식으로 들어올거임
    //값이 올바른지 검증하는 함수.
    validate: (values: T) => Record<keyof T, string>; //values 값이 올바른지 체크
}

//T는 제네릭을 말하는거임
function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
    //여기서 값들을 관리할거임 useState로 쓰려했던 로그인, 이메일 값들
    //useState가 아닌 객체롤 관리하려했던걸 hook으로 관리하는거라 생각하면 됨
    const [values, setValues] = useState(initialValue);

    const [touched, setTouched] = useState<Record<string, boolean>>();
    //에러메시지를 넣고, 출력해주기 위해 string, string으로 관리
    //키와 value가 string이다고 이해하면 됨
    const [errors, setErrors] = useState<Record<string, string>>();

    //사용자가 입력값을 바꿀 때 실행되는 함수
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, //불변성 유지(기존 값 유지) ex_이메일 변경했는데 비밀번호 바뀌면 안되니까
            //name 값 찾아서 text로 바꿔주는거임
            [name]: text,
        });
    };

    //text가 아닌 boolean인 차이
    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        })
    }

    //이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
    const getInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleChange(name, e.target.value);
        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    }

    //values가 변경될 때 마다 에러 검증 로직이 실행됨
    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors); //오류 메시지 업뎃
    }, [validate, values]); //validate와 values가 변경될 때마다 useEffect가 실행됨

    return { values, errors, touched, getInputProps };
}

export default useForm;