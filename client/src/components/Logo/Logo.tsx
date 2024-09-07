import styles from "./Logo.module.css";

const Logo = ({ color }: { color: string }) => {
  return (
    <div style={{ color: `${color}` }} className={styles.logo}>
      AppointMe
    </div>
  );
};

export default Logo;
