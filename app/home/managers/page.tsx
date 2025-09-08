'use client'
import CustomTable from "@/common/components/CustomTable/CustomTable";
import {ColumnsHeader, fakeManagers, ManagerType} from "@/common/types/types";
import {useCallback, useEffect, useState} from "react";
import {redirect} from "next/navigation";
import {CustomButton} from "@/common/components/CustomButton/CustomButton";
import SearchBar from "@/common/components/SearchBar/SearchBar";
import "../../../common/styles/pages/home/managers.scss"
import {setCurrentManager} from "@/store/slices/uiSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";

export default function ManagersPage() {

    const tableColumns: ColumnsHeader[] = [
        {name: 'id', colored: false, text: "ID"},
        {name: 'fullName', colored: false, text: "ФИО"},
        {name: 'role', colored: false, text: 'РОЛЬ'},
        {name: 'phone', colored: false, text: 'ТЕЛЕФОН'}
    ];

    const tableData: ManagerType[] = fakeManagers;

    const dispatch: AppDispatch = useDispatch();
    const [search, setSearch] = useState<string>('');
    const [selectedManager, setSelectedManager] = useState<ManagerType>();

    useEffect(() => {
        if (selectedManager !== undefined){
            dispatch(setCurrentManager(selectedManager));
            redirect(`/home/managers/edit-manager/${selectedManager.id}`);
        }
    }, [dispatch, selectedManager]);

    useEffect(() => {
        console.log(search);
    }, [search])

    const handleCreateManager = useCallback(() => {
        redirect("/home/managers/add-manager");
    }, [])

    return (
        <>
            <div className="ManagersActionsWrapper">
                <CustomButton buttonName={"Создать менеджера"} onClick={handleCreateManager}/>
                <SearchBar onChange={setSearch} value={search}/>
            </div>
            <CustomTable columns={tableColumns} data={tableData} name={'Менеджеры'} onClickRow={setSelectedManager}/>
        </>

    )
}
