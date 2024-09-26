import React from "react";
import { ClickData, Resource } from "../../types";
import styles from "./EventCell.module.scss";

type EventCellProps = {
  resource: Resource
  id: string
  onClick: ((data: ClickData | undefined) => void) | undefined
}

export const EventCell: React.FC<EventCellProps> = ({ id, onClick }) => {
  const handleClick = (event: React.MouseEvent<HTMLTableCellElement>) => {
    let data;
    const { textContent } = event.currentTarget;
    if (textContent && typeof textContent === "string") {
      data = JSON.parse(textContent.split("\n")[0]) as ClickData;
    }
    if (onClick) onClick(data);
  };

  return <td id={id} className={styles.eventCell} onClick={handleClick}></td>;
};

export default EventCell;
