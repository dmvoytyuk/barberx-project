import styles from "./ToolBox.module.css";

const ToolBox = () => {
  return (
    <div className={styles.toolBox}>
      <p className={styles.toolBoxItem}>LogIn</p>
      <p className={styles.toolBoxItem}>SingUp</p>
    </div>
  );
};

export default ToolBox;
