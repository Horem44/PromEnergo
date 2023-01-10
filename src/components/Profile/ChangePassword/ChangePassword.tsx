import React, {FormEvent, useRef, useState} from "react";
import classes from "./ChangePassword.module.css";
import changePasswordValidator, {changePasswordData, changePasswordValidationResult} from "../../../util/validators/changePasswordValidator";

const initialChangePasswordValidationResult: changePasswordValidationResult = {
    formIsValid: false,
    email: {
        isValid: true,
        message: "",
    },
};

const ChangePassword = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    
    const [changePasswordValidationResult, setChangePasswordValidationResult] = 
        useState<changePasswordValidationResult>(initialChangePasswordValidationResult)

    const changePasswordFormSubmitHandler = (e:FormEvent) => {
        e.preventDefault();
        
        const changePasswordData:changePasswordData = {
            email: emailInputRef.current!.value
        }
        
        const validationResult = changePasswordValidator(changePasswordData, changePasswordValidationResult);
        setChangePasswordValidationResult({...validationResult});

        if (changePasswordValidationResult.formIsValid) {
            console.log("Form is valid");
        } else {
            console.log("Form is not valid");
        }

        return;
    }
        
    return (
        <div className={classes.change_password_container}>
            <form className={classes.change_password_form} onSubmit={changePasswordFormSubmitHandler}>
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
            </form>
        </div>
    );
};

export default ChangePassword;