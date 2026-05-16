export type UserSigninInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserSigninInformation) {
    const errors = {
        email: "",
        password: "",
    };

    if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
    ) {
        errors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (values.password.length > 0 && values.password.length < 8) {
        errors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    return errors;
}

function validateSignin(values: UserSigninInformation) {
    return validateUser(values);
}

export { validateSignin };