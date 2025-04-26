import React, { useState, useEffect } from "react";
import Label from "../Label";
import warningIcon from "../../assets/warning-icon.svg";

interface InputProps {
  label?: string;
  id: string;
  name: string;
  type?: "text" | "email";
  value?: string;
  onChange?: (arg: string) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  className = "",
  name,
  type = "text",
  value,
  onChange,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setHasError(!emailRegex.test(value));
    } else {
      setHasError(false);
    }
  }, [value, type]);

  return (
    <div className="mb-6">
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        id={id}
        className={`w-full max-w-full px-3 py-2 text-[var(--foreground)] text-[16px] font-medium rounded-[8px] border ${
          hasError
            ? "border-[var(--error)] border-2 bg-[var(--error-background)]"
            : "border-[var(--border)] bg-[var(--input-background)]"
        } focus:border-[var(--purple)] focus:border-2 focus:outline-none ${className}`}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {hasError && type === "email" && (
        <div className="mt-1  text-sm flex items-center gap-2">
          <img src={warningIcon} alt="Warning" />
          <div>
            <p>Please use correct formatting.</p>
            <p>Example: address@email.com</p>
          </div>
        </div>
      )}
    </div>
  );
};
