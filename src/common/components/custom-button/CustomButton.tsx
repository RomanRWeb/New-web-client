"use client";
import "./CustomButton.scss";
import React, { CSSProperties } from "react";

interface ButtonProps {
  onClick?: () => void;
  buttonName: string;
  active?: boolean;
  style?: CSSProperties;
  type?: "Fill" | "Outline" | "Blank";
  gray?: boolean;
}

export const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  buttonName,
  active = true,
  style,
  type = "Fill",
  gray = false,
}: ButtonProps) => {
  return (
    <button
      className={
        gray
          ? `button-${type?.toLowerCase()}-gray`
          : `button-${type?.toLowerCase()}-common`
      }
      onClick={onClick}
      disabled={!active}
      style={style}
    >
      {buttonName}
    </button>
  );
};
