import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "../RegistrationPage/RegistrationPage.module.css";
import Logo from "../../components/Logo/Logo";
import Clue from "../../components/Clue/Clue";

function RegistrationPage({ type, setUser }) {
  return (
    <div className={styles.registrationPage}>
      <div className={styles.leftSide}>
        <Logo />
        {type === "registration" ? (
          <>
            <AuthForm type="registration" setUser={setUser} />
            <Clue type="login" />
          </>
        ) : (
          <>
            <AuthForm type="login" setUser={setUser} />
            <Clue type="registration" />
          </>
        )}
      </div>
      <div className={styles.rightSide}></div>
    </div>
  );
}

export default RegistrationPage;
