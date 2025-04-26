import React from "react";

interface HeaderProps {
  title: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, className = "" }) => {
  return <h1 className={`font-medium text-2xl pb-8 ${className}`}>{title}</h1>;
};
