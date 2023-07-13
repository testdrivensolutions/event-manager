import { Event } from '../../types'
import styles from './EventCell.module.scss'

export const createTooltip = (
  element: HTMLElement,
  data: { label: string; event: Event },
) => {
  const tooltipElement = element.getElementsByClassName('tooltip')
  if (tooltipElement.length <= 0) {
    const tooltipElement = document.createElement('div')
    tooltipElement.classList.add(styles.tooltip)
    tooltipElement.innerHTML = `
    <b>${data.label}</b><br>
    Event: ${data.event.title}<br>
    Start at: ${data.event.start.toDateString()}<br>
    ${data.event.end ? `End at: ${data.event.end.toDateString()}` : ''}
    `
    element.appendChild(tooltipElement)
  }
}
