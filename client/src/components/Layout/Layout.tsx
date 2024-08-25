import React from "react";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactElement;
  backgroundURL: string;
};

const Layout = ({ children, backgroundURL }: LayoutProps) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundURL})`,
      }}
      className={styles.bgImage}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Layout;
