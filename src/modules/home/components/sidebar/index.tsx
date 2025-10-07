"use client";
import "../../../../common/styles/common/SideBar.scss";
import React, { useEffect, useState } from "react";
import { Logo } from "@app/common/components/images/Logo";
import info from "../../../../../package.json";
import { NoteIcon } from "@app/common/icons/note";
import SidebarButton from "@app/common/components/sidebar-button/SidebarButton";
import { ClientIcon } from "@app/common/icons/clients";
import { AnalyticsIcon } from "@app/common/icons/analytics";
import { NavListType } from "@app/data/types";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import { NavListHomeAdmin, NavListHomeManager } from "@app/data/constants";

const Sidebar: React.FC = () => {
  const version = info.version;

  const uiState = useSelector((state: RootState) => state.ui);
  const [isFullSize, setIsFullSize] = useState(true);

  useEffect(() => {
    console.log("isFullSize", JSON.stringify(isFullSize, null, 2));
  }, []);

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
        collapsed={!isFullSize}
        checked={currentPath === path}
      />
    );
  };

  return (
    <div className="sidebar">
      <section className={"logo-container"}>
        <div className={"logo"}>
          <Logo />
          <div>
            <b>{"VGL Патруль"}</b>
            <span>{"Версия " + version}</span>
          </div>
        </div>
        <div className={"note-wrapper"}>
          <div
            className={"collapse-switcher"}
            onClick={() => setIsFullSize(!isFullSize)}
          >
            <NoteIcon color={isFullSize ? "#00ABEB" : "#A7B0C0"} />
          </div>
        </div>
      </section>
      <section className={"navbar"}>
        {uiState.isAdmin
          ? NavListHomeAdmin.map((el) => createButtons(el))
          : NavListHomeManager.map((el) => createButtons(el))}
        <div className="selection" />
      </section>
      <label>
        <input
          type={"radio"}
          checked={isFullSize}
          className={"collapse-radio"}
          key={"collapse"}
          readOnly={true}
          name={"collapse"}
          id={"collapse-off"}
        />
      </label>
      <label>
        <input
          type={"radio"}
          checked={!isFullSize}
          className={"collapse-radio"}
          key={"non-collapse"}
          readOnly={true}
          name={"collapse"}
          id={"collapse-on"}
        />
      </label>
    </div>
  );
};

export default Sidebar;
