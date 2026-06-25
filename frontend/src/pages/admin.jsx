import { useState, useEffect } from "react";
import axios from "axios";
import "../css/admin.css";
import SalasAdmin from "./SalasAdmin";
import FuncionesAdmin from "./FuncionesAdmin";

function Admin() {

  const [titulo, setTitulo] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");
  const [clasificacion, setClasificacion] = useState("");
  const [imagen, setImagen] = useState(null);

  const [peliculas, setPeliculas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {

    cargarPeliculas();

  }, []);

  const cargarPeliculas = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3001/peliculas"
      );

      setPeliculas(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const guardarPelicula = async (e) => {

    e.preventDefault();

    if (
      !titulo ||
      !sinopsis ||
      !genero ||
      !duracion ||
      !clasificacion
    ) {
      alert("Debe completar todos los campos.");
      return;
    }

    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("sinopsis", sinopsis);
    formData.append("genero", genero);
    formData.append("duracion", duracion);
    formData.append("clasificacion", clasificacion);

    if (imagen) {

      formData.append("imagen", imagen);

    }

    try {

      const token = localStorage.getItem("token");

      if (editando) {

        await axios.patch(

          `http://localhost:3001/peliculas/${idEditar}`,

          formData,

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        );

      } else {

        await axios.post(

          "http://localhost:3001/peliculas",

          formData,

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        );

      }

      alert(editando ? "Película actualizada correctamente" : "Película creada correctamente");

      setEditando(false);
      setIdEditar(null);

      setTitulo("");
      setSinopsis("");
      setGenero("");
      setDuracion("");
      setClasificacion("");
      setImagen(null);

      cargarPeliculas();

    } catch (error) {

      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data));

    }

  };

  const eliminarPelicula = async (id) => {

    const confirmar = window.confirm(
      "¿Eliminar esta película?"
    );

    if (!confirmar) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(

        `http://localhost:3001/peliculas/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      cargarPeliculas();

    } catch (error) {

      console.log(error);
      alert("Error al eliminar");

    }

  };

  const editarPelicula = (pelicula) => {

    setEditando(true);
    setIdEditar(pelicula.id);

    setTitulo(pelicula.titulo);
    setSinopsis(pelicula.sinopsis);
    setGenero(pelicula.genero);
    setDuracion(pelicula.duracion);
    setClasificacion(pelicula.clasificacion);

  };

  return (

    <div className="admin">

      <h1>Panel Administrador</h1>

      <form onSubmit={guardarPelicula}>

        <input
          value={titulo}
          placeholder="Título"
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          value={sinopsis}
          placeholder="Sinopsis"
          onChange={(e) => setSinopsis(e.target.value)}
        />

        <input
          value={genero}
          placeholder="Género"
          onChange={(e) => setGenero(e.target.value)}
        />

        <input
          value={duracion}
          type="number"
          placeholder="Duración"
          onChange={(e) => setDuracion(e.target.value)}
        />

        <select
          value={clasificacion}
          onChange={(e) => setClasificacion(e.target.value)}
        >

          <option value="">Seleccione</option>

          <option value="+14">+14</option>

          <option value="R">R</option>

          <option value="Todo público">Todo público</option>

        </select>

        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
        />

        <button type="submit">

          {editando ? "Actualizar película" : "Guardar película"}

        </button>

      </form>

      <h2>Películas Registradas</h2>

      <table className="tabla-peliculas">

        <thead>

          <tr>

            <th>ID</th>
            <th>Poster</th>
            <th>Título</th>
            <th>Género</th>
            <th>Duración</th>
            <th>Clasificación</th>
            <th>Acciones</th>

          </tr>

        </thead>

        <tbody>

          {peliculas.map((pelicula) => (

            <tr key={pelicula.id}>

              <td>{pelicula.id}</td>

              <td>

                {pelicula.imagen_poster && (

                  <img
                    src={`http://localhost:3001${pelicula.imagen_poster}`}
                    alt={pelicula.titulo}
                    width="80"
                  />

                )}

              </td>

              <td>{pelicula.titulo}</td>

              <td>{pelicula.genero}</td>

              <td>{pelicula.duracion} min</td>

              <td>{pelicula.clasificacion}</td>

              <td>

                <button
                  onClick={() => editarPelicula(pelicula)}
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarPelicula(pelicula.id)}
                >
                  Eliminar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr
        style={{
          margin: "50px 0",
          borderColor: "#333"
        }}
      />

      <SalasAdmin />
      <hr
        style={{
          margin: "50px 0",
          borderColor: "#333"
        }}
      />

      <FuncionesAdmin />

    </div>

  );

}

export default Admin;