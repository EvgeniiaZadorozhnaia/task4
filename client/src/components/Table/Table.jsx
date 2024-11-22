import styles from "./Table.module.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

function Table({ users, selectedUsers, handleSelectAll, handleSelectUser }) {
  const timeAgo = (date) => {
    const now = new Date();
    const delta = now - new Date(date);
    const seconds = delta / 1000;

    if (seconds < 60) {
      return `${Math.floor(seconds)} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      return `${months} months ago`;
    } else {
      const years = Math.floor(seconds / 31536000);
      return `${years} years ago`;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-En", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className={styles.user_list}>
      <div className={styles.select_all_checkbox}>
        <span>Select All</span>
        <input
          className={styles.table_checkbox}
          type="checkbox"
          checked={selectedUsers.size === users.length}
          onChange={handleSelectAll}
        />
      </div>

      <div className={styles.table_header}>
        <div className={styles.header_item}>
          <input
            className={styles.table_checkbox}
            type="checkbox"
            checked={selectedUsers.size === users.length}
            onChange={handleSelectAll}
          />
        </div>
        <div className={styles.header_item}>Name</div>
        <div className={styles.header_item}>Email</div>
        <div className={styles.header_item}>Last Seen</div>
      </div>

      {users?.map((user) => (
        <div className={styles.user_item} key={user.id}>
          <div className={styles.user_field}>
            <input
              className={styles.table_checkbox}
              type="checkbox"
              checked={selectedUsers.has(user.id)}
              onChange={() => handleSelectUser(user.id)}
            />
          </div>
          <div
            className={`${styles.user_field} ${
              user.status === "block" ? styles.user_block : ""
            }`}
          >
            {user.last_name}, {user.first_name}
          </div>
          <div
            className={`${styles.user_field} ${
              user.status === "block" ? styles.user_block : ""
            }`}
          >
            {user.email}
          </div>
          <div
            className={`${styles.user_field} ${
              user.status === "block" ? styles.user_block : ""
            }`}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>{formatDate(user.last_seen_date)}</Tooltip>}
            >
              <span>{timeAgo(user.last_seen_date)}</span>
            </OverlayTrigger>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;
