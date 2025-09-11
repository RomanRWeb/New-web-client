'use client'
import "./ManagerCard.scss"
import React, {useEffect, useState} from "react";
import Card from "@/common/components/Card/Card";
import {ManagerType} from "@/common/types/types";
import {CustomInput} from "@/common/components/CustomInput/CustomInput";
import DropdownBar from "@/common/components/DropdownBar/DropdownBar";
import "./ManagerCard.scss"

interface ManagerCardProps {
    manager?: ManagerType
    onDataCorrect: (b: boolean) => void;
}

const ManagerCard: React.FC<ManagerCardProps> = ({
                                                            manager = {
                                                                id: '',
                                                                fullName: '',
                                                                role: '',
                                                                phone: '',
                                                                password: ''
                                                            }, onDataCorrect
                                                        }: ManagerCardProps) => {

    const dropdownOption = [
        {text: "Менеджер клиентов", onClick: () => setRole},
        {text: "Менеджер клиентов_2", onClick: () => setRole}]

    const [managerFullName, setManagerFullName] = useState<string>(manager.fullName);
    const [role, setRole] = useState<string>(manager.role)
    const [managerPhone, setManagerPhone] = useState<string>(manager.phone);
    const [phoneError, setPhoneError] = useState<boolean>(false);
    const [managerPassword, setManagerPassword] = useState<string>(manager.password);

    useEffect(()=>{
        const phoneRegex = /^[+]?[0-9][(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2}[-\s.]?[0-9]{2}$/;
        if (!phoneRegex.test(managerPhone)){
            setPhoneError(true)
        } else setPhoneError(false)
    }, [managerPhone])

    useEffect(() => {
        if (role && managerFullName.length > 0 && managerPhone.length > 0 && managerPassword.length > 0) {
            onDataCorrect(true)
        }
    }, [managerFullName.length, managerPassword.length, managerPhone.length, onDataCorrect, role]);

    return (
        <Card>
            <h1>{"Информация о менеджере"}</h1>
            <CustomInput value={managerFullName} onChange={setManagerFullName} title={"ФИО"} errState={managerFullName.length === 0}/>
            <DropdownBar items={dropdownOption} title={"Роль"} onSelect={setRole} selectedValue={role}/>
            <CustomInput value={managerPhone} onChange={setManagerPhone} title={"Телефон"} errState={phoneError}/>
            <CustomInput value={managerPassword} onChange={setManagerPassword} title={"Пароль"} errState={managerPassword.length === 0}/>
        </Card>
    )
}

export default ManagerCard;
