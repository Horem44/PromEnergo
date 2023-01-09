import React, {FormEvent, useState} from "react";
import classes from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const [isUserEntity, setIsUserEntity] = useState<boolean>(false);

  const userIsEntityHandler = () => {
    setIsUserEntity(true);
  };

  const userIsNotEntityHandler = () => {
    setIsUserEntity(false);
  };

  const registrationFormSubmitHandler = (e:FormEvent) => {
    e.preventDefault();
    console.log('submited')
  }

  return (
      <div className={classes.registration_form_container}>
        <form className={classes.registration_form} onSubmit={registrationFormSubmitHandler}>
          <label htmlFor="reg_email" className={classes.registration_form_label}>
            Email
          </label>
          <input
              type="email"
              id="reg_email"
              className={classes.registration_form_input}
          />

          <label htmlFor="reg_pas" className={classes.registration_form_label}>
            Пароль
          </label>
          <input
              type="password"
              id="reg_pas"
              className={classes.registration_form_input}
          />

          <label
              htmlFor="reg_confirm_pas"
              className={classes.registration_form_label}
          >
            Введіть пароль повторно
          </label>
          <input
              type="password"
              id="reg_confirm_pas"
              className={classes.registration_form_input}
          />

          <label htmlFor="reg_name" className={classes.registration_form_label}>
            Ваше ім'я
          </label>
          <input
              type="text"
              id="reg_name"
              className={classes.registration_form_input}
          />

          <label htmlFor="reg_surname" className={classes.registration_form_label}>
            Ваше прізвище
          </label>
          <input
              type="text"
              id="reg_surname"
              className={classes.registration_form_input}
          />

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
                    type="text"
                    id="reg_entity_user"
                    className={classes.registration_form_input}
                />
              </>
          )}

          <label htmlFor="reg_phone" className={classes.registration_form_label}>
            Номер мобільного телефону
          </label>
          <input
              type="text"
              id="reg_phone"
              className={classes.registration_form_input}
          />
          <button type="submit" className={classes.registration_form_button}>
            Реєстрація
          </button>
        </form>
      </div>
  );
};

export default RegistrationForm;
