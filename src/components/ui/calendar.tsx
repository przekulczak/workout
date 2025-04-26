import * as React from "react";
import { DayPicker } from "react-day-picker";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={false}
      weekStartsOn={1}
      className={cn("bg-white w-full p-8 md:p-6 md:w-[326px]", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2 w-full justify-center",
        month: "flex flex-col gap-4 w-full",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-base font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1 mx-auto",
        head_row: "flex justify-center w-full",
        head_cell:
          "rounded-md w-full font-medium text-[14px] flex-1 text-center leading-[100%]",
        row: "flex w-full mt-2 justify-center",
        cell: cn(
          "relative p-0 text-center text-base focus-within:relative focus-within:z-20  flex-1",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "w-full h-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "size-8! rounded-[50%]! bg-[var(--purple)] text-white! flex items-center justify-center",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        day_today: "bg-transparent!",
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <img src={arrowLeft} alt="Arrow left" className={cn("size-4")} />
        ),
        IconRight: () => (
          <img src={arrowRight} alt="Arrow right" className={cn("size-4")} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
