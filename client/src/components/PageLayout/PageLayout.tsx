import React from "react";
import Layout from "../Layout/Layout.tsx";
import styles from "../PageLayout/PageLayout.module.css";

type LayoutProps = {
  children?: React.ReactElement;
  backgroundURL?: string;
  header?: React.ReactElement;
  main?: React.ReactElement;
  footer?: React.ReactElement;
};

const PageLayout = ({ backgroundURL, header, main, footer }: LayoutProps) => {
  return (
    <Layout backgroundURL={backgroundURL}>
      <div className={styles.PageLayout}>
        <header className={styles.PageHeader}>{header}</header>
        <main className={styles.PageMain}>{main}</main>
        <footer className={styles.PageFooter}>{footer}</footer>
      </div>
    </Layout>
  );
};

export default PageLayout;
