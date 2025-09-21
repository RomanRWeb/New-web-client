"use client";
import "./SideBar.scss";
import React from "react";
import { Logo } from "@app/common/components/Icons/Logo";
import info from "../../../../../package.json";
import { NoteIcon } from "@app/common/icons/note";
import SidebarButton from "@app/common/components/SidebarButton/SidebarButton";
import { ClientIcon } from "@app/common/icons/clients";
import { AnalyticsIcon } from "@app/common/icons/analytics";
import { NavListType } from "@app/data/types";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import { NavListHomeAdmin, NavListHomeManager } from "@app/data/constants";

const SideBar: React.FC = () => {
  const version = info.version;

  const uiState = useSelector((state: RootState) => state.ui);

  const currentPath = `/${usePathname().split("/")[2]}`;

  const createButtons = ({ name, path, icon }: NavListType) => {
    return (
      <SidebarButton
        name={name}
        redirectPath={path}
        key={`${name}_button`}
        icon={
          icon === "clients" ? (
            <ClientIcon />
          ) : icon === "analytics" ? (
            <AnalyticsIcon />
          ) : null
        }
        checked={currentPath === path}
      />
    );
  };

  return (
    <div className="sidebar">
      <section className={"logo-container"}>
        <div className={"logo"}>
          <Logo size={60} />
          <div>
            <b>{"VGL Патруль"}</b>
            <span>{"Версия " + version}</span>
          </div>
        </div>
        <div className={"note-wrapper"}>
          <NoteIcon />
        </div>
      </section>
      <section className={"navbar"}>
        {uiState.isAdmin
          ? NavListHomeAdmin.map((el) => createButtons(el))
          : NavListHomeManager.map((el) => createButtons(el))}
        <div className="selection" />
      </section>
      {/*<button onClick={()=>console.log(currentPath)}>path</button>*/}
    </div>
  );
};

export default SideBar;
