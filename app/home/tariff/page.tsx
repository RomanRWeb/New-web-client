'use client'
import Card from "@/common/components/Card/Card";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import "../../../common/styles/pages/home/tariff.scss"
import {CheckIcon} from "@/public/icons/check";
import {CustomInput} from "@/common/components/CustomInput/CustomInput";
import {Tariff} from "@/common/types/types";

export default function TariffPage() {

    const [tariff, setTariff] = useState<Tariff>({
        basicCost: "3500",
        managersCount: "1",
        cloudStorageVolume: "10",
        addingCostPerManager: "500",
        addingCostPerStorage: "500"
    });

    const [editMode, setEditMode] = useState<boolean>(false)

    const [basicCost, setBasicCost] = useState<string>(tariff.basicCost);
    const [basicCostError, setBasicCostError] = useState<boolean>(false);

    const [managersCount, setManagersCount] = useState<string>(tariff.managersCount);
    const [managersCountError, setManagersCountError] = useState<boolean>(false);

    const [cloudStorageVolume, setCloudStorageVolume] = useState<string>(tariff.cloudStorageVolume);
    const [cloudStorageVolumeError, setCloudStorageVolumeError] = useState<boolean>(false);

    const [addingCostPerManager, setAddingCostPerManager] = useState<string>(tariff.addingCostPerManager);
    const [addingCostPerManagerError, setAddingCostPerManagerError] = useState<boolean>(false);

    const [addingCostPerStorage, setAddingCostPerStorage] = useState<string>(tariff.addingCostPerManager);
    const [addingCostPerStorageError, setAddingCostPerStorageError] = useState<boolean>(false);

    const handleSave = useCallback(() => {
        if (!basicCostError && !managersCountError && !cloudStorageVolumeError && !addingCostPerManagerError && !addingCostPerStorageError) {
            setTariff({
                basicCost: basicCost,
                managersCount: managersCount,
                cloudStorageVolume: cloudStorageVolume,
                addingCostPerStorage: addingCostPerManager,
                addingCostPerManager: addingCostPerStorage
            })
            setEditMode(false)
        }
    }, [addingCostPerManager, addingCostPerManagerError, addingCostPerStorage, addingCostPerStorageError, basicCost, basicCostError, cloudStorageVolume, cloudStorageVolumeError, managersCount, managersCountError])

    const handleEdit = useCallback(() => {
        setEditMode(!editMode)
    }, [editMode])

    useEffect(() => {
        const numberRegex = /^\d+$/;
        if (numberRegex.test(basicCost)) {setBasicCostError(false)} else {setBasicCostError(true)}
    }, [basicCost]);

    useEffect(() => {
        const numberRegex = /^\d+$/;
        if (numberRegex.test(managersCount)) {setManagersCountError(false)} else {setManagersCountError(true)}
    }, [managersCount]);

    useEffect(() => {
        const numberRegex = /^\d+$/;
        if (numberRegex.test(cloudStorageVolume)) {setCloudStorageVolumeError(false)} else {setCloudStorageVolumeError(true)}
    }, [cloudStorageVolume]);

    useEffect(() => {
        const numberRegex = /^\d+$/;
        if (numberRegex.test(addingCostPerManager)) {setAddingCostPerManagerError(false)} else {setAddingCostPerManagerError(true)}
    }, [addingCostPerManager]);

    useEffect(() => {
        const numberRegex = /^\d+$/;
        if (numberRegex.test(addingCostPerStorage)) {setAddingCostPerStorageError(false)} else {setAddingCostPerStorageError(true)}
    }, [addingCostPerStorage]);

    const editTariff = useMemo(() => {
        return (
            <section className={"Tariff"}>
                <div className={"TariffValue"}>
                    <CustomInput value={basicCost} onChange={setBasicCost} errState={basicCostError} key={"basicCostInput"}/>
                    <span>{"/месяц"}</span>
                </div>
                <div className={"TariffValue"}>
                    <li>
                        <CheckIcon/>
                        <span>{"1 администратор"}</span>
                    </li>
                    <li>
                        <CheckIcon/>
                        <CustomInput value={managersCount} onChange={setManagersCount} errState={managersCountError} key={'managerCountInput'}/>
                        <span>{"сотрудник"}</span>
                    </li>
                    <li>
                        <CheckIcon/>
                        <CustomInput value={cloudStorageVolume} onChange={setCloudStorageVolume} errState={cloudStorageVolumeError} key={'cloudStorageVolumeInput'}/>
                        <span>{"ГБ облачного хранилища"}</span>
                    </li>
                </div>
                <div className={"TariffValue"}>
                    <CustomInput value={addingCostPerManager} onChange={setAddingCostPerManager} errState={addingCostPerManagerError} key={'addingCostPerManagerInput'}/>
                    <span>{"/месяц"}</span>
                    <div>
                        <span>{"за каждого дополнительного сотрудника"}</span>
                    </div>
                </div>
                <div className={"TariffValue"}>
                    <CustomInput value={addingCostPerStorage} onChange={setAddingCostPerStorage} errState={addingCostPerStorageError} key={'addingCostPerStorageInput'}/>
                    <span>{"/месяц"}</span>
                    <div>
                        <span>{"за каждые дополнительные 5ГБ хранилища"}</span>
                    </div>
                </div>
            </section>
        )
    }, [addingCostPerManager, addingCostPerManagerError, addingCostPerStorage, addingCostPerStorageError, basicCost, basicCostError, cloudStorageVolume, cloudStorageVolumeError, managersCount, managersCountError])

    const showTariff = useMemo(() => {
        return (
            <section className={"Tariff"}>
                <div className={"TariffValue"}>
                    <h1>{`${tariff.basicCost}₽`}</h1>
                    <span>{"/месяц"}</span>
                </div>
                <div className={"TariffValue"}>
                    <li><CheckIcon/> <span>{"1 администратор"}</span></li>
                    <li><CheckIcon/> <span>{`${tariff.managersCount} сотрудник`}</span></li>
                    <li><CheckIcon/> <span>{`${tariff.cloudStorageVolume}ГБ облачного хранилища`}</span></li>
                </div>
                <div className={"TariffValue"}>
                    <h1>{`${tariff.addingCostPerManager}₽`}</h1>
                    <span>{"/месяц"}</span>
                    <div>
                        <span>{"за каждого дополнительного сотрудника"}</span>
                    </div>
                </div>
                <div className={"TariffValue"}>
                    <h1>{`${tariff.addingCostPerStorage}₽`}</h1>
                    <span>{"/месяц"}</span>
                    <div>
                        <span>{"за каждые дополнительные 5ГБ хранилища"}</span>
                    </div>
                </div>
            </section>
        )
    }, [tariff])

    return (
        <>
            <div className={"TariffActionsWrapper"}>
                <CustomButton buttonName={"Сохранить"} onClick={handleSave} active={editMode} gray={true}/>
                <CustomButton buttonName={editMode?"Отмена" : "Редактировать"} onClick={handleEdit} type={"Blank"}/>
            </div>
            <Card>
                <h1>{"Итоговое описание тарифа"}</h1>
                <h1>{"Базовая стоимость"}</h1>
                {editMode ? editTariff : showTariff}
            </Card>
        </>
    )
}
