import "./Modal.scss";
import React from "react";
import { CloseModalIcon } from "@/public/icons/close-modal";
import { CustomButton } from "@/common/components/CustomButton/CustomButton";

interface ModalProps {
  title: string | React.ReactNode;
  content?: string | React.ReactNode;
  actions?: React.ReactNode;
  isVisible: boolean;
  onCloseFunk?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  actions,
  isVisible,
  onCloseFunk,
  children,
  className = "Modal",
}: ModalProps) => {
  return (
    <div
      className={"ModalBackground"}
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onCloseFunk}
    >
      <div className={className} onClick={(e) => e.stopPropagation()}>
        <header>
          <h1>{title}</h1>
          {onCloseFunk ? (
            <span className={"CloseWrapper"} onClick={onCloseFunk}>
              <CloseModalIcon />
            </span>
          ) : null}
        </header>
        {content ? <div className={"ModalBody"}>{content}</div> : null}
        {children}
        {actions ? (
          <footer className={"actionWrapper"}>
            {actions}
            {actions && onCloseFunk ? (
              <CustomButton
                buttonName={"Отмена"}
                onClick={onCloseFunk}
                type={"Outline"}
              />
            ) : null}
          </footer>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
