import styles from "./HomePageLayout.module.css";
import Logo from "../Logo/Logo.tsx";

const HomePageLayout = () => {
  return (
    <div className={styles.homePageLayout}>
      <header className={styles.header}>
        <Logo />
      </header>
      <main>Main</main>
      <footer>Footer</footer>
    </div>
  );
};

export default HomePageLayout;
