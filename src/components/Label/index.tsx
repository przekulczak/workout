import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-normal text-[16px] mb-2 leading-[100%] ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
