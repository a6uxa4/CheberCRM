"use client";

import { differenceInDays, endOfMonth, startOfMonth } from "date-fns";

const typeMonth = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const typeWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

interface MiniCalendarProps {
  newDate: Date;
  setNewDate: (newDate: Date) => void;
}

export const MiniCalendar = ({
  newDate,
  setNewDate,
}: MiniCalendarProps): JSX.Element => {
  function nextMonth() {
    const nextMonthDate = new Date(newDate);
    nextMonthDate.setMonth(newDate.getMonth() + 1);
    setNewDate(nextMonthDate);
  }

  function prevMonth() {
    const prevMonthDate = new Date(newDate);
    prevMonthDate.setMonth(newDate.getMonth() - 1);
    setNewDate(prevMonthDate);
  }

  const startOfDay = startOfMonth(newDate);
  const endOfDay = endOfMonth(newDate);
  const numDays = differenceInDays(endOfDay, startOfDay) + 1;

  const prefixDays = (startOfDay.getDay() + 6) % 7;
  const sufixDays = (6 - endOfDay.getDay() + 1) % 7;

  function isTodayOrThisDate(date: Date) {
    return (
      date.getDate() === newDate.getDate() &&
      date.getMonth() === newDate.getMonth() &&
      date.getFullYear() === newDate.getFullYear()
    );
  }

  return (
    <div className="w-full min-w-[235px] h-[260px] p-2">
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center justify-center gap-1">
          <h1 className="text-black font-sans text-[25px] leading-10 font-medium">
            {typeMonth[newDate.getMonth()]}
          </h1>
          <h1 className="text-[#EF4444] font-sans text-[25px] leading-10 font-normal">
            {newDate.getFullYear()}
          </h1>
        </div>
        <div className="flex">
          <svg
            onClick={prevMonth}
            className="group cursor-pointer rounded-sm hover:bg-[#01d7d4]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.2485 6.35134C15.4735 6.57638 15.5999 6.88155 15.5999 7.19974C15.5999 7.51794 15.4735 7.82311 15.2485 8.04814L11.2969 11.9997L15.2485 15.9513C15.4671 16.1777 15.5881 16.4808 15.5853 16.7954C15.5826 17.1101 15.4564 17.411 15.2339 17.6335C15.0114 17.856 14.7105 17.9822 14.3958 17.985C14.0812 17.9877 13.7781 17.8667 13.5517 17.6481L8.75173 12.8481C8.52677 12.6231 8.40039 12.3179 8.40039 11.9997C8.40039 11.6815 8.52677 11.3764 8.75173 11.1513L13.5517 6.35134C13.7768 6.12638 14.0819 6 14.4001 6C14.7183 6 15.0235 6.12638 15.2485 6.35134Z"
              className=" group-hover:fill-white fill-black"
            />
          </svg>
          <svg
            onClick={nextMonth}
            className="group cursor-pointer rounded-sm hover:bg-[#01d7d4]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.75173 17.6493C8.52677 17.4242 8.40039 17.1191 8.40039 16.8009C8.40039 16.4827 8.52677 16.1775 8.75173 15.9525L12.7033 12.0009L8.75173 8.04928C8.53314 7.82296 8.41219 7.51983 8.41493 7.2052C8.41766 6.89056 8.54386 6.58959 8.76635 6.3671C8.98884 6.14461 9.28982 6.0184 9.60445 6.01567C9.91909 6.01294 10.2222 6.13389 10.4485 6.35248L15.2485 11.1525C15.4735 11.3775 15.5999 11.6827 15.5999 12.0009C15.5999 12.3191 15.4735 12.6242 15.2485 12.8493L10.4485 17.6493C10.2235 17.8742 9.91833 18.0006 9.60013 18.0006C9.28194 18.0006 8.97677 17.8742 8.75173 17.6493Z"
              className=" group-hover:fill-white fill-black"
            />
          </svg>
        </div>
      </div>
      <div>
        <div className="p-2 flex items-center justify-between">
          {typeWeek.map((item: string) => (
            <span
              key={item}
              className="text-center font-sans text-[10px] font-semibold leading-4 text-[#71717A]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: prefixDays }).map((_, index) => {
            return <div key={index}></div>;
          })}
          {Array.from({ length: numDays }).map((_, index) => {
            const day = index + 1;
            const currentDate = new Date(
              newDate.getFullYear(),
              newDate.getMonth(),
              day
            );
            return (
              <div
                className={`w-7 h-7 flex flex-col items-center justify-center  text-center font-sans text-[11px] font-semibold leading-4 text-black cursor-pointer hover:bg-[#00d6d4]/20  hover:text-black hover:rounded-sm ${
                  isTodayOrThisDate(currentDate)
                    ? "bg-[#3B82F6] rounded-full text-white"
                    : ""
                }`}
                key={day}
                onClick={() => setNewDate(currentDate)}
              >
                {day}
              </div>
            );
          })}
          {Array.from({ length: sufixDays }).map((_, index) => {
            return <div key={index}></div>;
          })}
        </div>
      </div>
    </div>
  );
};
