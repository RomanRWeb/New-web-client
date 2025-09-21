"use client";
import "./ManagerCard.scss";
import React, { useEffect, useState } from "react";
import Card from "@app/common/components/Card/Card";
import { DropdownProps, ManagerType } from "@app/data/types";
import { CustomInput } from "@app/common/components/CustomInput/CustomInput";
import DropdownBar from "@app/common/components/DropdownBar/DropdownBar";
import "./ManagerCard.scss";
import { managerRoles } from "@app/data/constants";

interface ManagerCardProps {
  manager?: ManagerType;
  onDataCorrect: (b: boolean) => void;
}

const ManagerCard: React.FC<ManagerCardProps> = ({
  manager = {
    id: "",
    fullName: "",
    role: "",
    phone: "",
    password: "",
  },
  onDataCorrect,
}) => {
  const dropdownItems: DropdownProps[] = managerRoles.map((role) => ({
    text: role,
  }));

  const [managerFullName, setManagerFullName] = useState<string>(
    manager.fullName,
  );

  const [role, setRole] = useState<string>(manager.role);
  const [managerPhone, setManagerPhone] = useState<string>(manager.phone);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [managerPassword, setManagerPassword] = useState<string>(
    manager.password,
  );

  useEffect(() => {
    console.log("role", JSON.stringify(role, null, 2));
  }, [role]);

  useEffect(() => {
    const phoneRegex =
      /^[+]?[0-9][(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{2}[-\s.]?[0-9]{2}$/;
    if (!phoneRegex.test(managerPhone)) {
      setPhoneError(true);
    } else setPhoneError(false);
  }, [managerPhone]);

  useEffect(() => {
    if (
      role &&
      managerFullName.length > 0 &&
      managerPhone.length > 0 &&
      managerPassword.length > 0
    ) {
      onDataCorrect(true);
    }
  }, [
    managerFullName.length,
    managerPassword.length,
    managerPhone.length,
    onDataCorrect,
    role,
  ]);

  return (
    <Card>
      <h1>{"Информация о менеджере"}</h1>
      <CustomInput
        value={managerFullName}
        onChange={setManagerFullName}
        title={"ФИО"}
        errState={managerFullName.length === 0}
      />
      <DropdownBar
        items={dropdownItems}
        title={"Роль"}
        onSelect={setRole}
        selectedValue={role}
      />
      <CustomInput
        value={managerPhone}
        onChange={setManagerPhone}
        title={"Телефон"}
        errState={phoneError}
      />
      <CustomInput
        value={managerPassword}
        onChange={setManagerPassword}
        title={"Пароль"}
        errState={managerPassword.length === 0}
      />
    </Card>
  );
};

export default ManagerCard;
