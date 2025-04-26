interface SubmitButtonProps {
  text?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text = "Send Application",
  disabled = false,
  type = "submit",
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3 text-white font-medium rounded-md transition-colors ${
        disabled
          ? "bg-[var(--button-inactive)] cursor-not-allowed"
          : "bg-[var(--purple)] hover:bg-[var(--button-hover)] active:bg-[var(--button-hover)]"
      }`}
    >
      {text}
    </button>
  );
};
