import AuthForm from "../../components/AuthForm/AuthForm";
import Logo from "../../components/Logo/Logo";
import styles from "./RegistrationPage.module.css";
import Clue from "../../components/Clue/Clue";

function RegistrationPage({ setUser }) {
  return (
    <div className={styles.registrationPage}>
      <div className={styles.leftSide}>
        <Logo />
        <AuthForm
          title="Зарегистрироваться"
          type="registration"
          setUser={setUser}
        />
        <Clue type="login" />
      </div>
      <div className={styles.rightSide}></div>
    </div>
  );
}

export default RegistrationPage;
