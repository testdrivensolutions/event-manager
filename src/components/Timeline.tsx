import React, { useState } from "react";
import {
  formatDate,
  getDaysInMonth,
  getYearAndMonth,
  useTimelineEffect,
  formatMonthYear,
  MonthYear,
  Props
} from "./";

export const Timeline: React.FC<Props> = ({
  resources,
  onClick,
  onUpdateDate
}) => {
  const [monthYear, setMonthYear] = useState(getYearAndMonth());
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(monthYear));
  const hasWeekends = true;

  useTimelineEffect(resources, monthYear);

  const handleBack = () => {
    let date;
    if (monthYear.month <= 1) {
      date = { month: 12, year: monthYear.year - 1 };
    } else {
      date = { ...monthYear, month: monthYear.month - 1 };
    }
    updateDate(date);
  };

  const handleForward = () => {
    let date;
    if (monthYear.month >= 12) {
      date = { month: 1, year: monthYear.year + 1 };
    } else {
      date = { ...monthYear, month: monthYear.month + 1 };
    }
    updateDate(date);
  };

  const handleToday = () => {
    updateDate();
  };

  const updateDate = (date: MonthYear = getYearAndMonth()) => {
    setMonthYear(date);
    setDaysInMonth(getDaysInMonth(date, hasWeekends));
    onUpdateDate(date);
  };

  const handleClick = (event: React.MouseEvent<HTMLTableCellElement>) => {
    let data;
    const { textContent } = event.currentTarget;
    if (textContent && typeof textContent === "string") {
      data = JSON.parse(textContent);
    }
    onClick(data);
  };

  return (
    <div className="timeline-container">
      <div className="timeline-headline">
        <span className="month-year">{formatMonthYear(monthYear)}</span>
        <div className="timeline-actions">
          <button className="btn btn-back" onClick={handleBack}>
            {"<"}
          </button>
          <button className="btn btn-today" onClick={handleToday}>
            Today
          </button>
          <button className="btn btn-forward" onClick={handleForward}>
            {">"}
          </button>
        </div>
      </div>
      <table className="timeline-table">
        <thead>
          <tr>
            <th>&nbsp;</th>
            {daysInMonth.map((day) => (
              <th key={day.toDateString()}>{formatDate(day)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resources.map((item) => (
            <tr key={item.id} id={item.id}>
              <td id={item.title}>{item.title}</td>
              {daysInMonth.map((day) => (
                <td
                  key={`${day.toDateString()}-${item.id}`}
                  id={`${day.toDateString()}-${item.id}`}
                  className="event-cell"
                  onClick={handleClick}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
