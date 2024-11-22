import styles from "./Invitation.module.css";

function Invitation({ type }) {
  return (
    <div className={styles.invitation}>
      <div className={styles.under}>Start your journey</div>
      <div className={styles.below}>
        {type === "registration" ? "Sign Up to The App" : "Sign In to The App"}
      </div>
    </div>
  );
}

export default Invitation;
