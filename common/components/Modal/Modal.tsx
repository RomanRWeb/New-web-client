import "./Modal.scss"
import React from "react";
import {CloseModalIcon} from "@/public/icons/close-modal";

interface ModalProps {
    title: string,
    content?: string,
    actions?: React.ReactNode,
    isVisible: boolean,
    onCloseFunk?: () => void,
}

const Modal: React.FC<ModalProps> = ({title, content, actions, isVisible, onCloseFunk}: ModalProps) => {

    return (
        <div className={'ModalBackground'} style={{display: isVisible ? 'flex' : 'none'}} onClick={onCloseFunk}>
            <div className={"Modal"}>
                <header>
                    <h1>{title}</h1>
                    {
                        onCloseFunk ?
                            <span className={"CloseWrapper"} onClick={onCloseFunk}>
                                <CloseModalIcon/>
                            </span> : null
                    }
                </header>
                <div className={'ModalBody'}>
                    {content}
                </div>
                <footer className={'actionWrapper'}>
                    {actions}
                </footer>
            </div>
        </div>
    )
}

export default Modal;
