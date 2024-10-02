import React from 'react'
import styles from './Legend.module.scss'

type Props = {
  legendItem: { [key: string]: string }
}

export const Legend: React.FC<Props> = ({ legendItem }) => {
  return (
    <div className={styles.legend}>
      {Object.keys(legendItem).map((key) => (
        <div key={key} className={styles.type}>
          <span>
            <div
              className={styles.color}
              style={{ backgroundColor: legendItem[key] }}
            ></div>
          </span>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </div>
      ))}
    </div>
  )
}
