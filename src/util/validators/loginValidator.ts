import {emailRegExp} from "./RegExp/RegExp";
import isFormValid from "./isFormValid";

export interface loginFormData {
  email: string;
  password: string;
}

export interface loginValidationResult {
  formIsValid: boolean;
  email: {
    isValid: boolean;
    message: string;
  };
  password: {
    isValid: boolean;
    message: string;
  };
}

const loginValidator = (
  loginFormData: loginFormData,
  loginValidationResult: loginValidationResult
) => {
  if (
      !emailRegExp.test(loginFormData.email) ||
      loginFormData.email.trim().length === 0
  ) {
    loginValidationResult.email = {
      isValid: false,
      message: "Перевірте правильність вводу вашого Email",
    };
  } else {
    loginValidationResult.email = {
      isValid: true,
      message: "",
    };
  }

  if (
      loginFormData.password.length < 6 ||
      loginFormData.password.trim().length === 0
  ) {
    loginValidationResult.password = {
      isValid: false,
      message: "Пароль повинен бути більше 6 символів",
    };
  } else {
    loginValidationResult.password = {
      isValid: true,
      message: "",
    };
  }

  loginValidationResult.formIsValid = isFormValid(
      loginValidationResult
  );
  return loginValidationResult;
};

export default loginValidator;
