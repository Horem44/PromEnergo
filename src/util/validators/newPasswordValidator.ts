import isFormValid from "./isFormValid";

export interface newPasswordData {
    password: string;
    confirmPassword: string;
}

export interface newPasswordValidationResult{
    formIsValid: boolean;
    password: {
        isValid: boolean;
        message: string;
    };
    confirmPassword: {
        isValid: boolean;
        message: string;
    };
}

const newPasswordValidator = (newPasswordData:newPasswordData, newPasswordValidationResult:newPasswordValidationResult) => {
    if (
        newPasswordData.password.length < 6 ||
        newPasswordData.password.trim().length === 0
    ) {
        newPasswordValidationResult.password = {
            isValid: false,
            message: "Пароль має бути більше 6 символів",
        };
    } else {
        newPasswordValidationResult.password = {
            isValid: true,
            message: "",
        };
    }

    if (
        newPasswordData.confirmPassword.length < 6 ||
        newPasswordData.confirmPassword !== newPasswordData.password ||
        newPasswordData.confirmPassword.trim().length === 0
    ) {
        newPasswordValidationResult.confirmPassword = {
            isValid: false,
            message: "Паролі не співпадають",
        };
    } else {
        newPasswordValidationResult.confirmPassword = {
            isValid: true,
            message: "",
        };
    }

    newPasswordValidationResult.formIsValid = isFormValid(
        newPasswordValidationResult
    );

    return newPasswordValidationResult;
}

export default newPasswordValidator;
