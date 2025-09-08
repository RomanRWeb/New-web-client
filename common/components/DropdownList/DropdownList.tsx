import './DropdownList.scss'
import React from "react";
import {ChevronDownIcon} from "@/public/icons/chevron-down";
import {DropdownProps} from "@/common/types/types";


interface DropdownPropsList {
    items: DropdownProps[];
    width?: number;
    chevronColor?: string;
    title?: string;
}

const DropdownList: React.FC<DropdownPropsList> = ({items, width, chevronColor}: DropdownPropsList) => {

    const createItem = ({text, color, onClick}: DropdownProps) => {
        return (
            <span style={{color: color ? color : 'inherit'}} onClick={onClick} key={`dropdown_${text}`}>{text} </span>
        )
    }

    return (
        <div className="DropdownList">
            <ChevronDownIcon color={chevronColor ? chevronColor : undefined}/>
            <div className={"DropdownItems"} style={{minWidth: width}}>
                {items.map(item => (createItem(item)))}
            </div>
        </div>
    )
}

export default DropdownList;
