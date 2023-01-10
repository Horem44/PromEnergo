import React, {FormEvent, useRef, useState} from "react";
import classes from "./UserInfo.module.css";
import userInfoValidator, {
    userInfoData,
    userInfoValidationResult,
} from "../../../util/validators/userInfoValidator";

const initialUserInfoValidationResult: userInfoValidationResult = {
    formIsValid: false,
    email: {
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
    phoneNumber: {
        isValid: true,
        message: "",
    },
};

const UserInfo = () => {
    const [userInfoValidationResult, setUserInfoValidationResult] = useState<userInfoValidationResult>(initialUserInfoValidationResult)

    const emailInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const surnameInputRef = useRef<HTMLInputElement>(null);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);


    const userInfoFormSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        const userInfoData: userInfoData = {
            email: emailInputRef.current!.value,
            name: nameInputRef.current!.value,
            surname: surnameInputRef.current!.value,
            phoneNumber: phoneNumberInputRef.current!.value,
        }

        const validationResult = userInfoValidator(userInfoData, userInfoValidationResult);
        setUserInfoValidationResult({...validationResult});

        if (userInfoValidationResult.formIsValid) {
            console.log("Form is valid");
        } else {
            console.log("Form is not valid");
        }

        return;
    }


    return <div className={classes.user_info_container}>
        <form className={classes.user_info_form} onSubmit={userInfoFormSubmitHandler}>
            <label htmlFor="info_email" className={classes.user_info_label}>
                Email
            </label>
            <input
                ref={emailInputRef}
                type="email"
                id="info_email"
                className={`${classes.user_info_input} ${
                    !userInfoValidationResult.email.isValid
                        ? classes.user_info_error_input
                        : ""
                }`}
            />
            {!userInfoValidationResult.email.isValid && (
                <p className={classes.user_info_error}>
                    {userInfoValidationResult.email.message}
                </p>
            )}

            <label htmlFor="info_name" className={classes.user_info_label}>
                Ім'я
            </label>
            <input
                ref={nameInputRef}
                type="text"
                id="info_name"
                className={`${classes.user_info_input} ${
                    !userInfoValidationResult.email.isValid
                        ? classes.user_info_error_input
                        : ""
                }`}
            />
            {!userInfoValidationResult.name.isValid && (
                <p className={classes.user_info_error}>
                    {userInfoValidationResult.name.message}
                </p>
            )}

            <label htmlFor="info_surname" className={classes.user_info_label}>
                Прізвище
            </label>
            <input
                ref={surnameInputRef}
                type="text"
                id="info_surname"
                className={`${classes.user_info_input} ${
                    !userInfoValidationResult.email.isValid
                        ? classes.user_info_error_input
                        : ""
                }`}
            />
            {!userInfoValidationResult.surname.isValid && (
                <p className={classes.user_info_error}>
                    {userInfoValidationResult.surname.message}
                </p>
            )}

            <label htmlFor="info_phone" className={classes.user_info_label}>
                Телефон
            </label>
            <input
                ref={phoneNumberInputRef}
                type="text"
                id="info_phone"
                className={`${classes.user_info_input} ${
                    !userInfoValidationResult.email.isValid
                        ? classes.user_info_error_input
                        : ""
                }`}
            />
            {!userInfoValidationResult.phoneNumber.isValid && (
                <p className={classes.user_info_error}>
                    {userInfoValidationResult.phoneNumber.message}
                </p>
            )}

            <button type='submit' className={classes.user_info_btn}>Зберегти зміни</button>
        </form>
    </div>
}

export default UserInfo;