import React, {FormEvent, useRef, useState} from "react";
import classes from "./ChangePassword.module.css";
import changePasswordValidator, {
    changePasswordData,
    changePasswordValidationResult,
} from "../../../util/validators/changePasswordValidator";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutRequest} from "../../../Store/auth-slice";
import {AnyAction} from "@reduxjs/toolkit";
import {Blocks} from "react-loader-spinner";
import {showSuccessNotification, showWarningNotification} from "../../../util/Notifications/notifications";

const initialChangePasswordValidationResult: changePasswordValidationResult = {
    formIsValid: false,
    email: {
        isValid: true,
        message: "",
    },
};

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const [changePasswordValidationResult, setChangePasswordValidationResult] =
        useState<changePasswordValidationResult>(initialChangePasswordValidationResult)

    const changePasswordFormSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        const changePasswordData: changePasswordData = {
            email: emailInputRef.current!.value
        }

        const validationResult = changePasswordValidator(changePasswordData, changePasswordValidationResult);
        setChangePasswordValidationResult({...validationResult});

        if (changePasswordValidationResult.formIsValid) {
            setIsLoading(true);
            fetch('http://localhost:8080/users/reset/', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: changePasswordData.email}),
                credentials: "include"
            }).then(res => {
                return res.json();
            }).then(res => {
                console.log(res);
                if (res.isNotAuth) {
                    showWarningNotification('Час дії сесії вичерпано');
                    dispatch(logoutRequest() as unknown as AnyAction);
                    setIsLoading(false);
                    history.push('/login');
                    return;
                }

                showSuccessNotification('Лист надіслано на пошту');
                setIsLoading(false);
                history.push('/');
                return;
            }).catch(err => {
                console.log(err);
                setIsLoading(false);
                return;
            })
        } else {
            console.log("Form is not valid");
            showWarningNotification("Введіть правильні дані")
            setIsLoading(false);
        }

        return;
    }

    return (
        <div className={classes.change_password_container}>
            <form className={classes.change_password_form} onSubmit={changePasswordFormSubmitHandler}>
                <Blocks
                    visible={isLoading}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                {!isLoading && <>
                    <label htmlFor="reg_email" className={classes.change_password_label}>
                        Email
                    </label>
                    <input
                        ref={emailInputRef}
                        type="email"
                        id="reg_email"
                        className={`${classes.change_password_input} ${!changePasswordValidationResult.email.isValid
                            ? classes.change_password_error_input : ''}`}
                    />
                    {!changePasswordValidationResult.email.isValid && (
                        <p className={classes.change_password_error}>
                            {changePasswordValidationResult.email.message}
                        </p>
                    )}

                    <button type='submit' className={classes.change_password_btn}>Змінити пароль</button>
                </>}
            </form>
        </div>
    );
};

export default ChangePassword;