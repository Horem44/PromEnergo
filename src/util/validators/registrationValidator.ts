import { emailRegExp } from "./RegExp/RegExp";
import isFormValid from "./isFormValid";

export interface registrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  organisationName: string | undefined;
  phoneNumber: string;
}

export interface registrationValidationResult {
  formIsValid: boolean;
  email: {
    isValid: boolean;
    message: string;
  };
  password: {
    isValid: boolean;
    message: string;
  };
  confirmPassword: {
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
  organisationName: {
    isValid: boolean;
    message: string;
  };
  phoneNumber: {
    isValid: boolean;
    message: string;
  };
}

const registrationValidator = (
  registrationFormData: registrationFormData,
  registrationValidationResult: registrationValidationResult
) => {
  if (
    !emailRegExp.test(registrationFormData.email) ||
    registrationFormData.email.trim().length === 0
  ) {
    registrationValidationResult.email = {
      isValid: false,
      message: "Перевірте правильність вводу вашого Email",
    };
  } else {
    registrationValidationResult.email = {
      isValid: true,
      message: "",
    };
  }

  if (
    registrationFormData.password.length < 6 ||
    registrationFormData.password.trim().length === 0
  ) {
    registrationValidationResult.password = {
      isValid: false,
      message: "Пароль повинен бути більше 6 символів",
    };
  } else {
    registrationValidationResult.password = {
      isValid: true,
      message: "",
    };
  }

  if (
    registrationFormData.confirmPassword !== registrationFormData.password ||
    registrationFormData.confirmPassword.trim().length === 0
  ) {
    registrationValidationResult.confirmPassword = {
      isValid: false,
      message: "Паролі не співпадають",
    };
  } else {
    registrationValidationResult.confirmPassword = {
      isValid: true,
      message: "",
    };
  }

  if (
    registrationFormData.name.length < 2 ||
    registrationFormData.name.trim().length === 0
  ) {
    registrationValidationResult.name = {
      isValid: false,
      message: "Ім'я має бути більше двох символів",
    };
  } else {
    registrationValidationResult.name = {
      isValid: true,
      message: "",
    };
  }

  if (
    registrationFormData.surname.length < 2 ||
    registrationFormData.name.trim().length === 0
  ) {
    registrationValidationResult.surname = {
      isValid: false,
      message: "Прізвище має бути більше двох символів",
    };
  } else {
    registrationValidationResult.surname = {
      isValid: true,
      message: "",
    };
  }

  if (
    registrationFormData.organisationName !== undefined &&
    (registrationFormData.organisationName.length < 2 ||
      registrationFormData.organisationName.trim().length === 0)
  ) {
    registrationValidationResult.organisationName = {
      isValid: false,
      message: "Назва організації має бути більше двох символів",
    };
  } else {
    registrationValidationResult.organisationName = {
      isValid: true,
      message: "",
    };
  }

  if (
    registrationFormData.phoneNumber.length < 10 ||
    registrationFormData.phoneNumber.trim().length === 0
  ) {
    registrationValidationResult.phoneNumber = {
      isValid: false,
      message: "Невірний формат мобільного телефону",
    };
  } else {
    registrationValidationResult.phoneNumber = {
      isValid: true,
      message: "",
    };
  }

  registrationValidationResult.formIsValid = isFormValid(
    registrationValidationResult
  );
  return registrationValidationResult;
};

export default registrationValidator;
