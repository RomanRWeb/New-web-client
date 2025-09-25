import React from "react";
import "../../styles/common/Card.scss";

interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }: CardProps) => {
  return <div className="card">{children}</div>;
};

export default Card;
