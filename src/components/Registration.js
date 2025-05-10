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

  const [error, setError] = useState("");
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

      if (response.status === 201 || response.status == 200) {
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
          placeholder="Username" // Добавляем placeholder
        />
        <input
          type="text"
          name="login"
          value={formData.login}
          onChange={(e) => setFormData({ ...formData, login: e.target.value })}
          required
          placeholder="Login" // Добавляем placeholder
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder="Email" // Добавляем placeholder
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          placeholder="Password" // Добавляем placeholder
        />

        {error && <div>{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
