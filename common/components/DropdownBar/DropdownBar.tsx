import React from "react";
import {DropdownProps} from "@/common/types/types";
import {ChevronDownIcon} from "@/public/icons/chevron-down";
import "./DropdownBar.scss"

interface DropdownPropsList {
    items: DropdownProps[];
    width?: number;
    title?: string;
    onSelect: (text: string) => void;
    selectedValue: string;
}

export const DropdownBar: React.FC<DropdownPropsList> = ({items, width, title, onSelect, selectedValue}: DropdownPropsList) => {

    return (
        <div className="DropdownBar">
            <span>{title}</span>
            <div className={"bar"}>
                <span>{selectedValue}</span>
                <ChevronDownIcon/>
                <div className={"DropdownItems"} style={{minWidth: width}}>
                    {items.map(item => (
                        <span
                            style={{color: item.color ? 'inherit' : item.color}}
                            onClick={() => onSelect(item.text)}
                            key={`dropdown_${item.text}`}>
                            {item.text}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DropdownBar;
