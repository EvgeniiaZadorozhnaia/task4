import { useState } from "react";
import axiosInstance, { setAccessToken } from "../../axiosInstance";
const { VITE_API, VITE_BASE_URL } = import.meta.env;
import { useNavigate } from "react-router-dom";
import Invitation from "../Invitation/Invitation";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa"; // Импорт иконок
import styles from "./AuthForm.module.css";

function AuthForm({ title, type, setUser }) {
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // Состояние для видимости пароля
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev); // Переключение видимости пароля
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        `${VITE_BASE_URL}${VITE_API}/auth/${type}`,
        inputs
      );
      console.log(res);

      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      navigate(`${VITE_BASE_URL}${VITE_API}/users`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="needs-validation" noValidate>
      {type === "registration" && (
        <>
          <Invitation type="registration" />
          <div className="mb-3 form-floating">
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={inputs?.first_name}
              onChange={changeHandler}
              required
            />
            <label htmlFor="first_name">First Name</label>
          </div>

          <div className="mb-3 form-floating">
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              value={inputs?.last_name}
              onChange={changeHandler}
              required
            />
            <label htmlFor="last_name">Last Name</label>
          </div>

          <div className="mb-3 form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={inputs?.email}
              onChange={changeHandler}
              required
            />
            <label htmlFor="email">E-mail</label>
            <div className={`${styles.iconWrapper} ${styles.emailIcon}`}>
              <FaEnvelope className={styles.icon} />
            </div>
          </div>

          <div className="mb-3 form-floating">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={inputs?.password}
              onChange={changeHandler}
              required
            />
            <label htmlFor="password">Password</label>
            <div className={`${styles.iconWrapper} ${styles.passwordIcon}`}>
              {passwordVisible ? (
                <FaEyeSlash
                  className={styles.icon}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className={styles.icon}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-secondary w-100">
            Sign up
          </button>
        </>
      )}
      {type === "login" && (
        <>
          <Invitation type="login" />
          <div className="mb-3 form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={inputs?.email}
              onChange={changeHandler}
              required
            />
            <label htmlFor="email">E-mail</label>
            <div className={`${styles.iconWrapper} ${styles.emailIcon}`}>
              <FaEnvelope className={styles.icon} />
            </div>
          </div>

          <div className="mb-3 form-floating">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={inputs?.password}
              onChange={changeHandler}
              required
            />
            <label htmlFor="password">Password</label>
            <div className={`${styles.iconWrapper} ${styles.passwordIcon}`}>
              {passwordVisible ? (
                <FaEyeSlash
                  className={styles.icon}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className={styles.icon}
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-secondary w-100">
            Sign up
          </button>
        </>
      )}
    </form>
  );
}

export default AuthForm;
