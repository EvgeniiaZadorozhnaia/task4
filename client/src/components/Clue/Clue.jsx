import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom
import styles from './Clue.module.css'

function Clue({ type }) {
  return (
    <div className={styles.clue}>
      {type === "registration" ? (
		<p>Don't have an account?{' '}
		<Link to="/registration">Sign up</Link></p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      )}
    </div>
  );
}

export default Clue;
