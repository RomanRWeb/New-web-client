'use client'
import "./SideBar.scss"
import React from "react";
import {Logo} from "@/common/components/Icons/Logo";
import info from "../../../package.json"
import {NoteIcon} from "@/public/icons/note";
import SidebarButton from "@/common/components/SidebarButton/SidebarButton";
import {ClientIcon} from "@/public/icons/clients";
import {AnalyticsIcon} from "@/public/icons/analytics";
import {NavListHomeAdmin, NavListHomeManager, NavListType} from "@/common/types/types";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const SideBar: React.FC = () => {

    const version = info.version

    const uiState = useSelector((state: RootState) => state.ui)

    const currentPath = `/${usePathname().split("/")[2]}`

    const createButtons = ({name, path, icon}: NavListType) => {
        return <SidebarButton name={name} redirectPath={path} key={`${name}_button`}
                              icon={icon === "clients" ? <ClientIcon/> : icon === "analytics" ? <AnalyticsIcon/> : null}
                              checked={currentPath === path}
        />
    }

    return (
        <div className="SideBar">
            <section className={"LogoContainer"}>
                <div className={"Logo"}>
                    <Logo size={60}/>
                    <div>
                        <b>{"VGL Патруль"}</b>
                        <span>{"Версия " + version}</span>
                    </div>
                </div>
                <div className={'NoteWrapper'}>
                    <NoteIcon/>
                </div>
            </section>
            <section className={"NavBar"}>
                {uiState.isAdmin ?
                    NavListHomeAdmin.map((el) => createButtons(el))
                    : NavListHomeManager.map((el) => createButtons(el))}
                <div className="Selection"/>
            </section>
            {/*<button onClick={()=>console.log(currentPath)}>path</button>*/}
        </div>
    )
}

export default SideBar;
