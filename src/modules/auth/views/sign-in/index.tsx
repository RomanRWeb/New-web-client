"use client";
import {
  CustomInputDropdown,
  CustomInputPassword,
} from "@app/common/components/CustomInput/CustomInput";
import { useCallback, useState } from "react";
import "@app/common/styles/pages/auth/sign-in.scss";
import { CustomButton } from "@app/common/components/CustomButton/CustomButton";
import { DropdownProps } from "@app/data/types";
import { AppDispatch } from "@app/store/store";
import { useDispatch } from "react-redux";
import { setIsAdmin } from "@app/store/slices/uiSlice";

const SignInMain = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errState, setErrState] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Administrator");

  const dispatch: AppDispatch = useDispatch();

  const handleLogin = useCallback(() => {
    console.log("sign-in btn pressed");
    if (Math.random() < 0.5) {
      setErrState(true);
      setErrMessage("Пользователя с таким набором данных не существует");
    } else {
      setErrState(false);
      setErrMessage("");
      dispatch(setIsAdmin(placeholder === "Administrator"));
    }
  }, [dispatch, placeholder]);

  const handleSetAdmin = useCallback(() => {
    setPlaceholder("Administrator");
  }, []);

  const handleSetManager = useCallback(() => {
    setPlaceholder("Manager");
  }, []);

  const dropdownLoginList: DropdownProps[] = [
    { text: "Administrator", onClick: handleSetAdmin },
    { text: "Manager", onClick: handleSetManager },
  ];

  return (
    <div className={"sign-in-form"}>
      <h1>{"Авторизация"}</h1>
      <div className={"fields-wrapper"}>
        <CustomInputDropdown
          placeholder={placeholder}
          title={"ФИО"}
          onChange={setLogin}
          value={login}
          errState={errState}
          key={"login"}
          dropdownOption={dropdownLoginList}
          dropdownWidth={432}
        />
        <CustomInputPassword
          value={password}
          onChange={setPassword}
          title={"Пароль"}
          placeholder={"Введите пароль"}
          errState={errState}
          errMessage={errMessage}
          key={"password"}
        />
      </div>
      <div className={"submit-wrapper"}>
        <CustomButton
          onClick={handleLogin}
          active={login.length > 0 && password.length > 0}
          buttonName={"Войти"}
          style={{ minWidth: "50%" }}
        />
      </div>
    </div>
  );
};

export default SignInMain;
