import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

function Register() {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const registrar = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:3001/auth/register",
        {
          nombre,
          email,
          password
        }
      );

      alert(response.data.message);

      setNombre("");
      setEmail("");
      setPassword("");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div className="register-container">

      <form className="register-form" onSubmit={registrar}>

        <h1>CINEMA-LS</h1>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
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
          Crear cuenta
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
        >
          Ya tengo cuenta
        </button>

      </form>

    </div>

  );

}

export default Register;