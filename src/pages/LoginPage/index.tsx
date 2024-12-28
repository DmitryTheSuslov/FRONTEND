import { FC, useState } from "react";
import "./index.css";
import { api } from "src/api";
import { useDispatch } from "react-redux";
import { setCookie } from "src/slices/cookieSlice";
import { useNavigate } from "react-router-dom";
import { setName } from "src/slices/userSlice";
export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.users
      .usersLoginCreate(formData)
      .then((data) => {
        const mess = String(data["status"]);
        console.log(mess);
        if (mess.includes("200")) {
          console.log("Login successful");
          const username = formData.username;
          dispatch(setName(username));
          // localStorage.setItem("username", username);
  
          const cookies = document.cookie.split(";").find((row) => row.startsWith("session_id="));
          if (!cookies){
            const cookies = document.cookie.split(";").find((row) => row.startsWith(" session_id="));
          }
          console.log(document.cookie.split(";"));
          if (cookies) {
            const sessionId = cookies.split("=")[1];
            console.log("Session ID from cookies:", sessionId);
            dispatch(setCookie(sessionId)); // Обновление глобального состояния
            navigate("/addresses");
          }
        } else {
          console.log("Login failed");
          setError(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };
  
  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Войти</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Логин:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите логин"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
            />
          </div>
          {error && <div className="error-message">Ошибка входа</div>}
          <button type="submit" className="submit-button">
            Войти
          </button>
        </form>
        <div className="register-container">
          <button
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;