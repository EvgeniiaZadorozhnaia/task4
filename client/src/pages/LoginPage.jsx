import AuthForm from "../components/AuthForm/AuthForm";

function LoginPage({ setUser }) {
  return (
    <div>
      <AuthForm title="Войти" type="login" setUser={setUser} />
    </div>
  );
}

export default LoginPage;
