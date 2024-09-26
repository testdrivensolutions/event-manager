import { Event } from "../../types";
import { getDayMonth } from "../../utils";
import styles from "./EventCell.module.scss";

export const createTooltip = (
  element: HTMLElement,
  data: { label: string; event: Event },
) => {
  const tooltipElement = element.getElementsByClassName("tooltip");
  if (tooltipElement.length <= 0) {
    const tooltipElement = document.createElement("div");
    tooltipElement.classList.add(styles.tooltip);
    tooltipElement.innerHTML = `
    <b>${data.label}</b><br>
    ${data.event.title}<br>
    ${getDayMonth(data.event.start)} ${
      data.event.end ? ` - ${getDayMonth(data.event.end)}` : ""
    }
    `;
    element.appendChild(tooltipElement);
  }
};
