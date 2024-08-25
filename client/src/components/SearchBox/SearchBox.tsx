import styles from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <form className={styles.searchBox}>
      <label className={styles.searchBoxLabel} htmlFor="search">
        Find the hairdresser, barber or beautician in your city
      </label>
      <input
        className={styles.searchBoxInput}
        id="search"
        type="text"
        placeholder="Name of salon, procedure, etc..."
      />
    </form>
  );
};

export default SearchBox;
