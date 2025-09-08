'use client'
import ManagerCard from "@/common/components/ManagerCard/ManagerCard";
import {useCallback, useState} from "react";
import {CustomButton} from "@/common/components/CustomButton/CustomButton";

export default function ManagerAddPage(){

    const [dataCorrect, setDataCorrect] = useState<boolean>(false);

    const handleSave = useCallback(() => {

    }, [])

    return (
        <>
            <div className="ActionsWrapper">
                <CustomButton buttonName={"Сохранить"} onClick={handleSave} active={dataCorrect} gray={true}/>
            </div>
            <ManagerCard onDataCorrect={setDataCorrect}/>
        </>

    )
}
