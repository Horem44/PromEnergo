import React, {FormEvent, useEffect, useRef, useState} from "react";
import classes from "./UserInfo.module.css";
import userInfoValidator, {
    userInfoData,
    userInfoValidationResult,
} from "../../../util/validators/userInfoValidator";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions, logoutRequest} from "../../../Store/auth-slice";
import {AnyAction} from "@reduxjs/toolkit";
import {Blocks} from "react-loader-spinner";
import {showSuccessNotification, showWarningNotification} from "../../../util/Notifications/notifications";

const initialUserInfoValidationResult: userInfoValidationResult = {
    formIsValid: false,
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
    organisationName: {
        isValid: true,
        message: "",
    },
};

let currentUser: userInfoData;

const UserInfo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userInfoValidationResult, setUserInfoValidationResult] = useState<userInfoValidationResult>(initialUserInfoValidationResult);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const surnameInputRef = useRef<HTMLInputElement>(null);
    const phoneNumberInputRef = useRef<HTMLInputElement>(null);
    const organisationNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/users/single', {credentials: 'include'})
            .then(res => {
                return res.json();
            })
            .then(user => {
                if(!user || user.isNotAuth){
                    showWarningNotification('Час дії сесії вичерпано');
                    dispatch(logoutRequest() as unknown as AnyAction);
                    history.push('/login');
                }
                currentUser = user;
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const userInfoFormSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        const userInfoData: userInfoData = {
            name: nameInputRef.current!.value,
            surname: surnameInputRef.current!.value,
            phoneNumber: phoneNumberInputRef.current!.value,
            organisationName: organisationNameInputRef.current!.value,
        }

        const validationResult = userInfoValidator(userInfoData, userInfoValidationResult);
        setUserInfoValidationResult({...validationResult});

        if (userInfoValidationResult.formIsValid) {
            fetch('http://localhost:8080/users/update', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userInfoData)
            })
                .then(res => {
                    setIsLoading(true);
                    return res.json();
                })
                .then(user => {
                    if(user.error){
                        showWarningNotification('Введіть правильні дані');
                        const serverValidationFailFields = user.error.additionalInfo;
                        const serverValidationResult:any = {...validationResult};

                        for(let { param: field } of serverValidationFailFields){
                            serverValidationResult[field].isValid = false;
                        }
                        setUserInfoValidationResult({...serverValidationResult});
                        setIsLoading(false);
                        return;
                    }
                    showSuccessNotification("Дані збережено");
                    currentUser = user;
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log("Form is not valid");
            showWarningNotification('Введіть правильні дані');
        }

        return;
    }


    return <div className={classes.user_info_container}>
        <form className={classes.user_info_form} onSubmit={userInfoFormSubmitHandler}>
            <Blocks
                visible={isLoading}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
            />
            {!isLoading && <>
                <label htmlFor="info_name" className={classes.user_info_label}>
                    Ім'я
                </label>
                <input
                    ref={nameInputRef}
                    type="text"
                    id="info_name"
                    defaultValue={currentUser.name}
                    className={`${classes.user_info_input} ${
                        !userInfoValidationResult.name.isValid
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
                    defaultValue={currentUser.surname}
                    className={`${classes.user_info_input} ${
                        !userInfoValidationResult.surname.isValid
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
                    defaultValue={currentUser.phoneNumber}
                    className={`${classes.user_info_input} ${
                        !userInfoValidationResult.phoneNumber.isValid
                            ? classes.user_info_error_input
                            : ""
                    }`}
                />
                {!userInfoValidationResult.phoneNumber.isValid && (
                    <p className={classes.user_info_error}>
                        {userInfoValidationResult.phoneNumber.message}
                    </p>
                )}

                <label htmlFor="info_organisation_name" className={classes.user_info_label}>
                    Назва організації
                </label>
                <input
                    ref={organisationNameInputRef}
                    type="text"
                    id="info_organisation_name"
                    defaultValue={currentUser.organisationName}
                    className={`${classes.user_info_input} ${
                        !userInfoValidationResult.organisationName.isValid
                            ? classes.user_info_error_input
                            : ""
                    }`}
                />
                {!userInfoValidationResult.phoneNumber.isValid && (
                    <p className={classes.user_info_error}>
                        {userInfoValidationResult.organisationName.message}
                    </p>
                )}

                <button type='submit' className={classes.user_info_btn}>Зберегти зміни</button>
            </>}
        </form>
    </div>
}

export default UserInfo;