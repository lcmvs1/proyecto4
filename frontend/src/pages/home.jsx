import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../css/home.css";

function Home() {

  const [peliculas, setPeliculas] = useState([]);
  const [buscar, setBuscar] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const cargarPeliculas = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3001/peliculas"
      );

      console.log("Películas:", response.data);
      setPeliculas(response.data);

    } catch (error) {
      console.log(error);
    }

  };

  const peliculasFiltradas = peliculas.filter((pelicula) =>
    pelicula.titulo.toLowerCase().includes(buscar.toLowerCase())
  );

  return (

    <>

      <Navbar />

      <div className="home">

        <h1 className="titulo">
          CARTELERA
        </h1>
        <div className="buscador">

          <input
            type="text"
            placeholder="Buscar película..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />

        </div>

        <div className="movies">

          {peliculasFiltradas.map((pelicula) => (

            <div
              key={pelicula.id}
              className="movie-card"
            >

              <img
                src={`http://localhost:3001${pelicula.imagen_poster}`}
                alt={pelicula.titulo}
              />

              <h3>{pelicula.titulo}</h3>

              <p>{pelicula.genero}</p>

              <button
                onClick={() => navigate(`/pelicula/${pelicula.id}`)}
              >

                Ver detalles

              </button>

            </div>

          ))}

        </div>

      </div>
    </>

  );

}

export default Home;