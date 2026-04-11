export type UserSignInformation = {
    email: string;
    password: string;
}

function validateUser(values: UserSignInformation) {
    const errors: Record<keyof UserSignInformation, string> = {
        email: "",
        password: "",
    };

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Password must be at least 8~20 characters";
    }

    return errors;
}

function validateSignin(values: UserSignInformation) {
    return validateUser(values);
};
    
export { validateSignin };