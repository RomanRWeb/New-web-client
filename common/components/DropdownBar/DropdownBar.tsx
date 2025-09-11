'use client'
import React, {useCallback, useMemo} from "react";
import {DropdownProps} from "@/common/types/types";
import {ChevronDownIcon} from "@/public/icons/chevron-down";
import "./DropdownBar.scss"

interface DropdownPropsList {
    items: DropdownProps[];
    width?: number;
    title?: string;
    onSelect: (text: string) => void;
    onSelectFunk?: () => void;
    selectedValue: string;
}

export const DropdownBar: React.FC<DropdownPropsList> = ({items, width, title, onSelect, selectedValue, onSelectFunk}: DropdownPropsList) => {

    const color = useMemo(()=>{
        return items.find(el => el.text === selectedValue)?.color || 'inherit';
    }, [items, selectedValue])

    const handleClick = useCallback((text: string)=>{
        onSelect(text)
        if (onSelectFunk) {
            onSelectFunk()
        }
    }, [onSelect, onSelectFunk])

    return (
        <div className="DropdownBar">
            <span>{title}</span>
            <div className={"bar"}>
                <span style={{color: color}}>
                    {selectedValue}
                </span>
                <ChevronDownIcon/>
                <div className={"DropdownItems"} style={{minWidth: width}}>
                    {items.map(item => (
                        <span
                            style={{color: item.color ? item.color : 'inherit'}}
                            onClick={()=>handleClick(item.text)}
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
