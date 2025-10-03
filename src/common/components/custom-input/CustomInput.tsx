"use client";
import { EyeIcon } from "@app/common/icons/eye";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import "../../styles/common/CustomInput.scss";
import { ErrorIcon } from "@app/common/icons/error";
import DropdownList from "@app/common/components/dropdown-list/DropdownList";
import { DropdownProps } from "@app/data/types";
import { EyeOffIcon } from "@app/common/icons/eye-off";

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
  setError?: (value: boolean) => void;
  regex?: RegExp;
}

const normalStyle: CSSProperties = {
  borderColor: "#E6E6E6FF",
  outlineColor: "#E6E6E6FF",
};

const errorStyle: CSSProperties = {
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
  regex,
  setError,
}: InputProps) => {
  const changeFunc = useCallback(
    (value: string) => {
      if (regex && setError) {
        if (regex.test(value.toString())) {
          setError(false);
        } else setError(true);
      }
      if (onChange) {
        onChange(value);
      }
    },
    [onChange, regex, setError],
  );

  const finalStyle = useCallback(() => {
    if (errState && !disabled) {
      return errorStyle;
    } else return { ...normalStyle, ...style };
  }, [disabled, errState, style]);

  return (
    <div className={"custom-input"}>
      <span>{title}</span>
      <span className={"input-wrapper"}>
        <input
          onChange={(e) => changeFunc(e.target.value)}
          placeholder={placeholder}
          value={value}
          style={finalStyle()}
          disabled={disabled}
        />
      </span>
    </div>
  );
};

const CustomInputPhone: React.FC<InputProps> = ({
  title,
  onChange,
  placeholder = "",
  value,
  errState = false,
  style,
  disabled = false,
  setError,
}: InputProps) => {
  const changeFunc = useCallback(
    (value: string) => {
      const inputString = value.replace(/\D/g, "");
      if (setError) {
        if (inputString.length === 11) {
          setError(false);
        } else {
          setError(true);
        }
      }
      if (onChange) {
        let phone = "";
        if (inputString.length > 0) {
          phone = phone.concat("+7 (", inputString.substring(1, 4));
        }
        if (inputString.length >= 5) {
          phone = phone.concat(") ", inputString.substring(4, 7));
        }
        if (inputString.length >= 8) {
          phone = phone.concat("-", inputString.substring(7, 9));
        }
        if (inputString.length >= 10) {
          phone = phone.concat("-", inputString.substring(9, 11));
        }
        console.log("phone", JSON.stringify(phone, null, 2));
        onChange(phone);
      }
    },
    [onChange, setError],
  );

  return (
    <div className={"custom-input"}>
      <span>{title}</span>
      <span className={"input-wrapper"}>
        <input
          onChange={(e) => changeFunc(e.target.value)}
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
            <EyeOffIcon />
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

export {
  CustomInput,
  CustomInputPassword,
  CustomInputDropdown,
  CustomInputPhone,
};
