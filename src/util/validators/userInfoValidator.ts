import {emailRegExp} from "./RegExp/RegExp";
import isFormValid from "./isFormValid";

export interface userInfoData {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
}

export interface userInfoValidationResult {
  formIsValid: boolean;
  email: {
    isValid: boolean;
    message: string;
  };
  name: {
    isValid: boolean;
    message: string;
  };
  surname: {
    isValid: boolean;
    message: string;
  };
  phoneNumber: {
    isValid: boolean;
    message: string;
  };
}

const userInfoValidator = (userInfoData:userInfoData, userInfoValidationResult:userInfoValidationResult) => {
  if (
      !emailRegExp.test(userInfoData.email) ||
      userInfoData.email.trim().length === 0
  ) {
    userInfoValidationResult.email = {
      isValid: false,
      message: "Перевірте правильність вводу вашого Email",
    };
  } else {
    userInfoValidationResult.email = {
      isValid: true,
      message: "",
    };
  }

  if (
      userInfoData.name.length < 2 ||
      userInfoData.name.trim().length === 0
  ) {
    userInfoValidationResult.name = {
      isValid: false,
      message: "Ім'я має бути більше двох символів",
    };
  } else {
    userInfoValidationResult.name = {
      isValid: true,
      message: "",
    };
  }

  if (
      userInfoData.surname.length < 2 ||
      userInfoData.name.trim().length === 0
  ) {
    userInfoValidationResult.surname = {
      isValid: false,
      message: "Прізвище має бути більше двох символів",
    };
  } else {
    userInfoValidationResult.surname = {
      isValid: true,
      message: "",
    };
  }

  if (
      userInfoData.phoneNumber.length < 10 ||
      userInfoData.phoneNumber.trim().length === 0
  ) {
    userInfoValidationResult.phoneNumber = {
      isValid: false,
      message: "Невірний формат мобільного телефону",
    };
  } else {
    userInfoValidationResult.phoneNumber = {
      isValid: true,
      message: "",
    };
  }

  userInfoValidationResult.formIsValid = isFormValid(
      userInfoValidationResult
  );
  return userInfoValidationResult;
}

export default userInfoValidator;
