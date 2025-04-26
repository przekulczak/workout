import React, { useRef } from "react";
import Label from "../Label";
import CancelIcon from "@/assets/cancel-icon";

interface FileInputProps {
  label?: string;
  id: string;
  name: string;
  accept?: string;
  className?: string;
  file: File | null;
  setFile: (file: File | null) => void;
  onChange?: (file: File | null) => void;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  id,
  name,
  accept = "image/*",
  className = "",
  file,
  setFile,
  onChange,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    setFile(selectedFile);
    if (onChange) {
      onChange(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile) {
      if (!droppedFile.type.startsWith("image/")) {
        alert("Please drop an image file");
        return;
      }

      setFile(droppedFile);
      if (onChange) {
        onChange(droppedFile);
      }

      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (onChange) {
      onChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-6">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div
        className={`mt-2 h-[96px] border border-[var(--border)] rounded-lg p-6 flex items-center justify-center bg-[var(--input-background)] cursor-pointer ${
          isDragging ? "border-[var(--purple)] border-2" : ""
        } ${className}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {file ? (
          <div
            className="flex justify-center w-full gap-[5px] items-center"
            onClick={handleRemoveFile}
          >
            <span className="text-[16px]">{file.name}</span>
            <CancelIcon />
          </div>
        ) : (
          <div className="text-center text-[16px]">
            <button
              type="button"
              className="text-[var(--purple)] font-normal underline cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Upload a file
            </button>
            <span className="text-gray-500 ml-2 hidden md:inline">
              or drag and drop here
            </span>
            <input
              type="file"
              id={id}
              name={name}
              accept={accept}
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};
