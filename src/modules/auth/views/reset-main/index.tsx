"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";
import { CustomInputPassword } from "@app/common/components/custom-input/CustomInput";

interface Props {
  onSubmit: (b: boolean) => void;
}

const ResetForm: React.FC<Props> = ({ onSubmit }) => {
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [passwordRepeatError, setPasswordRepeatError] =
    useState<boolean>(false);

  const [placeholder, setPlaceholder] = useState<string>("");

  useEffect(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const array = new Uint32Array(16);
    crypto.getRandomValues(array);

    let result: string = "";
    for (let i = 0; i < array.length; i++) {
      result += chars[array[i] % chars.length];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const pswPlaceholder: any = result.match(/.{1,4}/g).join("-");
    if (pswPlaceholder !== null) {
      setPlaceholder(pswPlaceholder);
    } else setPlaceholder("");
  }, []);

  const handleChangePassword = useCallback(() => {
    //post new password
    onSubmit(true);
    console.log("save password clicked");
  }, [onSubmit]);

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
    if (passwordRegex.test(password) || password.length === 0) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [password]);

  useEffect(() => {
    if (passwordRepeat === password) {
      setPasswordRepeatError(false);
    } else {
      setPasswordRepeatError(true);
    }
  }, [password, passwordRepeat]);

  useEffect(() => {
    if (passwordError) {
      setPasswordErrorMessage("ПАРОЛЬ НЕ СООТВЕСТВУЕТ ТРЕБОВАНИЯМ");
    } else if (passwordRepeatError) {
      setPasswordErrorMessage("ВВЕДЕННЫЕ ПАРОЛИ НЕ СОВПАДАЮТ");
    } else {
      setPasswordErrorMessage("");
    }
  }, [passwordError, passwordRepeatError]);

  return (
    <>
      <div>
        <h1>{"Новый пароль"}</h1>
        <span>{"Придумайте новый пароль, который должен содержать:"}</span>
        <ul className={"list-description"}>
          <li>{"- минимум 8 символов"}</li>
          <li>{"- строчные буквы"}</li>
          <li>{"- заглавные буквы"}</li>
          <li>{"- числа"}</li>
        </ul>
      </div>
      <div className={"input-wrapper"}>
        <CustomInputPassword
          placeholder={placeholder}
          title={"Новый пароль:"}
          onChange={setPassword}
          value={password}
          errMessage={passwordErrorMessage}
          errState={passwordError || passwordRepeatError}
          key={"password"}
        />
        <CustomInputPassword
          placeholder={placeholder}
          title={"Подтвердите новый пароль:"}
          onChange={setPasswordRepeat}
          value={passwordRepeat}
          errState={passwordRepeatError}
          key={"passwordRepeat"}
        />
      </div>
      <CustomButton
        buttonName={"Сохранить"}
        onClick={handleChangePassword}
        active={!passwordError && !passwordRepeatError}
      />
    </>
  );
};

export default ResetForm;
