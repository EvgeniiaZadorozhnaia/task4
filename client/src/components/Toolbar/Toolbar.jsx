import styles from "./Toolbar.module.css";

function Toolbar({
  showNotice,
  notice,
  closeError,
  blockUser,
  unBlockUser,
  deleteUser,
  selectedUsers,
  changeHandler,
}) {
  return (
    <>
      {showNotice && notice && (
        <div
          className={`alert ${
            notice.includes("successfully") ? "alert-success" : "alert-danger"
          } animate__animated animate__bounceInRight ${styles.noticeAlert}`}
          role="alert"
        >
          <span>{notice}</span>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeError}
          ></button>
        </div>
      )}
      <div className={styles.toolBar}>
        <div className={styles.toolBar_buttons}>
          <button
            onClick={() => blockUser(selectedUsers)}
            className={`btn btn-outline-primary ${styles.customBtn}`}
          >
            <i className={`bi bi-lock ${styles.icon}`}></i> Block
          </button>
          <button
            onClick={() => unBlockUser(selectedUsers)}
            className={`btn btn-outline-primary ${styles.customBtn}`}
          >
            <i className={`bi bi-unlock ${styles.icon}`}></i>
          </button>
          <button
            onClick={() => deleteUser(selectedUsers)}
            className={`btn btn-outline-danger ${styles.customBtn}`}
          >
            <i className={`bi bi-trash ${styles.icon}`}></i>
          </button>
        </div>
        <input
          className={styles.toolBar_input}
          type="text"
          name="filter"
          id="filter"
          placeholder="Filter"
          onChange={changeHandler}
        />
      </div>
    </>
  );
}

export default Toolbar;
