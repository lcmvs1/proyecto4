import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      );

      if (response.data.usuario.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={iniciarSesion}>

        <h1>CINEMA-LS</h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Iniciar sesión
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </button>

      </form>

    </div>
  );
}

export default Login;