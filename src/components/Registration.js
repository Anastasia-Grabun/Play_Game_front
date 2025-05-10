import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

export default function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    login: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // Состояние для ошибок
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/authorization/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json(); // Получаем ответ от сервера

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      } else {
        // Сервер возвращает ошибки валидации для каждого поля
        setErrors(data.errors || {}); // Предполагаем, что ошибки приходят в поле "errors"
      }
    } catch (error) {
      setErrors({ general: "An error occurred during registration" });
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
            placeholder="Username"
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
            required
            placeholder="Login"
          />
          {errors.login && <div className="error">{errors.login}</div>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="Email"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            placeholder="Password"
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        {errors.general && <div className="error">{errors.general}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

