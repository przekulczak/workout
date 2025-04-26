import { Calendar } from "@/components/ui/calendar";
import Label from "../Label";
import { TimePicker } from "../TimePicker";
import { formatLocalDate } from "@/helpers";
import { Spinner } from "../Spinner";
import { Message } from "../Message";

interface Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string | undefined;
  setTime: (time: any) => void;
  isLoading: boolean;
  nationalHolidays: { date: Date; name: string }[] | undefined;
  isDateHoliday: boolean;
}

export const DateTimePicker = ({
  date,
  setDate,
  time,
  setTime,
  isLoading,
  nationalHolidays,
  isDateHoliday,
}: Props) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        <div>
          <Label>Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              sunday: { dayOfWeek: [0] },
              holiday: nationalHolidays
                ? nationalHolidays.map((item) => item.date)
                : [],
            }}
            modifiersStyles={{
              sunday: { color: "#898DA9" },
              holiday: { color: "#898DA9" },
            }}
          />
        </div>
        {date && !isDateHoliday && (
          <TimePicker value={time} setValue={setTime} />
        )}
      </div>
      {isDateHoliday && (
        <Message
          message={`It is ${
            nationalHolidays?.find(
              (item) => formatLocalDate(item.date) === formatLocalDate(date)
            )?.name
          }`}
        />
      )}
    </div>
  );
};
