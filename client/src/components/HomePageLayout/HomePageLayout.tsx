import styles from "./HomePageLayout.module.css";
import Logo from "../Logo/Logo.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import ToolBox from "../ToolBox/ToolBox.tsx";

const HomePageLayout = () => {
  return (
    <div className={styles.homePageLayout}>
      <header className={styles.homePageHeader}>
        <Logo />
      </header>
      <main className={styles.homePageMain}>
        <h1 className={styles.homePageMainTitle}>Book your beauty in a snap</h1>
        <SearchBox />
      </main>
      <footer className={styles.homePageFooter}>
        <ToolBox />
      </footer>
    </div>
  );
};

export default HomePageLayout;
