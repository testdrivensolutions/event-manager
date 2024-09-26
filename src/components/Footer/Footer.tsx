import React, { ReactElement } from "react";
import { Legend } from "../Legend";
import { Resource } from "../../types";
import styles from "./Footer.module.scss";

type Props = {
  resources: Resource[]
  showLegend: boolean
  pagination: ReactElement<HTMLDivElement> | null
  children: React.ReactNode
}

export const Footer = ({
  resources,
  showLegend,
  pagination,
  children,
}: Props) => (
    <div className={styles.footer}>
      {showLegend && <Legend resources={resources} />}
      {children}
      {pagination}
    </div>
  );
