import "../../styles/common/Modal.scss";
import React from "react";
import { CloseModalIcon } from "@app/common/icons/close-modal";
import { CustomButton } from "@app/common/components/custom-button/CustomButton";

interface ModalProps {
  title: string | React.ReactNode;
  content?: string | React.ReactNode;
  actions?: React.ReactNode;
  isVisible: boolean;
  onCloseFunk?: () => void;
  children?: React.ReactNode;
  className?: string;
  reducedFooter?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  actions,
  isVisible,
  onCloseFunk,
  children,
  className = "modal",
  reducedFooter,
}: ModalProps) => {
  return (
    <div
      className={"modal-background"}
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onCloseFunk}
    >
      <div className={className} onClick={(e) => e.stopPropagation()}>
        <header>
          <h1>{title}</h1>
          {onCloseFunk ? (
            <span className={"close-wrapper"} onClick={onCloseFunk}>
              <CloseModalIcon />
            </span>
          ) : null}
        </header>
        {content ? <div className={"modal-body"}>{content}</div> : null}
        {children}
        {actions ? (
          <footer
            className={"action-wrapper"}
            style={{ padding: reducedFooter ? "4px 24px 24px 24px" : "24px" }}
          >
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
