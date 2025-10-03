"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/store/store";
import "../../../../common/styles/common/HomeHeader.scss";
import { redirect, usePathname } from "next/navigation";
import { UserIcon } from "@app/common/icons/user";
import DropdownList from "@app/common/components/dropdown-list/DropdownList";
import { DropdownProps } from "@app/data/types";
import { ChevronLeftIcon } from "@app/common/icons/chevron-left";
import { setCurrentClient, setCurrentManager } from "@app/store/slices/uiSlice";
import { NavListHomeAdmin } from "@app/data/constants";

const HomeHeader: React.FC = () => {
  const uiState = useSelector((state: RootState) => state.ui);
  const dispatch: AppDispatch = useDispatch();

  const pathArray = usePathname().split("/");
  const sectionPath = useMemo(() => `${pathArray[2]}`, [pathArray]);
  const subSectionPath = useMemo(() => `${pathArray[3]}`, [pathArray]);

  useEffect(() => {
    console.log("subSectionPath", JSON.stringify(subSectionPath, null, 2));
  }, [subSectionPath]);

  const Header = useMemo(
    () => NavListHomeAdmin.find((el) => el.path === `/${sectionPath}`)?.name,
    [sectionPath],
  );

  const handleLogout = useCallback(() => {
    redirect("/auth/sign-in");
  }, []);

  const logoutItem: DropdownProps[] = [
    { text: "Выйти", color: "red", onClick: handleLogout },
  ];

  const handleReturn = useCallback(() => {
    switch (sectionPath) {
      case "clients": {
        dispatch(setCurrentClient(null));
        console.log("curr user empty");
        break;
      }
      case "managers": {
        dispatch(setCurrentManager(null));
        console.log("curr manager empty");
        break;
      }
    }
    redirect(`/home/${sectionPath}`);
  }, [dispatch, sectionPath]);

  const idHeaderText = useMemo(() => {
    if (sectionPath === "clients" && uiState.currentClient !== null) {
      return (
        <>
          <span className={"ReturnButton"} onClick={handleReturn}>
            <ChevronLeftIcon />
          </span>
          <h1>{uiState.currentClient.name}</h1>
          <span>{`(ID: ${uiState.currentClient.id})`}</span>
        </>
      );
    } else if (sectionPath === "managers" && subSectionPath) {
      return (
        <>
          <span className={"ReturnButton"} onClick={handleReturn}>
            <ChevronLeftIcon />
          </span>
          <h1>
            {subSectionPath === "edit-manager"
              ? "Редактирование менеджера"
              : "Создание менеджера"}
          </h1>
        </>
      );
    } else {
      return <h1>{Header}</h1>;
    }
  }, [
    Header,
    handleReturn,
    sectionPath,
    subSectionPath,
    uiState.currentClient,
  ]);

  const idHeader: React.ReactNode = useMemo(() => {
    return <div className={"Wrapper"}>{idHeaderText}</div>;
  }, [idHeaderText]);

  return (
    <div className={"HomeHeader"}>
      <div className={"HeaderText"}>
        {sectionPath === "clients" || sectionPath === "managers" ? (
          idHeader
        ) : (
          <h1>{Header}</h1>
        )}
      </div>
      <div className={"User"}>
        <UserIcon />
        <DropdownList items={logoutItem} />
      </div>
    </div>
  );
};

export default HomeHeader;
