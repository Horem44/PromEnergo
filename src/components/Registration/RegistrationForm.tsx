import React, { FormEvent, useRef, useState } from "react";
import classes from "./RegistrationForm.module.css";
import registrationValidator, {
  registrationFormData,
  registrationValidationResult,
} from "../../util/validators/registrationValidator";
import {useHistory} from "react-router-dom";

const initialRegistrationValidationResult: registrationValidationResult = {
  formIsValid: false,
  email: {
    isValid: true,
    message: "",
  },
  password: {
    isValid: true,
    message: "",
  },
  confirmPassword: {
    isValid: true,
    message: "",
  },
  name: {
    isValid: true,
    message: "",
  },
  surname: {
    isValid: true,
    message: "",
  },
  organisationName: {
    isValid: true,
    message: "",
  },
  phoneNumber: {
    isValid: true,
    message: "",
  },
};

const RegistrationForm = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isUserEntity, setIsUserEntity] = useState<boolean>(false);

  const [
    registrationFormValidationResult,
    setRegistrationFormValidationResult,
  ] = useState<registrationValidationResult>(
    initialRegistrationValidationResult
  );

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const surnameInputRef = useRef<HTMLInputElement>(null);
  const organisationNameInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const userIsEntityHandler = () => {
    setIsUserEntity(true);
  };

  const userIsNotEntityHandler = () => {
    setIsUserEntity(false);
  };

  const registrationFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const registrationFormData: registrationFormData = {
      email: emailInputRef.current!.value,
      password: passwordInputRef.current!.value,
      confirmPassword: confirmPasswordInputRef.current!.value,
      name: nameInputRef.current!.value,
      surname: surnameInputRef.current!.value,
      organisationName: organisationNameInputRef.current?.value,
      phoneNumber: phoneNumberInputRef.current!.value,
    };

    const validationResult = registrationValidator(
      registrationFormData,
      registrationFormValidationResult
    );

    setRegistrationFormValidationResult({ ...validationResult });

    if (registrationFormValidationResult.formIsValid) {
      const res = await fetch('http://localhost:8080/users/registration', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationFormData)
      });

      if(res.status !== 200){
        const resJson = await res.json();
        setErrorMessage(resJson.message);
        return;
      }

      history.push('/');
    } else {
      console.log("Form is not valid");
    }
    return;
  };

  return (
    <div className={classes.registration_form_container}>
      <form
        className={classes.registration_form}
        onSubmit={registrationFormSubmitHandler}
      >
        <label htmlFor="reg_email" className={classes.registration_form_label}>
          Email
        </label>
        <input
          ref={emailInputRef}
          type="email"
          id="reg_email"
          className={`${classes.registration_form_input} ${
            !registrationFormValidationResult.email.isValid
              ? classes.registration_form_error_input
              : ""
          }`}
        />
        {!registrationFormValidationResult.email.isValid && (
          <p className={classes.registration_form_error}>
            {registrationFormValidationResult.email.message}
          </p>
        )}

        <label htmlFor="reg_pas" className={classes.registration_form_label}>
          Пароль
        </label>
        <input
          ref={passwordInputRef}
          type="password"
          id="reg_pas"
          className={`${classes.registration_form_input} ${
            !registrationFormValidationResult.password.isValid
              ? classes.registration_form_error_input
              : ""
          }`}
        />
        {!registrationFormValidationResult.password.isValid && (
          <p className={classes.registration_form_error}>
            {registrationFormValidationResult.password.message}
          </p>
        )}

        <label
          htmlFor="reg_confirm_pas"
          className={classes.registration_form_label}
        >
          Введіть пароль повторно
        </label>
        <input
          ref={confirmPasswordInputRef}
          type="password"
          id="reg_confirm_pas"
          className={`${classes.registration_form_input} ${
            !registrationFormValidationResult.confirmPassword.isValid
              ? classes.registration_form_error_input
              : ""
          }`}
        />
        {!registrationFormValidationResult.confirmPassword.isValid && (
          <p className={classes.registration_form_error}>
            {registrationFormValidationResult.confirmPassword.message}
          </p>
        )}

        <label htmlFor="reg_name" className={classes.registration_form_label}>
          Ваше ім'я
        </label>
        <input
          ref={nameInputRef}
          type="text"
          id="reg_name"
          className={`${classes.registration_form_input} ${
            !registrationFormValidationResult.name.isValid
              ? classes.registration_form_error_input
              : ""
          }`}
        />
        {!registrationFormValidationResult.name.isValid && (
          <p className={classes.registration_form_error}>
            {registrationFormValidationResult.name.message}
          </p>
        )}

        <label
          htmlFor="reg_surname"
          className={classes.registration_form_label}
        >
          Ваше прізвище
        </label>
        <input
          ref={surnameInputRef}
          type="text"
          id="reg_surname"
          className={`${classes.registration_form_input} ${
            !registrationFormValidationResult.surname.isValid
              ? classes.registration_form_error_input
              : ""
          }`}
        />
        {!registrationFormValidationResult.surname.isValid && (
          <p className={classes.registration_form_error}>
            {registrationFormValidationResult.surname.message}
          </p>
        )}

        <div className={classes.registration_form_user_type}>
          <label
            htmlFor="reg_entity"
            className={classes.registration_form_label_radio}
          >
            Юридична особа
          </label>
          <input
            type="radio"
            onClick={userIsEntityHandler}
            id="reg_entity"
            name="reg_user_type"
            className={classes.registration_form_input_radio}
          />
        </div>

        <div className={classes.registration_form_user_type}>
          <label
            htmlFor="reg_individual"
            className={classes.registration_form_label_radio}
          >
            Фізична особа
          </label>
          <input
            type="radio"
            onClick={userIsNotEntityHandler}
            id="reg_individual"
            name="reg_user_type"
            className={classes.registration_form_input_radio}
          />
        </div>

        {isUserEntity && (
          <>
            <label
              htmlFor="reg_entity_user"
              className={classes.registration_form_label}
            >
              Назва організації
            </label>
            <input
              ref={organisationNameInputRef}
              type="text"
              id="reg_entity_user"
              className={`${classes.registration_form_input} ${
                !registrationFormValidationResult.organisationName.isValid
                  ? classes.registration_form_error_input
                  : ""
              }`}
            />
            {!registrationFormValidationResult.organisationName.isValid && (
              <p className={classes.registration_form_error}>
                {registrationFormValidationResult.organisationName.message}
              </p>
            )}
          </>
        )}

        <label htmlFor="reg_phone" className={classes.registration_form_label}>
          Номер мобільного телефону
        </label>
        <input
          ref={phoneNumberInputRef}
          type="text"
          id="reg_phone"
          className={`${classes.registration_form_input} ${
            !registrationFormValidationResult.phoneNumber.isValid
              ? classes.registration_form_error_input
              : ""
          }`}
        />
        {!registrationFormValidationResult.phoneNumber.isValid && (
          <p className={classes.registration_form_error}>
            {registrationFormValidationResult.phoneNumber.message}
          </p>
        )}
        {errorMessage &&
            <p className={classes.registration_form_error}>
              {errorMessage}
            </p>}
        <button type="submit" className={classes.registration_form_button}>
          Реєстрація
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
