import InfoIcon from "../../assets/info-icon.svg";

interface Props {
  message: string;
}

export const Message: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <img src={InfoIcon} alt={message} />
      <p>{message}</p>
    </div>
  );
};
