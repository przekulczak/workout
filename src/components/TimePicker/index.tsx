import Label from "../Label";

interface TimePickerProps {
  name?: string;
  value?: string;
  setValue: (time: string) => void;
}

export const TimePicker = ({
  name = "time-slot",
  value,
  setValue,
}: TimePickerProps) => {
  const timeSlots = ["12:00", "14:00", "16:30", "18:30", "20:00"];

  return (
    <div className="mt-4 md:mt-0">
      <Label htmlFor="time">Time</Label>
      <div className="flex flex-row md:flex-col gap-2 flex-wrap">
        {timeSlots.map((time) => (
          <div key={time} className="flex items-center">
            <input
              type="radio"
              id={`time-${time}`}
              name={name}
              value={time}
              className="sr-only peer"
              checked={value === time}
              onChange={() => setValue(time)}
            />
            <label
              htmlFor={`time-${time}`}
              className="px-4 py-2 rounded-md border border-purple-300 text-sm cursor-pointer bg-white  peer-checked:border-purple-500 peer-checked:border-2 peer- transition-all md:w-[76px] text-center"
            >
              {time}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
