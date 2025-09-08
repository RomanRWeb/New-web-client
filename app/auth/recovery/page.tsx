'use client'
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import {useCallback, useState} from "react";
import {redirect} from "next/navigation";
import "../../../common/styles/pages/auth/recovery.scss"
import {Success} from "@/common/components/Icons/Success";

export default function RecoveryPage() {

    const [linkSend, setLinkSend] = useState<boolean>(false);

    const handleSendLink = useCallback(() => {
        setLinkSend(true)
        console.log("link button clicked");
    }, [])

    const handleReturn = useCallback(() => {
        console.log("redirect button clicked");
        redirect("/auth/sign-in");
    }, [])

    return (
        <div className={"RecoveryWrapper"}>
            <h1>{!linkSend ? "Восстановление пароля" : "Письмо отправлено"}</h1>
            <div>
                {!linkSend ?
                    <CustomButton buttonName={"Отправить ссылку"} onClick={handleSendLink}
                                  style={{minWidth: "60%"}}/>
                    :
                    <>
                        <span>{"Мы отправили инструкции по сбросу пароля на Email владельца сервиса."}</span>
                        <Success size={100}/>
                    </>
                }
            </div>
            <CustomButton buttonName={"Вернуться к авторизации"} onClick={handleReturn}
                          style={{minWidth: "60%"}} type={!linkSend ? "Outline" : "Fill"}/>
        </div>
    )
}
