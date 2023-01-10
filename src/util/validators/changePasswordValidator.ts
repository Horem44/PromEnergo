import isFormValid from "./isFormValid";
import {emailRegExp} from "./RegExp/RegExp";

export interface changePasswordData {
    email: string
}

export interface changePasswordValidationResult{
    formIsValid: boolean;
    email: {
        isValid: boolean;
        message: string;
    };
}

const changePasswordValidator = (changePasswordData:changePasswordData, changePasswordValidationResult:changePasswordValidationResult) => {
    if (
        !emailRegExp.test(changePasswordData.email) ||
        changePasswordData.email.trim().length === 0
    ) {
        changePasswordValidationResult.email = {
            isValid: false,
            message: "Перевірте правильність вводу вашого Email",
        };
    } else {
        changePasswordValidationResult.email = {
            isValid: true,
            message: "",
        };
    }

    changePasswordValidationResult.formIsValid = isFormValid(
        changePasswordValidationResult
    );
    return changePasswordValidationResult;
}

export default changePasswordValidator;
