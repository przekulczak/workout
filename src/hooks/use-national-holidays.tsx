import { useGetRequest } from "@/hooks/use-get";
import { formatLocalDate } from "@/helpers";
import { Holiday } from "@/types";

interface NationalHolidaysResult {
  nationalHolidays: { date: Date; name: string }[] | undefined;
  isLoading: boolean;
  isDateHoliday: (date: Date | undefined) => boolean;
}

export function useNationalHolidays(): NationalHolidaysResult {
  const { data: holidays, isLoading } = useGetRequest<Holiday[]>({
    url: `https://api.api-ninjas.com/v1/holidays?country=pl`,
    headers: {
      "X-Api-Key": import.meta.env.VITE_API_KEY,
    },
  });

  const nationalHolidays = holidays
    ?.filter((holiday: Holiday) => holiday.type === "NATIONAL_HOLIDAY")
    .map((item: Holiday) => ({
      date: new Date(item.date),
      name: item.name,
    }));

  const isDateHoliday = (date: Date | undefined): boolean => {
    if (!date || !nationalHolidays) return false;

    return nationalHolidays
      .map((item) => formatLocalDate(item.date))
      .includes(formatLocalDate(date));
  };

  return { nationalHolidays, isLoading, isDateHoliday };
}
