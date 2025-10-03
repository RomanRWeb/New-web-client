"use client";
import React, { useEffect, useMemo, useState } from "react";
import Card from "@app/common/components/сard/Card";
import { DropdownProps, ManagerType } from "@app/data/types";
import {
  CustomInput,
  CustomInputPhone,
} from "@app/common/components/custom-input/CustomInput";
import DropdownBar from "@app/common/components/dropdown-bar/DropdownBar";
import "../../../../common/styles/common/ManagerCard.scss";
import { managerRoles } from "@app/data/constants";

interface ManagerCardProps {
  manager?: ManagerType;
  onDataCorrect: (b: boolean) => void;
  isAdd?: boolean;
}

const ManagerCard: React.FC<ManagerCardProps> = ({
  manager = {
    id: "",
    fullName: "",
    role: "",
    phone: "",
    password: "",
  },
  isAdd = false,
  onDataCorrect,
}) => {
  const dropdownItems: DropdownProps[] = managerRoles.map((role) => ({
    text: role,
  }));
  const [fullName, setFullName] = useState<string>(manager.fullName);
  const [fullNameErr, setFullNameErr] = useState<boolean>(isAdd);
  const [role, setRole] = useState<string>(manager.role);
  const [phone, setPhone] = useState<string>(manager.phone);
  const [phoneError, setPhoneError] = useState<boolean>(isAdd);
  const [password, setPassword] = useState<string>(manager.password);
  const [passwordErr, setPasswordErr] = useState<boolean>(isAdd);

  const digitRegex = useMemo(() => /^.{2,}$/, []);

  useEffect(() => {
    console.log("fullNameErr", JSON.stringify(fullNameErr, null, 2));
  }, [fullNameErr]);

  useEffect(() => {
    if (role && !fullNameErr && !phoneError && !passwordErr) {
      onDataCorrect(true);
    } else onDataCorrect(false);
  }, [fullNameErr, onDataCorrect, passwordErr, phoneError, role]);

  return (
    <Card>
      <h1>{"Информация о менеджере"}</h1>
      <CustomInput
        value={fullName}
        onChange={setFullName}
        title={"ФИО"}
        errState={fullNameErr}
        regex={digitRegex}
        setError={setFullNameErr}
      />
      <DropdownBar
        items={dropdownItems}
        title={"Роль"}
        onSelect={setRole}
        selectedValue={role}
      />
      <CustomInputPhone
        value={phone}
        onChange={setPhone}
        title={"Телефон"}
        errState={phoneError}
        setError={setPhoneError}
      />
      <CustomInput
        value={password}
        onChange={setPassword}
        title={"Пароль"}
        errState={passwordErr}
        regex={digitRegex}
        setError={setPasswordErr}
      />
    </Card>
  );
};

export default ManagerCard;
