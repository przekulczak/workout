import React from "react";
import Label from "../Label";

interface SliderProps {
  label: string;
  id: string;
  min: number;
  max: number;
  name: string;
  className?: string;
  value: number;
  setValue: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  id,
  min,
  max,
  className = "",
  name,
  value,
  setValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
  };

  const position = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6 h-[96px]">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex justify-between mb-1">
        <span className="text-xs font-normal text-[var(--foreground)]">
          {min}
        </span>
        <span className="text-xs font-normal text-[var(--foreground)]">
          {max}
        </span>
      </div>
      <div className="relative mt-2">
        <div className="relative w-full h-1 bg-purple-200 rounded-lg">
          <div
            className="absolute top-0 left-0 h-1 bg-[var(--purple)] rounded-lg"
            style={{ width: `${position}%` }}
          ></div>
        </div>
        <div
          className="absolute top-0 h-4 w-4 rounded-full bg-[var(--purple)] -translate-x-1/2 -translate-y-1.5 shadow-md"
          style={{ left: `${position}%` }}
        ></div>

        <input
          type="range"
          id={id}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className={`w-full h-1 absolute top-0 left-0 appearance-none cursor-pointer opacity-0 z-10 ${className}`}
          name={name}
        />

        <div
          className="absolute -bottom-12 bg-white border border-purple-300 rounded-[4px] px-2 py-1 text-center w-[37px] h-[25px] flex items-center justify-center shadow-sm text-[var(--purple)] font-medium"
          style={{ left: `calc(${position}% - 18.5px)` }}
        >
          <div className="absolute -top-[5px] left-1/2 transform -translate-x-1/2 w-[8px] h-[9px] bg-white border-t border-l border-purple-300 rotate-45"></div>
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
};
