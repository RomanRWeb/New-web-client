'use client'
import {useCallback, useEffect, useState} from "react";
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import {redirect} from "next/navigation";
import "../../../../common/styles/pages/auth/reset.scss"
import {Error} from "@/common/components/Icons/Error";
import {CustomInputPassword} from "@/common/components/CustomInput/CustomInput";
import {Success} from "@/common/components/Icons/Success";

export default function ResetPage() {

    const [tokenIsActive, setTokenIsActive] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");
    const [passwordRepeatError, setPasswordRepeatError] = useState<boolean>(false);
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

    const [placeholder, setPlaceholder] = useState<string>("");

    useEffect(() => {
        //get token
        setTokenIsActive(true)
    }, [])

    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const array = new Uint32Array(16);
        crypto.getRandomValues(array);

        let result: string = '';
        for (let i = 0; i < array.length; i++) {
            result += chars[array[i] % chars.length];
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const pswPlaceholder: any = result.match(/.{1,4}/g).join('-')
        if (pswPlaceholder !== null) {
            setPlaceholder(pswPlaceholder)
        } else setPlaceholder('')

    }, [])

    const handleReturn = useCallback(() => {
        console.log("redirect button clicked");
        redirect("/auth/sign-in");
    }, [])

    const handleChangePassword = useCallback(() => {
        //post new password
        setPasswordChanged(true)
        console.log("save password clicked");
    }, [])

    useEffect(() => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;
        if (passwordRegex.test(password) || password.length === 0) {
            setPasswordError(false)
        } else {
            setPasswordError(true)
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
            setPasswordErrorMessage("ПАРОЛЬ НЕ СООТВЕСТВУЕТ ТРЕБОВАНИЯМ")
        } else if (passwordRepeatError) {
            setPasswordErrorMessage("ВВЕДЕННЫЕ ПАРОЛИ НЕ СОВПАДАЮТ")
        } else {
            setPasswordErrorMessage('')
        }

    }, [passwordError, passwordRepeatError]);

    return (
        <div className={"ResetWrapper"}>
            {
                tokenIsActive ?
                    <>
                        {!passwordChanged ?
                            <>
                                <div>
                                    <h1>{"Новый пароль"}</h1>
                                    <span>{"Придумайте новый пароль, который должен содержать:"}</span>
                                    <ul className={"PasswordDescriptionList"}>
                                        <li>{"- минимум 8 символов"}</li>
                                        <li>{"- строчные буквы"}</li>
                                        <li>{"- заглавные буквы"}</li>
                                        <li>{"- числа"}</li>
                                    </ul>
                                </div>
                                <div className={"InputWrapper"}>
                                    <CustomInputPassword placeholder={placeholder} title={"Новый пароль:"}
                                                         onChange={setPassword} value={password}
                                                         errMessage={passwordErrorMessage}
                                                         errState={passwordError || passwordRepeatError}
                                                         key={"password"}/>
                                    <CustomInputPassword placeholder={placeholder} title={"Подтвердите новый пароль:"}
                                                         onChange={setPasswordRepeat} value={passwordRepeat}
                                                         errState={passwordRepeatError} key={"passwordRepeat"}/>
                                </div>
                                <CustomButton buttonName={"Сохранить"} onClick={handleChangePassword}
                                              active={!passwordError && !passwordRepeatError}/></>
                            :
                            <>
                                <div>
                                    <h1>{"Пароль обновлен"}</h1>
                                    <span>{"Ваш пароль обновлен. Теперь вы можете войти в систему с новым паролем"}</span>
                                </div>
                                <Success/>
                                <CustomButton buttonName={"Вернуться к авторизации"} onClick={handleReturn}/></>
                        }

                    </>
                    :
                    <>
                        <div>
                            <h1>{"Ссылка недействительна"}</h1>
                            <span>{"К сожалению, ссылка по которой вы открыли данную страницу, уже недействительна. Если вы хотите восстановить пароль, инициируйте эту процедуру заново."}</span>
                        </div>
                        <Error/>
                        <CustomButton buttonName={"Вернуться к авторизации"} onClick={handleReturn}/>
                    </>
            }
        </div>
    )
}
