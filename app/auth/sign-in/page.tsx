'use client'
import {CustomInputDropdown, CustomInputPassword} from "@/common/components/CustomInput/CustomInput";
import {useCallback, useState} from "react";
import "../../../common/styles/pages/auth/sign-in.scss"
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import {DropdownProps} from "@/common/types/types";
import {AppDispatch} from "@/store/store";
import {useDispatch} from "react-redux";
import {setIsAdmin} from "@/store/slices/uiSlice";

export default function SignInPage() {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errState, setErrState] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState<string>('')
    const [placeholder, setPlaceholder] = useState<string>('Administrator')

    const dispatch: AppDispatch = useDispatch();

    const handleLogin = useCallback(() => {
        console.log("sign-in btn pressed")
        if (Math.random() < 0.5) {
            setErrState(true)
            setErrMessage("Пользователя с таким набором данных не существует")
        } else {
            setErrState(false)
            setErrMessage("")
            dispatch(setIsAdmin(placeholder === "Administrator"));
        }
    }, [dispatch, placeholder])

    const handleSetAdmin = useCallback(()=>{
        setPlaceholder("Administrator")
    }, [])

    const handleSetManager = useCallback(()=>{
        setPlaceholder("Manager")
    }, [])

    const dropdownLoginList: DropdownProps[] = [{text: 'Administrator', onClick: handleSetAdmin}, {text: 'Manager', onClick: handleSetManager}]

    return (
        <div className={"SignInForm"}>
            <h1>{"Авторизация"}</h1>
            <div className={"FieldsWrapper"}>
                <CustomInputDropdown placeholder={placeholder} title={"ФИО"} onChange={setLogin} value={login}
                             errState={errState} key={"login"} dropdownOption={dropdownLoginList} dropdownWidth={432}/>
                <CustomInputPassword value={password} onChange={setPassword} title={"Пароль"}
                                     placeholder={"Введите пароль"} errState={errState} errMessage={errMessage} key={"password"}/>
            </div>
            <div className={"SubmitWrapper"}>
                <CustomButton onClick={handleLogin} active={login.length > 0 && password.length > 0}
                              buttonName={"Войти"} style={{minWidth:'50%'}}/>
            </div>
        </div>
    )
}
