import React, {FormEvent, useRef, useState} from "react";
import classes from "./LoginForm.module.css";
import loginValidator, {
    loginFormData,
    loginValidationResult,
} from "../../util/validators/loginValidator";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../../Store/auth-slice";
import {
    showErrorNotification,
    showSuccessNotification,
    showWarningNotification
} from "../../util/Notifications/notifications";

const initialLoginValidationResult: loginValidationResult = {
    formIsValid: false,
    email: {
        isValid: true,
        message: "",
    },
    password: {
        isValid: true,
        message: "",
    },
};

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [loginFormValidationResult, setLoginFormValidationResult] =
        useState<loginValidationResult>(initialLoginValidationResult);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const loginFormSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();

        const loginFormData: loginFormData = {
            email: emailInputRef.current!.value,
            password: passwordInputRef.current!.value,
        }

        const validationResult = loginValidator(loginFormData, loginFormValidationResult);

        setLoginFormValidationResult({...validationResult});

        if (loginFormValidationResult.formIsValid) {
            const res = await fetch('http://localhost:8080/users/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(loginFormData)
            });

            const resJson = await res.json();
            console.log(resJson);

            if (resJson.error && resJson.error.message === 'Validation error') {
                showWarningNotification('Введіть правильні дані');
                const serverValidationFailFields = resJson.error.additionalInfo;
                const serverValidationResult: any = {...validationResult};

                for (let {param: field} of serverValidationFailFields) {
                    serverValidationResult[field].isValid = false;
                }

                setLoginFormValidationResult({...serverValidationResult});
                return;
            }

            if (resJson.error) {
                showErrorNotification(resJson.error.message);
                setErrorMessage(resJson.error.message);
                return
            }
            console.log(resJson);

            if (resJson.isAdmin) {
                console.log(resJson.isAdmin);
                dispatch(authActions.loginAdmin());
                history.push('/');
                return;
            }

            showSuccessNotification('Ви увійшли в акаунт');
            dispatch(authActions.login());
            history.push('/');
            return;
        }
    };

    return (
        <div className={classes.login_form_container}>
            <form className={classes.login_form} onSubmit={loginFormSubmitHandler}>
                <label htmlFor="login_email" className={classes.login_form_label}>
                    Email
                </label>
                <input
                    ref={emailInputRef}
                    type="email"
                    id="login_email"
                    className={`${classes.login_form_input} ${!loginFormValidationResult.email.isValid
                        ? classes.login_form_error_input : ''}`}
                />
                {!loginFormValidationResult.email.isValid && (
                    <p className={classes.login_form_error}>
                        {loginFormValidationResult.email.message}
                    </p>
                )}

                <label htmlFor="login_password" className={classes.login_form_label}>
                    Пароль
                </label>
                <input
                    ref={passwordInputRef}
                    type="password"
                    id="login_password"
                    className={`${classes.login_form_input} ${!loginFormValidationResult.password.isValid
                        ? classes.login_form_error_input : ''}`}
                />
                {!loginFormValidationResult.password.isValid && (
                    <p className={classes.login_form_error}>
                        {loginFormValidationResult.password.message}
                    </p>
                )}

                {errorMessage && <p className={classes.login_form_error}>{errorMessage}</p>}

                <button className={classes.login_form_btn} type='submit'>Увійти
                </button>
                <div className={classes.login_form_btn}>
                    <Link className={classes.login_form_link} to='/registration'>Реєстрація</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
