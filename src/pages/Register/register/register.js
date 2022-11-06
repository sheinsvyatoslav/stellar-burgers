import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {
  setFormValue,
  toggleVisibilityPassword,
} from "../../../services/actions/form";
import { register } from "../../../services/actions/auth";
import registerStyles from "./register.module.css";

const Register = () => {
  const { name, email, password, isFormValid } = useSelector(
    (state) => state.form
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const target = e.target;
    dispatch(
      setFormValue(
        target.name,
        target.value,
        target.checkValidity(),
        target.validationMessage,
        target.closest("form").checkValidity()
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name: name.value,
        email: email.value,
        password: password.value,
      })
    );
  };

  const onIconClick = () => {
    dispatch(toggleVisibilityPassword());
  };

  return (
    <section className={registerStyles.main}>
      <h2 className={`${registerStyles.title} text text_type_main-medium`}>
        Регистрация
      </h2>
      <form
        className={`${registerStyles.form} mb-20 mt-6`}
        onSubmit={handleSubmit}
      >
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={handleChange}
          value={name.value}
          name={"name"}
          error={!name.isValid}
          errorText={name.errorMessage}
          size={"default"}
          required
          maxLength="30"
        />
        <Input
          type={"email"}
          placeholder="E-mail"
          onChange={handleChange}
          value={email.value}
          name={"email"}
          error={!email.isValid}
          errorText={email.errorMessage}
          size={"default"}
          pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          required
        />
        <Input
          type={password.isHidden ? "password" : "text"}
          placeholder="Пароль"
          onChange={handleChange}
          value={password.value}
          name={"password"}
          error={!password.isValid}
          errorText={password.errorMessage}
          icon={password.isHidden ? "ShowIcon" : "HideIcon"}
          onIconClick={onIconClick}
          size={"default"}
          required
          pattern=".{6,}"
        />
        <Button
          type="primary"
          size="medium"
          onClick={handleSubmit}
          htmlType="submit"
          disabled={!isFormValid}
          aria-label={"Зарегистрироваться"}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={`${registerStyles.tip} text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы?{" "}
        <Link className={registerStyles.link} to="/login">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;