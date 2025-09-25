"use client";
import { EyeIcon } from "@app/common/icons/eye";
import React, { CSSProperties, useState } from "react";
import "../../styles/common/CustomInput.scss";
import { CloseIcon } from "@app/common/icons/close";
import { ErrorIcon } from "@app/common/icons/error";
import DropdownList from "@app/common/components/dropdown-list/DropdownList";
import { DropdownProps } from "@app/data/types";

interface InputProps {
  style?: CSSProperties;
  title?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  value: string | number;
  errState?: boolean;
  errMessage?: string;
  dropdownOption?: DropdownProps[];
  dropdownWidth?: number;
  disabled?: boolean;
}

const normalStyle = {
  borderColor: "#E6E6E6FF",
  outlineColor: "#E6E6E6FF",
};

const errorStyle = {
  borderColor: "#E84646FF",
  backgroundColor: "#FDEDEDFF",
  outlineColor: "#E84646FF",
};

const CustomInput: React.FC<InputProps> = ({
  title,
  onChange,
  placeholder = "",
  value,
  errState = false,
  style,
  disabled = false,
}: InputProps) => {
  return (
    <div className={"custom-input"}>
      <span>{title}</span>
      <span className={"input-wrapper"}>
        <input
          onChange={(e) => (onChange ? onChange(e.target.value) : null)}
          placeholder={placeholder}
          value={value}
          style={errState ? errorStyle : { ...normalStyle, ...style }}
          disabled={disabled}
        />
      </span>
    </div>
  );
};

const CustomInputPassword: React.FC<InputProps> = ({
  title,
  onChange,
  placeholder = "",
  errState = false,
  errMessage,
  value,
}: InputProps) => {
  const [passwordCheck, setPasswordCheck] = useState<boolean>(false);

  return (
    <div className={"custom-input"}>
      <span>{title}</span>
      <span className={"input-wrapper"}>
        <input
          onChange={(e) => (onChange ? onChange(e.target.value) : null)}
          placeholder={placeholder}
          type={passwordCheck ? "text" : "password"}
          value={value}
          style={errState ? errorStyle : normalStyle}
        />
        <div
          className={"icon-zone"}
          onClick={() => setPasswordCheck(!passwordCheck)}
        >
          {errState ? (
            <ErrorIcon />
          ) : passwordCheck ? (
            <CloseIcon />
          ) : (
            <EyeIcon />
          )}
        </div>
      </span>
      {errMessage ? <span className={"err-message"}>{errMessage}</span> : null}
    </div>
  );
};

const CustomInputDropdown: React.FC<InputProps> = ({
  title,
  onChange,
  placeholder = "",
  value,
  errState = false,
  dropdownOption,
  dropdownWidth,
}: InputProps) => {
  return (
    <div className={"custom-input"}>
      <span>{title}</span>
      <section style={errState ? errorStyle : normalStyle}>
        <span className={"input-wrapper"}>
          <input
            onChange={(e) => (onChange ? onChange(e.target.value) : null)}
            placeholder={placeholder}
            value={value}
            style={{ outline: "none" }}
          />
        </span>
        <DropdownList
          items={dropdownOption || []}
          width={dropdownWidth}
          chevronColor={"#444444"}
        />
      </section>
    </div>
  );
};

export { CustomInput, CustomInputPassword, CustomInputDropdown };
