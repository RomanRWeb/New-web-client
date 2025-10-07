"use client";
import "../../styles/common/SidebarButton.scss";
import React, { useCallback } from "react";
import { redirect } from "next/navigation";
import { NavListType } from "@app/data/types";

interface SidebarButtonProps {
  name: NavListType["name"];
  redirectPath: string;
  icon: React.ReactNode;
  checked?: boolean;
  collapsed?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  name,
  redirectPath,
  icon,
  checked = false,
  collapsed,
}: SidebarButtonProps) => {
  const handleClick = useCallback(() => {
    redirect(`/home${redirectPath}`);
  }, [redirectPath]);

  return (
    <label className={"sidebar-button"}>
      <input
        type={"radio"}
        onClick={handleClick}
        name={"navigation"}
        value={name}
        defaultChecked={checked}
      />
      <span>
        {icon}
        {collapsed ? name : name}
      </span>
    </label>
  );
};
export default SidebarButton;
