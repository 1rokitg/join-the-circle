import { Column } from "@once-ui-system/core";
import styles from "./platform.module.scss";

export default function PlatformLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Column
      as="main"
      className={styles.platformShell}
      fillWidth
      minHeight="100vh"
      horizontal="center"
    >
      {children}
    </Column>
  );
}
