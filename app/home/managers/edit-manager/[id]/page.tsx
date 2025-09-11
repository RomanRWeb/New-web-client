'use client'
import ManagerCard from "@/common/components/ManagerCard/ManagerCard";
import {useCallback, useState} from "react";
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import Modal from "@/common/components/Modal/Modal";

export default function ManagerEditPage() {

    const [dataCorrect, setDataCorrect] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const uiState = useSelector((state: RootState) => state.ui)

    const handleSave = useCallback(() => {

    }, [])

    const handleDelete = useCallback(() => {

    }, [])

    return (
        <>
            <div className="ActionsWrapper">
                <div style={{display: "flex", gap: '24px'}}>
                    <CustomButton buttonName={"Сохранить"} onClick={handleSave} active={dataCorrect}/>
                    <CustomButton buttonName={"Удалить менеджера"} onClick={() => setModalVisible(true)}
                                  type={"Blank"}/>
                    <Modal
                        title={"Вы уверены что хотите удалить менеджера?"}
                        actions={
                                <CustomButton buttonName={"Удалить"} onClick={handleDelete}/>}
                        isVisible={modalVisible}
                        content={''}
                        onCloseFunk={() => setModalVisible(false)}
                    />
                </div>
            </div>
            <ManagerCard onDataCorrect={setDataCorrect} manager={uiState.currentManager || {id: "0", role: '', phone: '', password: '', fullName: ''}}/>
        </>

    )
}
