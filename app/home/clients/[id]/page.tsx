'use client'
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import {useCallback, useEffect, useMemo, useState} from "react";
import Modal from "@/common/components/Modal/Modal";
import Card from "@/common/components/Card/Card";
import {ClientType} from "@/common/types/types";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {redirect} from "next/navigation";
import "../../../../common/styles/pages/home/client.scss"
import {CustomInput} from "@/common/components/CustomInput/CustomInput";
import {HelpIcon} from "@/public/icons/help";

export default function ClientPage() {

    const uiState = useSelector((state: RootState) => state.ui);

    useEffect(() => {
         if (uiState.currentClient === null){
             redirect("/home/clients")
         }
    }, [uiState.currentClient]);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
    const [client, setClient] = useState<ClientType | null>(uiState.currentClient);
    const [newSubscribeDate, setNewSubscribeDate] = useState<string>(client?.subscribeDate?.substring(client?.subscribeDate?.length -10) || "");

    const barWidth = useMemo(()=> {
        if (client?.cloudStorageUsage && client?.cloudStorageLimit) {
            return Number(client?.cloudStorageUsage) / Number(client?.cloudStorageLimit) * 100
        } else return 0;
    }, [client?.cloudStorageLimit, client?.cloudStorageUsage])

    const handleDeleteClient = useCallback(() => {
        return {}
    }, [])

    const handleEndTrial = useCallback(()=>{
        setClient({...client, subscribeState: "Триал деактивирован"} as ClientType)
    }, [client])

    const handleChangeSubscribeDate = useCallback(()=>{
        setClient({...client, subscribeDate: `Действует до ${newSubscribeDate}`} as ClientType)
    }, [client, newSubscribeDate])

    return (
        <div className={"ClientWrapper"}>
            <div className={"ClientActionWrapper"}>
                <CustomButton buttonName={"Удалить клиента"} onClick={() => setShowDeleteModal(true)} type={"Blank"}/>
                <Modal title={"Вы уверены что хотите удалить клиента?"} isVisible={showDeleteModal} onCloseFunk={()=>setShowDeleteModal(false)} actions={
                    <CustomButton buttonName={"Удалить"} onClick={handleDeleteClient}/>
                }/>
                <Modal title={"Информация"} isVisible={showHelpModal} onCloseFunk={()=>setShowHelpModal(false)} content={
                    "В случае, если у клиента проблемы с пополнением баланса,\n" +
                    "вы можете вручную продлить ему подписку как услугу обещанного\n" +
                    "платежа. Вы выбираете дату, до которой подписка пользователя\n" +
                    "будет активна несмотря на состояние баланса. При активации\n" +
                    "услуги, баланс пользователя уменьшится и даже может уйти в\n" +
                    "минус на сумму, требуемую для продления до указанного вами\n" +
                    "срока. Когда срок, до которого вы продлите, подойдет, будет\n" +
                    "осуществлена повторная попытка списания на очередной период.\n" +
                    "Если баланс клиента в этот день окажется недостаточным, то\n" +
                    "подписка клиента снова станет неактивной"}/>
            </div>
            <div className={"ClientInfoWrapper"}>
                <Card>
                    <h1>{"Общая информация"}</h1>
                    <div className={'InfoField'}>
                        <span>{"Баланс:"}</span>
                        <b>{` ${client?.balance} руб.`}</b>
                    </div>
                    <div className={'InfoField'}>
                        <span>{"Тариф:"}</span>
                        <b>{` ${client?.tariff} руб/мес`}</b>
                    </div>
                    <div className={'InfoField'}>
                        <span>{"Подключено пользователей:"}</span>
                        <b>{` ${client?.usersCount} руб.`}</b>
                    </div>
                    <div className={'InfoField'}>
                        <span>{"Дата регистрации:"}</span>
                        <b>{` ${client?.registerDate} руб.`}</b>
                    </div>
                </Card>
                <Card>
                    <h1>{"Потребление ресурсов (общее облако)"}</h1>
                    <div className={'InfoField'}>
                        <span>{"Файловое хранилище:"}</span>
                        <b>{` ${client?.cloudStorageUsage} ГБ из ${client?.cloudStorageLimit} ГБ`}</b>
                        <div className={"StorageUsageBar"}>
                            <div className={"StorageUsageProgress"} style={{width: `${barWidth}%`}}/>
                        </div>
                    </div>
                    <div className={'InfoField'}>
                        <span>{"Нагрузка:"}</span>
                        <b>{` ${client?.requestPerDay} запросов / сутки`}</b>
                    </div>
                </Card>
                <Card>
                    <h1>{"Подписка"}</h1>
                    <CustomInput value={client?.subscribeState || ''} title={"Статус подписки"}/>
                    { client?.subscribeState === 'Триал активен'?
                        <div className={'ButtonWrapper'}>
                            <CustomButton buttonName={"Прекратить триал"} onClick={handleEndTrial}/>
                        </div>
                         : null
                    }
                    <CustomInput value={newSubscribeDate} title={"Действует до"} onChange={setNewSubscribeDate}/>
                    <div className={'ButtonWrapper'}>
                        <CustomButton onClick={handleChangeSubscribeDate} buttonName={"Расширить срок действия"}/>
                        <span className={"IconWrapper"} onClick={()=> setShowHelpModal(true)}>
                            <HelpIcon/>
                        </span>
                    </div>
                </Card>
            </div>

        </div>
    )
}
