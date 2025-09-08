'use client'
import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import "./HomeHeader.scss"
import {redirect, usePathname} from "next/navigation";
import {UserIcon} from "@/public/icons/user";
import DropdownList from "@/common/components/DropdownList/DropdownList";
import {DropdownProps, NavListHomeAdmin} from "@/common/types/types";
import {ChevronLeftIcon} from "@/public/icons/chevron-left";
import {setCurrentClient, setCurrentManager} from "@/store/slices/uiSlice";

const HomeHeader: React.FC = () => {

    const uiState = useSelector((state: RootState) => state.ui)
    const dispatch: AppDispatch = useDispatch();

    const pathArray = usePathname().split("/")
    const sectionPath = `/${pathArray[2]}`
    const subSectionPath = `/${pathArray[3]}`


    const Header = useMemo(() => (
        NavListHomeAdmin.find(el => el.path === sectionPath)?.name
    ), [sectionPath])

    const handleLogout = useCallback(() => {
        redirect("/auth/sign-in")
    }, [])

    const logoutItem: DropdownProps[] = [{text: "Выйти", color: "red", onClick: handleLogout}];

    const handleReturn = useCallback(() => {
        switch (sectionPath) {
            case "/clients": {
                dispatch(setCurrentClient(null));
                console.log('curr user empty');
                break;
            }
            case "/managers": {
                dispatch(setCurrentManager(null));
                console.log('curr manager empty');
                break;
            }
        }
        redirect(`/home${sectionPath}`)
    }, [dispatch, sectionPath])

    const idHeaderText = useMemo(() => {
        if (sectionPath === "/clients" && uiState.currentClient !== null) {
            return (
                <>
                    <span className={"ReturnButton"} onClick={handleReturn}>
                        <ChevronLeftIcon/>
                    </span>
                    <h1>{uiState.currentClient.name}</h1>
                    <span>{`(ID: ${uiState.currentClient.id})`}</span>
                </>)
        } else if (sectionPath === "/managers" && subSectionPath !== '/undefined') {
            return (
                <>
                    <span className={"ReturnButton"} onClick={handleReturn}>
                        <ChevronLeftIcon/>
                    </span>
                    <h1>{subSectionPath === '/edit-manager'? "Редактирование менеджера" : "Создание менеджера"}</h1>
                </>)
        } else {
            return <h1>{Header}</h1>
        }
    }, [Header, handleReturn, sectionPath, subSectionPath, uiState.currentClient])

    const idHeader: React.ReactNode = useMemo(() => {
        return (
            <div className={"Wrapper"}>
                {idHeaderText}
            </div>
        )
    }, [idHeaderText])

    return (
        <div className={"HomeHeader"}>
            <div className={"HeaderText"}>
                {sectionPath === "/clients" || sectionPath === "/managers" ?
                    idHeader
                    :
                    <h1>{Header}</h1>
                }
            </div>
            <div className={"User"}>
                <UserIcon/>
                <DropdownList items={logoutItem}/>
            </div>
        </div>
    )
};

export default HomeHeader;
