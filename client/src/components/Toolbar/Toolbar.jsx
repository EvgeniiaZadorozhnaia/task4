import styles from "./Toolbar.module.css";

function Toolbar() {
  return (
    <div className={styles.toolBar}>
      <div className={styles.toolBar_buttons}>
        <button className={`btn btn-outline-primary ${styles.customBtn}`}>
          <i className={`bi bi-lock ${styles.icon}`}></i> Block
        </button>
        <button className={`btn btn-outline-primary ${styles.customBtn}`}>
          <i className={`bi bi-unlock ${styles.icon}`}></i>
        </button>
        <button className={`btn btn-outline-danger ${styles.customBtn}`}>
          <i className={`bi bi-trash ${styles.icon}`}></i>
        </button>
      </div>
      <input
        className={styles.toolBar_input}
        type="text"
        name="filter"
        id="filter"
		placeholder='Filter'
      />
    </div>
  );
}

export default Toolbar;
