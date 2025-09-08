import React from "react";
import './Card.scss'

interface CardProps {
    children?: React.ReactNode,
}

const Card: React.FC<CardProps> = ({children}: CardProps) => {
    return (
        <div className="Card">
            {children}
        </div>
    )
}

export default Card;
