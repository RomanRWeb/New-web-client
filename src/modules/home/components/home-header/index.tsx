"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../../../../common/styles/common/HomeHeader.scss";
import { redirect, usePathname } from "next/navigation";
import { UserIcon } from "@app/common/icons/user";
import DropdownList from "@app/common/components/dropdown-list/DropdownList";
import { DropdownProps } from "@app/data/types";
import { ChevronLeftIcon } from "@app/common/icons/chevron-left";
import { NavListHomeAdmin } from "@app/data/constants";
import { clients } from "@app/data/mocks";

const HomeHeader: React.FC = () => {
  const pathArray = usePathname().split("/");
  const sectionPath = useMemo(() => `${pathArray[2]}`, [pathArray]);
  const subSectionPath = useMemo(() => `${pathArray[3]}`, [pathArray]);
  const [header, setHeader] = useState<string>();

  useEffect(() => {
    console.log("sectionPath", JSON.stringify(sectionPath, null, 2));
  }, [sectionPath]);

  useEffect(() => {
    console.log("subSectionPath", JSON.stringify(subSectionPath, null, 2));
  }, [subSectionPath]);

  useEffect(() => {
    if (subSectionPath === "") {
      setHeader(
        NavListHomeAdmin.find((el) => el.path === `/${sectionPath}`)?.name,
      );
    } else if (sectionPath === "clients" && subSectionPath !== "") {
      setHeader(clients.find((client) => client.id === subSectionPath)?.name);
    } else if (sectionPath === "managers") {
      if (subSectionPath === "edit-manager") {
        setHeader("Редактирование менеджера");
      } else if (subSectionPath === "add-manager") {
        setHeader("Создание менеджера");
      }
    }
  }, [sectionPath, subSectionPath]);

  const handleLogout = useCallback(() => {
    redirect("/auth/sign-in");
  }, []);

  const logoutItem: DropdownProps[] = [
    { text: "Выйти", color: "red", onClick: handleLogout },
  ];

  const handleReturn = useCallback(() => {
    redirect(`/home/${sectionPath}`);
  }, [sectionPath]);

  return (
    <div className={"HomeHeader"}>
      <div className={"HeaderText"}>
        <div className={"Wrapper"}>
          {subSectionPath !== "" ? (
            <span className={"ReturnButton"} onClick={handleReturn}>
              <ChevronLeftIcon />
            </span>
          ) : null}
          <h1>{header}</h1>
          {sectionPath === "clients" && subSectionPath !== "" ? (
            <span>{`(ID: ${subSectionPath})`}</span>
          ) : null}
        </div>
      </div>
      <div className={"User"}>
        <UserIcon />
        <DropdownList items={logoutItem} />
      </div>
    </div>
  );
};

export default HomeHeader;
